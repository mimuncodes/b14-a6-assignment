import Link from 'next/link';
import { Flame, Clock3, Star, Dumbbell } from 'lucide-react';

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="card workout-card">
      <div className="workout-image">
        <img src={workout.image} alt={workout.name} />
      </div>
      <div style={{ padding: 17 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {workout.category.slice(0, 3).map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 950 }}>{workout.name}</h3>
        <div style={{ color: '#888f8b', fontSize: 12, display: 'flex', gap: 7, alignItems: 'center', marginBottom: 18 }}>
          <Dumbbell size={14} />
          {workout.equipment}
        </div>
        <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
          <span className="stat"><Clock3 size={14} />{workout.duration} min</span>
          <span className="stat"><Flame size={14} />{workout.calories} kcal</span>
          <span className="stat"><Star size={14} />{workout.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
