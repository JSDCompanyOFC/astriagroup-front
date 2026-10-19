export default function BrandMark({ small = false }) {
  return <span className={`brand-lockup${small ? ' brand-lockup--small' : ''}`} aria-label="Ástria"><svg className="brand-symbol" viewBox="0 0 100 86" aria-hidden="true"><path d="M50 12 17 69m33-57 33 57M17 69l33-15 33 15M50 12v42" /><circle cx="50" cy="12" r="6" /><circle cx="17" cy="69" r="5" /><circle cx="83" cy="69" r="5" /><circle cx="50" cy="54" r="3" /></svg><span className="brand-name">ÁSTRIA</span></span>
}
