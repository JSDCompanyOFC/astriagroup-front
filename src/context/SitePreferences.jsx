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
    founders: { section: '03 / FUNDADORES', eyebrow: 'PESSOAS QUE FAZEM', title: ['Três pessoas.', 'Uma visão.'], intro: 'Uma jornada construída com diferentes experiências, talentos e vontade de fazer acontecer.', items: [
      { name: 'Jardel', role: 'Produto & Negócio', bio: 'Conecta visão de produto e oportunidades para transformar boas ideias em experiências úteis.' },
      { name: 'John', role: 'Tecnologia & Produto', bio: 'Constrói soluções digitais e aproxima tecnologia das necessidades reais das pessoas.' },
      { name: 'Flávio', role: 'Produto & Operações', bio: 'Cuida da operação e da experiência, fortalecendo o trabalho em colaboração.' },
    ] },
    journey: { section: '04 / NOSSA JORNADA', eyebrow: 'O ENCONTRO QUE NOS MOVE', title: ['Grandes ideias', 'nascem do', 'encontro.'], description: 'Assim como galáxias que se aproximam e transformam tudo ao redor, acreditamos que resultados extraordinários surgem quando pessoas, ideias e propósito se encontram.', cta: 'Conheça nossa essência', note: 'UMA METÁFORA VISUAL — NÃO UMA SIMULAÇÃO ASTRONÔMICA' },
    footer: { eyebrow: 'FAÇA PARTE DO QUE VEM DEPOIS', title: ['Vamos construir', 'o próximo capítulo?'], contact: 'Entre em contato', tagline: 'Construindo o que vem depois.', links: 'Links do rodapé', news: 'NOTAS DO UNIVERSO ÁSTRIA', newsDescription: 'Novidades e ideias, de vez em quando.', email: 'Seu e-mail', subscribe: 'Inscrever-se', copyright: 'Todos os direitos reservados.', backToTop: 'Voltar ao topo ↑' },
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
    founders: { section: '03 / FOUNDERS', eyebrow: 'THE PEOPLE BEHIND THE WORK', title: ['Three people.', 'One shared vision.'], intro: 'Different experiences and strengths, brought together to turn ideas into action.', items: [
      { name: 'Jardel', role: 'Product & Business', bio: 'Connects product thinking with new opportunities to turn good ideas into useful experiences.' },
      { name: 'John', role: 'Technology & Product', bio: 'Builds digital solutions that bring technology closer to people’s real needs.' },
      { name: 'Flávio', role: 'Product & Operations', bio: 'Focuses on operations and customer experience, helping the team work better together.' },
    ] },
    journey: { section: '04 / OUR STORY', eyebrow: 'WHAT BRINGS US TOGETHER', title: ['Great things', 'happen when', 'ideas meet.'], description: 'Like galaxies drawn together and changed by the encounter, we believe great work happens when people, ideas, and purpose come together.', cta: 'Learn what we believe', note: 'AN ARTISTIC METAPHOR — NOT AN ASTRONOMICAL SIMULATION' },
    footer: { eyebrow: 'BE PART OF WHAT COMES NEXT', title: ['Let’s build', 'the next chapter.'], contact: 'Get in touch', tagline: 'Building what comes next.', links: 'Footer links', news: 'NOTES FROM THE ÁSTRIA UNIVERSE', newsDescription: 'Occasional updates and ideas.', email: 'Your email', subscribe: 'Subscribe', copyright: 'All rights reserved.', backToTop: 'Back to top ↑' },
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
