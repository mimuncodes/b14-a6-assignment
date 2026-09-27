import { notFound } from 'next/navigation';
import { Clock3, Dumbbell, Flame, Star } from 'lucide-react';
import { fetchWorkout } from '../../lib/api';
import DetailActions from '../../components/DetailActions';

export default async function WorkoutDetail({ params }) {
  const workout = await fetchWorkout(params.id);
  if (!workout) notFound();

  const fallbackSteps = [
    'Set your position and brace your core before the first rep.',
    'Move through a controlled range of motion with steady breathing.',
    'Keep your technique consistent through every working set.',
    'Finish the set safely and reset before the next round.'
  ];
  const steps = workout.instructions.length ? workout.instructions.slice(0, 4) : fallbackSteps;

  return (
    <main className="container section">
      <div className="detail-grid">
        <div className="detail-media"><img src={workout.image} alt={workout.name} /></div>
        <article>
          <div className="mono" style={{ color: 'var(--accent)', fontSize: 11, letterSpacing: '.15em' }}>WORKOUT DETAILS</div>
          <h1 className="display" style={{ fontSize: 58, lineHeight: 1, margin: '9px 0 14px' }}>{workout.name}</h1>
          <p style={{ color: '#9ca29f', lineHeight: 1.7, maxWidth: 620 }}>{workout.description}</p>

          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', margin: '20px 0' }}>
            {workout.category.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          </div>

          <div className="specs">
            {[
              ['Equipment', workout.equipment],
              ['Difficulty', workout.difficulty],
              ['Sets', workout.sets],
              ['Reps', workout.reps],
              ['Duration', `${workout.duration} min`],
              ['Calories', `${workout.calories} kcal`],
              ['Rating', workout.rating.toFixed(1)]
            ].map(([label, value]) => (
              <div className="spec" key={label}>
                <div className="spec-label">{label}</div>
                <div className="spec-value">{value}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 13, letterSpacing: '.14em', margin: '28px 0 5px' }}>INSTRUCTIONS</h2>
          <ol className="instructions">
            {steps.map((step, index) => <li key={index}>{step}</li>)}
          </ol>

          <DetailActions workout={workout} />
        </article>
      </div>
    </main>
  );
}
