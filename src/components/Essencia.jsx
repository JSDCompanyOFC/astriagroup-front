import BrandMark from './BrandMark.jsx'
import { useSitePreferences } from '../context/SitePreferences.jsx'

export default function Essencia() {
  const { t } = useSitePreferences()
  return <section className="essence section-wrap" id="essencia"><div className="section-kicker">{t.essence.section}</div><div className="essence-grid"><div data-reveal><p className="eyebrow">{t.essence.eyebrow}</p><h2>{t.essence.title[0]}<br />{t.essence.title[1]} <em>{t.essence.title[2]}</em></h2><p className="body-copy">{t.essence.description}</p><p className="latin">{t.essence.latin}<span>{t.essence.latinMeaning}</span></p></div><div className="essence-emblem" data-reveal><div className="emblem-orbit" /><BrandMark /><span className="emblem-caption">{t.essence.emblem.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</span></div></div><div className="pillar-row" data-reveal>{t.essence.pillars.map((pillar) => <span key={pillar}>{pillar.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</span>)}</div></section>
}
