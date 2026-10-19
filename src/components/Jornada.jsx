import { useSitePreferences } from '../context/SitePreferences.jsx'

export default function Jornada() {
  const { t } = useSitePreferences()
  return <section className="journey section-wrap" id="jornada"><div className="journey-visual" aria-hidden="true"><div className="journey-nebula" /><div className="journey-stars" /><div className="journey-orbit journey-orbit--a" /><div className="journey-orbit journey-orbit--b" /><div className="journey-flare" /></div><div className="journey-copy" data-reveal><div className="section-kicker">{t.journey.section}</div><p className="eyebrow">{t.journey.eyebrow}</p><h2>{t.journey.title[0]}<br />{t.journey.title[1]} <em>{t.journey.title[2]}</em></h2><p className="body-copy">{t.journey.description}</p><a className="outline-link" href="#essencia">{t.journey.cta}<span aria-hidden="true">↗</span></a></div><span className="journey-note">{t.journey.note}</span></section>
}
