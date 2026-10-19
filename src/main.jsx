import React from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header.jsx'
import Scene from './canvas/Scene.jsx'
import Hero from './components/Hero.jsx'
import Essencia from './components/Essencia.jsx'
import VitrineProdutos from './components/VitrineProdutos.jsx'
import Fundadores from './components/Fundadores.jsx'
import Jornada from './components/Jornada.jsx'
import Footer from './components/Footer.jsx'
import useScrollReveals from './hooks/useScrollReveals.js'
import { SitePreferencesProvider } from './context/SitePreferences.jsx'
import './styles/global.css'

function App() {
  return <SitePreferencesProvider><Site /></SitePreferencesProvider>
}

function Site() {
  useScrollReveals()
  return <><div className="ambient-backdrop" aria-hidden="true" /><Scene /><Header /><main className="site-content"><Hero /><Essencia /><VitrineProdutos /><Fundadores /><Jornada /></main><Footer /></>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
