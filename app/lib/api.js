export const API_URL = 'https://api.abcz.workers.dev/api/fitlog';
export const FALLBACK_API_URL = 'https://api.api-store.workers.dev/api/fitlog';

const unwrap = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.exercises)) return payload.exercises;
  if (Array.isArray(payload?.workouts)) return payload.workouts;
  return [];
};

export function normalizeWorkout(raw, index = 0) {
  const tags = raw.category ? (Array.isArray(raw.category) ? raw.category : [raw.category]) : (raw.categories || raw.muscleGroups || ['Workout']);
  const image = raw.image || raw.imageUrl || raw.thumbnail || raw.photo || raw.img || '';
  const instructions = raw.instructions || raw.steps || raw.instruction || [];
  return {
    id: String(raw.id ?? raw._id ?? raw.slug ?? index + 1),
    name: String(raw.name ?? raw.title ?? raw.workoutName ?? 'Workout').toUpperCase(),
    description: raw.description ?? raw.desc ?? 'Build strength, control and consistency with every set.',
    category: Array.isArray(tags) ? tags.map(String) : [String(tags)],
    equipment: raw.equipment ?? raw.equipments ?? raw.equipmentName ?? 'Gym Equipment',
    difficulty: raw.difficulty ?? raw.level ?? 'Intermediate',
    sets: raw.sets ?? raw.set ?? 4,
    reps: raw.reps ?? raw.rep ?? '8-12',
    duration: Number(raw.duration ?? raw.durationMinutes ?? raw.minutes ?? 25),
    calories: Number(raw.calories ?? raw.calorie ?? 180),
    rating: Number(raw.rating ?? raw.rate ?? 4.8),
    image: image || '/assets/banner.png',
    instructions: Array.isArray(instructions) ? instructions.map(String) : [String(instructions)],
  };
}

export async function fetchWorkouts() {
  let response = await fetch(API_URL, { next: { revalidate: 60 } }).catch(() => null);
  if (!response?.ok) response = await fetch(FALLBACK_API_URL, { next: { revalidate: 60 } }).catch(() => null);
  if (!response?.ok) throw new Error('Unable to load workout library');
  const payload = await response.json();
  return unwrap(payload).map(normalizeWorkout);
}

export async function fetchWorkout(id) {
  const urls = [`${API_URL}/${encodeURIComponent(id)}`, `${FALLBACK_API_URL}/${encodeURIComponent(id)}`];
  for (const url of urls) {
    const response = await fetch(url, { next: { revalidate: 60 } }).catch(() => null);
    if (response?.ok) {
      const payload = await response.json();
      const raw = payload?.data ?? payload?.workout ?? payload?.exercise ?? payload;
      return normalizeWorkout(raw);
    }
  }
  const all = await fetchWorkouts();
  return all.find((item) => item.id === String(id));
}
