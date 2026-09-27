'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const PlanContext = createContext(null);
const KEY = 'fitlog-storage-v1';
export function Providers({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState('');
  useEffect(() => {
    try { const value = JSON.parse(localStorage.getItem(KEY)); if (value) { setPlan(value.plan || []); setSaved(value.saved || []); setDone(value.done || []); } } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(KEY, JSON.stringify({ plan, saved, done })); }, [plan, saved, done, ready]);
  const notify = (msg) => { setToast(msg); window.clearTimeout(window.__fitlogToast); window.__fitlogToast = window.setTimeout(() => setToast(''), 2200); };
  const addPlan = (workout) => {
    if (plan.some(x => x.id === workout.id)) return notify('Already in today’s plan');
    if (plan.length >= 5) return notify('Today’s plan is full (5 lifts)');
    setPlan(x => [...x, workout]); notify('Added to today’s plan');
  };
  const addSaved = (workout) => {
    if (saved.some(x => x.id === workout.id)) return notify('Already saved');
    setSaved(x => [...x, workout]); notify('Saved for later');
  };
  const removePlan = (id) => { setPlan(x => x.filter(w => w.id !== id)); setDone(x => x.filter(v => v !== id)); notify('Removed from today’s plan'); };
  const removeSaved = (id) => { setSaved(x => x.filter(w => w.id !== id)); notify('Removed from saved'); };
  const markDone = (id) => { setDone(x => x.includes(id) ? x : [...x, id]); notify('Workout marked as done'); };
  const value = useMemo(() => ({ plan, saved, done, addPlan, addSaved, removePlan, removeSaved, markDone }), [plan, saved, done]);
  return <PlanContext.Provider value={value}>{children}{toast && <div className="toast">✓ {toast}</div>}</PlanContext.Provider>;
}
export const usePlan = () => useContext(PlanContext);
