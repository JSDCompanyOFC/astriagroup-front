import { useSitePreferences } from '../context/SitePreferences.jsx'

const products = [
  { color: 'pink', symbol: '⌂' },
  { color: 'orange', symbol: '✳' },
  { color: 'blue', symbol: '▦' },
]

export default function VitrineProdutos() {
  const { t } = useSitePreferences()
  return <section className="products-section section-wrap" id="produtos"><div className="section-kicker">{t.products.section}</div><div className="products-heading"><div data-reveal><p className="eyebrow">{t.products.eyebrow}</p><h2>{t.products.title[0]}<br />{t.products.title[1]}<br /><em>{t.products.title[2]}</em></h2></div><p className="body-copy" data-reveal>{t.products.intro}</p></div><div className="product-grid">{t.products.items.map((product, index) => <article className={`product-card product-card--${products[index].color}`} key={product.name} data-reveal><div className="product-card-top"><span className="product-index">{String(index + 1).padStart(2, '0')} / {t.products.index}</span><span className="product-icon" aria-hidden="true">{products[index].symbol}</span></div><div><h3>{product.name}</h3><p className="product-tagline">{product.tagline}</p><p className="product-description">{product.text}</p></div><a href="#contato" className="text-link">{t.products.learnMore}<span aria-hidden="true">↗</span></a></article>)}</div><div className="products-orbit" aria-hidden="true" /></section>
}
