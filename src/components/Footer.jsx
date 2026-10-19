import BrandMark from './BrandMark.jsx'
import { useSitePreferences } from '../context/SitePreferences.jsx'

export default function Footer() {
  const { t } = useSitePreferences()
  const footerLinks = [
    [t.nav.about, '#essencia'], [t.nav.products, '#produtos'], [t.nav.founders, '#fundadores'],
    [t.nav.journey, '#jornada'], [t.nav.contact, 'mailto:oi@astria.tech'],
  ]
  return <footer className="footer section-wrap" id="contato"><div className="footer-cta" data-reveal><div><p className="eyebrow">{t.footer.eyebrow}</p><h2>{t.footer.title[0]}<br /><em>{t.footer.title[1]}</em></h2></div><a className="outline-link" href="mailto:oi@astria.tech">{t.footer.contact}<span aria-hidden="true">↗</span></a></div><div className="footer-main"><div className="footer-brand"><BrandMark small /><p>{t.footer.tagline}</p><div className="social-links"><a href="https://www.instagram.com/" aria-label="Instagram">IG</a><a href="https://www.linkedin.com/" aria-label="LinkedIn">IN</a></div></div><nav className="footer-nav" aria-label={t.footer.links}>{footerLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav><div className="footer-news"><p className="eyebrow">{t.footer.news}</p><p>{t.footer.newsDescription}</p><form onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="newsletter-email">{t.footer.email}</label><input id="newsletter-email" type="email" placeholder={t.footer.email} /><button type="submit" aria-label={t.footer.subscribe}>↗</button></form></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ástria. {t.footer.copyright}</span><span>Per aspera ad astra</span><a href="#inicio">{t.footer.backToTop}</a></div></footer>
}
