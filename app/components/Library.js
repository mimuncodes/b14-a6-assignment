'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import WorkoutCard from './WorkoutCard';

export default function Library({ workouts }) {
  const [sort, setSort] = useState('duration');
  const [search, setSearch] = useState('');

  const list = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = workouts.filter((workout) => {
      const categories = Array.isArray(workout.category) ? workout.category.join(' ') : '';
      return `${workout.name} ${categories}`.toLowerCase().includes(query);
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'duration') return a.duration - b.duration;
      if (sort === 'calories') return a.calories - b.calories;
      return b.rating - a.rating;
    });
  }, [workouts, sort, search]);

  return (
    <section id="library" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="mono" style={{ color: 'var(--accent)', fontSize: 11, letterSpacing: '.16em' }}>
              THE LIBRARY
            </div>
            <h2 className="display" style={{ fontSize: 46, margin: '7px 0 5px' }}>
              THE LIBRARY
            </h2>
            <p style={{ color: '#8e9491', margin: 0 }}>
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <label style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 11, top: 11, color: '#707773' }} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search lifts"
                style={{
                  height: 38,
                  width: 160,
                  padding: '0 12px 0 34px',
                  background: '#111413',
                  border: '1px solid var(--line)',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </label>

            <label style={{ position: 'relative' }}>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                style={{
                  height: 38,
                  padding: '0 32px 0 12px',
                  background: '#111413',
                  border: '1px solid var(--line)',
                  color: 'white',
                  appearance: 'none'
                }}
              >
                <option value="duration">Sort By · Duration</option>
                <option value="calories">Sort By · Calories</option>
                <option value="rating">Sort By · Rating</option>
              </select>
              <ChevronDown size={15} style={{ position: 'absolute', right: 10, top: 11, pointerEvents: 'none' }} />
            </label>
          </div>
        </div>

        {list.length > 0 ? (
          <div className="grid">
            {list.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: '#8c928f' }}>
            No workouts found.
          </div>
        )}
      </div>
    </section>
  );
}
