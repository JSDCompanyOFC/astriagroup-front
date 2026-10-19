import { useSitePreferences } from '../context/SitePreferences.jsx'

const founders = [
  { initial: 'J' }, { initial: 'J' }, { initial: 'F' },
]

export default function Fundadores() {
  const { t } = useSitePreferences()
  return <section className="founders section-wrap" id="fundadores"><div className="section-kicker">{t.founders.section}</div><div className="founders-heading"><div data-reveal><p className="eyebrow">{t.founders.eyebrow}</p><h2>{t.founders.title[0]}<br /><em>{t.founders.title[1]}</em></h2></div><p className="body-copy" data-reveal>{t.founders.intro}</p></div><div className="founder-grid">{t.founders.items.map((founder, index) => <article className="founder-card" key={founder.name} data-reveal><div className={`founder-portrait founder-portrait--${index}`}>{founder.photo ? <img className="founder-photo" src={founder.photo} alt={founder.photoAlt} loading="lazy" decoding="async" /> : <span className="portrait-initial">{founders[index].initial}</span>}<span className="portrait-number">0{index + 1}</span></div><div className="founder-info"><h3>{founder.name}</h3><p className="founder-role">{founder.role}</p><p className="founder-bio">{founder.bio}</p>{founder.instagram ? <a className="founder-instagram" href={founder.instagram.url} target="_blank" rel="noreferrer">{founder.instagram.label}<span aria-hidden="true"> ↗</span></a> : null}<span className="founder-rule" /></div></article>)}</div></section>
}
