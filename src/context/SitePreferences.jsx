import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'

const SitePreferencesContext = createContext(null)

const translations = {
  pt: {
    nav: { home: 'Início', products: 'Produtos', about: 'Sobre', founders: 'Fundadores', journey: 'Jornada', contact: 'Contato', aria: 'Navegação principal' },
    language: { switchToPt: 'Mudar idioma para português', switchToEn: 'Switch language to English' },
    theme: { toLight: 'Ativar tema claro', toDark: 'Ativar tema escuro' },
    hero: { eyebrow: 'TECNOLOGIA · PESSOAS · IMPACTO', title: ['Construindo', 'o que vem', 'depois.'], description: 'Somos a Ástria. Uma empresa de tecnologia que desenvolve produtos digitais para resolver problemas reais e construir um futuro melhor.', cta: 'Conheça nossos produtos', scroll: 'Role para explorar', art: 'IDEIAS EM MOVIMENTO', slide: '01 — 05' },
    essence: { section: '01 / NOSSA ESSÊNCIA', eyebrow: 'UM PROPÓSITO, TRÊS PILARES', title: ['Mais que tecnologia,', 'acreditamos em', 'pessoas.'], description: 'A Ástria nasce do encontro de três visões movidas por um mesmo propósito: transformar ideias em soluções reais, unindo tecnologia, criatividade e visão de futuro.', latin: 'Per aspera ad astra', latinMeaning: '— por caminhos difíceis, até as estrelas', emblem: 'TRÊS PILARES\nUM SÓ PROPÓSITO', pillars: ['INOVAÇÃO\nCOM PROPÓSITO', 'PRODUTOS\nINDEPENDENTES', 'IMPACTO\nREAL'] },
    products: { section: '02 / PRODUTOS', eyebrow: 'UM ECOSSISTEMA EM CONSTRUÇÃO', title: ['Soluções que conectam', 'pessoas, negócios', 'e tecnologia.'], intro: 'Ideias diferentes, reunidas por uma mesma vontade de resolver problemas reais.', learnMore: 'Saiba mais', index: 'PRODUTO', items: [
      { name: 'VizinHub', tagline: 'Compre, venda e conecte.', text: 'Uma experiência mais próxima para conectar pessoas, negócios e oportunidades no seu entorno.' },
      { name: 'Conserta Aí', tagline: 'Serviços que resolvem.', text: 'Encontre profissionais e soluções para deixar o dia a dia funcionando melhor.' },
      { name: 'Agenda PRO', tagline: 'Organize seu tempo.', text: 'Uma forma simples de organizar compromissos, rotina e trabalho em um só lugar.' },
    ] },
    founders: { section: '03 / FUNDADORES', eyebrow: 'PESSOAS QUE FAZEM', title: ['Duas pessoas.', 'Uma visão.'], intro: 'Duas trajetórias diferentes, unidas pela vontade de empreender, criar tecnologia e fazer acontecer.', items: [
      { name: 'Jardel', role: 'Investidor principal · Negócios', bio: 'À frente da Kairós Pinturas, Jardel também é o principal investidor do grupo e contribui com a parte administrativa. Traz anos de experiência empreendedora e acredita em crescer sem perder de vista a família e as pessoas.', photo: '/images/jardel-astria-shirt.webp', photoAlt: 'Jardel usando a camisa preta da Ástria', instagram: { label: '@jardelkairospinturas', url: 'https://www.instagram.com/jardelkairospinturas/' } },
      { name: 'John', role: 'CEO · Haster Group', bio: 'Empreendedor e apaixonado por tecnologia desde criança, John está em uma fase de descoberta, com vontade de construir e esperança no futuro. Gosta de viajar, torcer pelo Vasco e estar com a família. Amigos de longa data o descrevem como divertido, inteligente e interessante, alguém que segue o próprio caminho.', photo: '/images/john-astria-shirt.webp', photoAlt: 'John usando a camisa preta da Ástria' },
    ] },
    journey: { section: '04 / NOSSA JORNADA', eyebrow: 'O ENCONTRO QUE NOS MOVE', title: ['Grandes ideias', 'nascem do', 'encontro.'], description: 'Assim como galáxias que se aproximam e transformam tudo ao redor, acreditamos que resultados extraordinários surgem quando pessoas, ideias e propósito se encontram.', cta: 'Conheça nossa essência', note: 'UMA METÁFORA VISUAL — NÃO UMA SIMULAÇÃO ASTRONÔMICA' },
    footer: { eyebrow: 'FAÇA PARTE DO QUE VEM DEPOIS', title: ['Vamos construir', 'o próximo capítulo?'], contact: 'Entre em contato', whatsapp: 'Fale com a gente no WhatsApp', tagline: 'Construindo o que vem depois.', links: 'Links do rodapé', news: 'NOTAS DO UNIVERSO ÁSTRIA', newsDescription: 'Novidades e ideias, de vez em quando.', email: 'Seu e-mail', subscribe: 'Inscrever-se', copyright: 'Todos os direitos reservados.', backToTop: 'Voltar ao topo ↑' },
  },
  en: {
    nav: { home: 'Home', products: 'Products', about: 'About', founders: 'Founders', journey: 'Our story', contact: 'Contact', aria: 'Main navigation' },
    language: { switchToPt: 'Mudar idioma para português', switchToEn: 'Switch language to English' },
    theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
    hero: { eyebrow: 'TECHNOLOGY · PEOPLE · IMPACT', title: ['Building', 'what comes', 'next.'], description: 'We are Ástria, a technology company creating digital products that solve real problems and help build a better future.', cta: 'Explore our products', scroll: 'Scroll to explore', art: 'IDEAS IN MOTION', slide: '01 — 05' },
    essence: { section: '01 / OUR BELIEF', eyebrow: 'ONE PURPOSE, THREE PILLARS', title: ['More than technology,', 'we believe in', 'people.'], description: 'Ástria began with three different perspectives and one shared purpose: turning ideas into useful solutions through technology, creativity, and a vision for the future.', latin: 'Per aspera ad astra', latinMeaning: '— through hardship, to the stars', emblem: 'THREE PILLARS\nONE SHARED PURPOSE', pillars: ['PURPOSEFUL\nINNOVATION', 'INDEPENDENT\nPRODUCTS', 'REAL-WORLD\nIMPACT'] },
    products: { section: '02 / PRODUCTS', eyebrow: 'A GROWING PRODUCT FAMILY', title: ['Products that bring', 'people, businesses', 'and technology together.'], intro: 'Different ideas, connected by a shared drive to solve real problems.', learnMore: 'Learn more', index: 'PRODUCT', items: [
      { name: 'VizinHub', tagline: 'Buy, sell, and connect nearby.', text: 'A local platform that brings neighbors, businesses, and opportunities together.' },
      { name: 'Conserta Aí', tagline: 'Find help. Get things fixed.', text: 'Find local professionals and services that make everyday tasks easier.' },
      { name: 'Agenda PRO', tagline: 'Make time work for you.', text: 'A simple way to manage appointments, daily routines, and work in one place.' },
    ] },
    founders: { section: '03 / FOUNDERS', eyebrow: 'THE PEOPLE BEHIND THE WORK', title: ['Two people.', 'One shared vision.'], intro: 'Two different paths, joined by an entrepreneurial spirit and a shared drive to build useful technology.', items: [
      { name: 'Jardel', role: 'Lead Investor · Business', bio: 'As the owner of Kairós Pinturas, Jardel is also the group’s lead investor and contributes to business administration. He brings years of entrepreneurial experience and believes growth should go hand in hand with family and looking out for others.', photo: '/images/jardel-astria-shirt.webp', photoAlt: 'Jardel wearing the black Ástria polo shirt', instagram: { label: '@jardelkairospinturas', url: 'https://www.instagram.com/jardelkairospinturas/' } },
      { name: 'John', role: 'CEO · Haster Group', bio: 'An entrepreneur and technology enthusiast since childhood, John is still discovering who he wants to become, guided by curiosity and hope for the future. He loves travel, Vasco, and time with his family. Friends from school remember him as fun, bright, and interesting, someone who follows his own path.', photo: '/images/john-astria-shirt.webp', photoAlt: 'John wearing the black Ástria polo shirt' },
    ] },
    journey: { section: '04 / OUR STORY', eyebrow: 'WHAT BRINGS US TOGETHER', title: ['Great things', 'happen when', 'ideas meet.'], description: 'Like galaxies drawn together and changed by the encounter, we believe great work happens when people, ideas, and purpose come together.', cta: 'Learn what we believe', note: 'AN ARTISTIC METAPHOR — NOT AN ASTRONOMICAL SIMULATION' },
    footer: { eyebrow: 'BE PART OF WHAT COMES NEXT', title: ['Let’s build', 'the next chapter.'], contact: 'Get in touch', whatsapp: 'Chat with us on WhatsApp', tagline: 'Building what comes next.', links: 'Footer links', news: 'NOTES FROM THE ÁSTRIA UNIVERSE', newsDescription: 'Occasional updates and ideas.', email: 'Your email', subscribe: 'Subscribe', copyright: 'All rights reserved.', backToTop: 'Back to top ↑' },
  },
}

export function SitePreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('astria-language') === 'en' ? 'en' : 'pt' } catch { return 'pt' }
  })
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('astria-theme') === 'light' ? 'light' : 'dark' } catch { return 'dark' }
  })

  useLayoutEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR'
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) themeColor.content = theme === 'light' ? '#f7f5fa' : '#050407'
    document.title = language === 'en' ? 'Ástria — Building what comes next' : 'Ástria — Construindo o que vem depois'
    const description = document.querySelector('meta[name="description"]')
    if (description) description.content = language === 'en'
      ? 'Ástria is a technology company creating digital products that solve real problems and help build a better future.'
      : 'Ástria — tecnologia, pessoas e ideias construindo o que vem depois.'
    window.dispatchEvent(new Event('astria:layoutchange'))
  }, [language, theme])

  useEffect(() => {
    try {
      localStorage.setItem('astria-language', language)
      localStorage.setItem('astria-theme', theme)
    } catch { /* Preferences still work for the current visit if storage is unavailable. */ }
  }, [language, theme])

  const value = useMemo(() => ({ language, setLanguage, theme, setTheme, t: translations[language] }), [language, theme])
  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext)
  if (!context) throw new Error('useSitePreferences must be used inside SitePreferencesProvider')
  return context
}
