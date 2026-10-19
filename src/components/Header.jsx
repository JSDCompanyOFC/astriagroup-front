import { useState } from 'react'
import BrandMark from './BrandMark.jsx'
import { useSitePreferences } from '../context/SitePreferences.jsx'

const linkTargets = ['#inicio', '#produtos', '#essencia', '#fundadores', '#jornada', '#contato']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, setLanguage, theme, setTheme, t } = useSitePreferences()
  const labels = Object.values(t.nav).slice(0, 6)
  return <header className="site-header"><a href="#inicio" className="header-brand" aria-label={language === 'en' ? 'Ástria — home' : 'Ástria — início'}><BrandMark small /></a><nav className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} aria-label={t.nav.aria}>{labels.map((label, index) => <a key={linkTargets[index]} href={linkTargets[index]} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><div className="header-actions"><div className="language-picker" aria-label={language === 'pt' ? 'Escolher idioma' : 'Choose language'}><button className={language === 'pt' ? 'is-active' : ''} aria-pressed={language === 'pt'} aria-label={t.language.switchToPt} onClick={() => setLanguage('pt')}>PT</button><span>/</span><button className={language === 'en' ? 'is-active' : ''} aria-pressed={language === 'en'} aria-label={t.language.switchToEn} onClick={() => setLanguage('en')}>EN</button></div><button className="theme-toggle" aria-label={theme === 'dark' ? t.theme.toLight : t.theme.toDark} title={theme === 'dark' ? t.theme.toLight : t.theme.toDark} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><span aria-hidden="true">{theme === 'dark' ? '☼' : '☾'}</span></button><button className="menu-toggle" aria-label={menuOpen ? (language === 'en' ? 'Close menu' : 'Fechar menu') : (language === 'en' ? 'Open menu' : 'Abrir menu')} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div></header>
}
