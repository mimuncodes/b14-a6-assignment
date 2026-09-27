'use client';
import { Bookmark, Plus } from 'lucide-react';
import { usePlan } from './Providers';
export default function DetailActions({workout}){const {plan,saved,addPlan,addSaved}=usePlan(); return <div style={{display:'flex',gap:9,marginTop:28,flexWrap:'wrap'}}><button className="btn btn-primary" disabled={plan.length>=5||plan.some(x=>x.id===workout.id)} onClick={()=>addPlan(workout)}><Plus size={17}/> {plan.some(x=>x.id===workout.id)?'In today’s plan':'Add to today’s plan'}</button><button className="btn btn-secondary" disabled={saved.some(x=>x.id===workout.id)} onClick={()=>addSaved(workout)}><Bookmark size={17}/> {saved.some(x=>x.id===workout.id)?'Saved':'Save for later'}</button></div>}
