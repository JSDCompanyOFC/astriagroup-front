import { useSitePreferences } from '../context/SitePreferences.jsx'

export default function Hero() {
  const { t } = useSitePreferences()
  return <section className="hero section-wrap" id="inicio"><div className="hero-copy" data-reveal><p className="eyebrow">{t.hero.eyebrow}</p><h1>{t.hero.title[0]}<br />{t.hero.title[1]}<br /><em>{t.hero.title[2]}</em></h1><p className="body-copy">{t.hero.description}</p><a href="#produtos" className="outline-link">{t.hero.cta}<span aria-hidden="true">↗</span></a></div><div className="hero-art galaxy-art" aria-label={languageArt(t.hero.art)} role="img"><div className="galaxy galaxy--one" /><div className="galaxy galaxy--two" /><div className="galaxy-core" /><div className="hero-art-caption"><span>{t.hero.art}</span><span>{t.hero.slide}</span></div></div><a className="scroll-cue" href="#essencia"><span className="scroll-icon">↓</span> {t.hero.scroll}</a></section>
}

function languageArt(label) {
  return label === 'IDEAS IN MOTION' ? 'Artistic illustration of galaxies moving toward one another' : 'Ilustração artística de galáxias em aproximação'
}
