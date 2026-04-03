export type Lang = 'en' | 'ru' | 'kk'

const STORAGE_KEY = 'kodhau-lang'

const translations = {
  en: {
    // Nav
    navProblem: 'Problem',
    navSolution: 'Solution',
    navFeatures: 'Features',
    navProof: 'Proof',
    navTryIde: 'Try IDE',
    login: 'Login',
    register: 'Register',

    // Hero
    heroLine1: 'Master',
    heroWord1: 'programming',
    heroLine2: 'in just',
    heroWord2: 'one month',
    heroLine3: 'with us!',
    heroSubtitle: 'Live lessons with an AI mentor that helps you master programming in a month. No fluff — only practical tasks and real feedback.',
    exploreCourse: 'Explore Course',
    joinFree: 'Join Free Course',

    // Trusted
    trustedBy: 'Trusted by students at',

    // Problem
    problemTitle: 'Most people learn in the wrong order',
    problem1: 'You bounce between videos and docs, but nothing connects into a plan.',
    problem2: 'You can follow a tutorial, but you freeze when you have to build alone.',
    problem3: 'You spend weeks on topics that don\'t move you closer to a real project.',

    // Why KodHau
    whyTitle: 'Why KodHau?',
    whySubtitle: 'For students who need results, not progress reports.',

    // Solution
    solutionTitle: 'Learn by building, with guardrails',
    solutionSubtitle: 'KodHau guides you through the essentials in the right sequence, then makes you practice until it clicks.',
    feat1Title: 'Structured curriculum',
    feat1Desc: 'A single path that builds foundations first, then projects — so you always know what\'s next.',
    feat2Title: 'Real coding practice',
    feat2Desc: 'Short exercises and project steps that force you to write code, not just consume content.',
    feat3Title: 'Modern stack',
    feat3Desc: 'Learn with tools you\'ll actually use: Git, TypeScript, APIs, and modern front-end patterns.',
    feat4Title: 'Clarity and focus',
    feat4Desc: 'Tight lessons, clear checklists, and practical outcomes — so you keep moving.',

    // Features
    featuresTitle: 'Key features',
    kf1Title: 'Milestone-driven path',
    kf1Desc: 'You always know what "done" looks like before you move on.',
    kf2Title: 'Short lessons, clear steps',
    kf2Desc: 'Read a concept, then immediately apply it with a concrete task.',
    kf3Title: 'AI mentor',
    kf3Desc: 'Get Socratic hints, not answers — so you actually learn.',
  },

  ru: {
    navProblem: 'Проблема',
    navSolution: 'Решение',
    navFeatures: 'Возможности',
    navProof: 'Доказательства',
    navTryIde: 'Попробовать IDE',
    login: 'Войти',
    register: 'Регистрация',

    heroLine1: 'Освойте',
    heroWord1: 'программирование',
    heroLine2: 'всего за',
    heroWord2: 'месяц',
    heroLine3: 'вместе с нами!',
    heroSubtitle: 'Живые занятия с ИИ-ментором, который поможет вам освоить программирование за месяц. Без лишних слов, только практические задания и обратная связь.',
    exploreCourse: 'Изучить курс',
    joinFree: 'Присоединиться бесплатно',

    trustedBy: 'Нам доверяют студенты',

    problemTitle: 'Большинство учатся в неправильном порядке',
    problem1: 'Вы переключаетесь между видео и документацией, но ничто не складывается в план.',
    problem2: 'Вы можете повторить туториал, но замираете, когда нужно построить что-то самостоятельно.',
    problem3: 'Вы тратите недели на темы, которые не приближают вас к реальному проекту.',

    whyTitle: 'Почему KodHau?',
    whySubtitle: 'Для студентов, которым нужен результат, а не отчёты об успеваемости.',

    solutionTitle: 'Учитесь на практике, с направляющей рукой',
    solutionSubtitle: 'KodHau проведёт вас через основы в правильной последовательности, а затем заставит практиковаться, пока не дойдёт.',
    feat1Title: 'Структурированная программа',
    feat1Desc: 'Единый путь: сначала основы, потом проекты — вы всегда знаете, что дальше.',
    feat2Title: 'Реальная практика кода',
    feat2Desc: 'Короткие упражнения, которые заставляют писать код, а не просто смотреть.',
    feat3Title: 'Современный стек',
    feat3Desc: 'Git, TypeScript, API и современный фронтенд — инструменты, которые реально нужны.',
    feat4Title: 'Ясность и фокус',
    feat4Desc: 'Краткие уроки, чёткие чеклисты и практичные результаты — вы двигаетесь вперёд.',

    featuresTitle: 'Ключевые возможности',
    kf1Title: 'Путь по вехам',
    kf1Desc: 'Вы всегда знаете, как выглядит "готово", прежде чем идти дальше.',
    kf2Title: 'Короткие уроки, чёткие шаги',
    kf2Desc: 'Прочитайте концепт — сразу примените его в конкретной задаче.',
    kf3Title: 'ИИ-ментор',
    kf3Desc: 'Получайте сократические подсказки, а не готовые ответы — так вы действительно учитесь.',
  },

  kk: {
    navProblem: 'Мәселе',
    navSolution: 'Шешім',
    navFeatures: 'Мүмкіндіктер',
    navProof: 'Дәлелдер',
    navTryIde: 'IDE-ді сынап көру',
    login: 'Кіру',
    register: 'Тіркелу',

    heroLine1: '',
    heroWord1: 'Бағдарламалауды',
    heroLine2: 'үйреніңіз тек',
    heroWord2: 'бір айда',
    heroLine3: 'бізбен бірге!',
    heroSubtitle: 'ЖИ-ментормен тікелей сабақтар — бір айда бағдарламалауды меңгеруге көмектеседі. Артық сөзсіз, тек практикалық тапсырмалар мен кері байланыс.',
    exploreCourse: 'Курсты зерттеу',
    joinFree: 'Тегін қосылу',

    trustedBy: 'Бізге студенттер сенеді',

    problemTitle: 'Көптеген адамдар дұрыс емес тәртіппен оқиды',
    problem1: 'Сіз видео мен құжаттама арасында ауысасыз, бірақ ештеңе жоспарға айналмайды.',
    problem2: 'Сіз туториалды қайталай аласыз, бірақ өз бетіңізше жасауыңыз керек болса тоқтап қаласыз.',
    problem3: 'Сіз нақты жобаға жақындатпайтын тақырыптарға апталар жұмсайсыз.',

    whyTitle: 'Неліктен KodHau?',
    whySubtitle: 'Нәтиже қажет студенттерге арналған, үлгерім есептері үшін емес.',

    solutionTitle: 'Бағыттаумен жасай отырып үйреніңіз',
    solutionSubtitle: 'KodHau негіздерді дұрыс ретпен үйретеді, содан кейін түсінгенше жаттықтырады.',
    feat1Title: 'Құрылымдалған бағдарлама',
    feat1Desc: 'Бірыңғай жол: алдымен негіздер, содан кейін жобалар — не болатынын әрқашан білесіз.',
    feat2Title: 'Нақты код практикасы',
    feat2Desc: 'Кодты жазуға мәжбүрлейтін қысқа жаттығулар — тек мазмұнды тұтыну емес.',
    feat3Title: 'Заманауи стек',
    feat3Desc: 'Git, TypeScript, API және заманауи фронтенд — шынымен қажет құралдар.',
    feat4Title: 'Анықтық және фокус',
    feat4Desc: 'Қысқа сабақтар, нақты тізімдер және практикалық нәтижелер — алға жылжисыз.',

    featuresTitle: 'Негізгі мүмкіндіктер',
    kf1Title: 'Белестер бойынша жол',
    kf1Desc: 'Алға жылжымас бұрын "дайын" нені білдіретінін әрқашан білесіз.',
    kf2Title: 'Қысқа сабақтар, нақты қадамдар',
    kf2Desc: 'Тұжырымдаманы оқыңыз — бірден нақты тапсырмада қолданыңыз.',
    kf3Title: 'ЖИ-ментор',
    kf3Desc: 'Дайын жауаптар емес, сократтық кеңестер алыңыз — осылай шынымен үйренесіз.',
  },
} as const

type TranslationKey = keyof typeof translations.en

export function useLang() {
  const lang = useState<Lang>('lang', () => {
    if (import.meta.client) {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'en' || stored === 'ru' || stored === 'kk') return stored
    }
    return 'ru'
  })

  function setLang(l: Lang) {
    lang.value = l
    if (import.meta.client) localStorage.setItem(STORAGE_KEY, l)
  }

  function t(key: TranslationKey): string {
    return (translations[lang.value] as any)[key] ?? (translations.en as any)[key] ?? key
  }

  return { lang, setLang, t }
}
