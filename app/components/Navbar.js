'use client';
import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { usePlan } from './Providers';
export default function Navbar() {
  const pathname = usePathname(); const { plan, saved } = usePlan();
  return <header style={{borderBottom:'1px solid var(--line)', background:'#090a0a', position:'sticky', top:0, zIndex:50}}><div className="container nav-inner" style={{minHeight:72, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
    <Link href="/" style={{display:'flex',alignItems:'center',gap:9,fontWeight:950,letterSpacing:'.12em'}}><img src="/assets/logo.png" width="28" height="28" alt="FitLog"/><span>FITLOG</span></Link>
    <nav className="nav-links" style={{display:'flex',alignItems:'center',gap:5}}><Link className={`nav-link ${pathname === '/' ? 'active':''}`} href="/">Workout</Link><Link className={`nav-link ${pathname === '/my-plan' ? 'active':''}`} href="/my-plan">My Plan</Link></nav>
    <div style={{display:'flex',gap:7}}><Link href="/my-plan" className="tag" style={{background:'var(--accent)',color:'#111',borderColor:'var(--accent)',gap:7}}>Plan <b>{plan.length}</b></Link><Link href="/my-plan" className="tag" style={{gap:7}}>Saved <b>{saved.length}</b></Link></div>
  </div></header>
}
