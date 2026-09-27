import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Providers } from './components/Providers';
export const metadata={title:'FitLog — Workout Library',description:'Train with intent. Log every set.'};
export default function RootLayout({children}){return <html lang="en"><body><Providers><Navbar/>{children}<Footer/></Providers></body></html>}
