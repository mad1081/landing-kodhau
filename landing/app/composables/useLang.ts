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

    // Comparison cards
    cmpTradLabel: 'Traditional courses',
    cmp1Cat: 'Time to First Project',
    cmp1KhVal: '14 days', cmp1KhSub: 'You ship a working app',
    cmp1TrVal: '3–4 months', cmp1TrSub: 'Theory first, project maybe later',
    cmp2Cat: 'Practice vs Theory',
    cmp2KhVal: '80%', cmp2KhSub: 'Of your time is writing real code',
    cmp2TrVal: '20%', cmp2TrSub: 'Most time is watching videos',
    cmp3Cat: 'Knowledge Retention',
    cmp3KhVal: '95%', cmp3KhSub: 'You learn when you hit a real error',
    cmp3TrVal: '12%', cmp3TrSub: 'Forgotten within a week',
    cmp4Cat: 'Feedback Speed',
    cmp4KhVal: 'Instant', cmp4KhSub: 'AI reviews every submission',
    cmp4TrVal: 'Days', cmp4TrSub: 'Waiting for a tutor reply',
    cmp5Cat: 'Getting Unstuck',
    cmp5KhVal: 'Minutes', cmp5KhSub: 'AI hint guides you to the answer',
    cmp5TrVal: 'Hours', cmp5TrSub: 'Forum posts or searching alone',

    // Credibility
    credTitle: 'Credibility you can feel',
    credSubtitle: 'Built by working developers. Designed for learners who want a clear path, not a content dump.',
    quote1: '"The biggest difference is the order. I stopped jumping around and finally built a small app end-to-end."',
    quote1Author: 'Amina · Self-taught developer',
    quote2: '"Short lessons + practice steps means I actually write code. I don\'t just watch someone else do it."',
    quote2Author: 'Jon · Career switcher',

    // CTA
    ctaTitle: 'Start learning with a plan you can follow',
    ctaSubtitle: 'Create your account and begin the first track in minutes.',
    ctaButton: 'Register and start',

    // Footer
    footerRights: 'All rights reserved',
    footerCreated: 'Created by Zhasulan Serikbek',
    footerTerms: 'Terms',
    footerPrivacy: 'Privacy',
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

    cmpTradLabel: 'Традиционные курсы',
    cmp1Cat: 'Время до первого проекта',
    cmp1KhVal: '14 дней', cmp1KhSub: 'Вы создаёте рабочее приложение',
    cmp1TrVal: '3–4 месяца', cmp1TrSub: 'Сначала теория, проект — потом',
    cmp2Cat: 'Практика против теории',
    cmp2KhVal: '80%', cmp2KhSub: 'Вашего времени уходит на написание кода',
    cmp2TrVal: '20%', cmp2TrSub: 'Большую часть времени смотрите видео',
    cmp3Cat: 'Удержание знаний',
    cmp3KhVal: '95%', cmp3KhSub: 'Вы учитесь в момент реальной ошибки',
    cmp3TrVal: '12%', cmp3TrSub: 'Через неделю всё забыто',
    cmp4Cat: 'Скорость обратной связи',
    cmp4KhVal: 'Мгновенно', cmp4KhSub: 'ИИ проверяет каждое решение',
    cmp4TrVal: 'Дни', cmp4TrSub: 'Ожидание ответа преподавателя',
    cmp5Cat: 'Выход из тупика',
    cmp5KhVal: 'Минуты', cmp5KhSub: 'ИИ-подсказка ведёт вас к ответу',
    cmp5TrVal: 'Часы', cmp5TrSub: 'Форумы или поиск в одиночку',

    credTitle: 'Доверие, которое ощущается',
    credSubtitle: 'Создано практикующими разработчиками. Для тех, кто хочет чёткий путь, а не свалку контента.',
    quote1: '«Главное отличие — порядок. Я перестал метаться и наконец собрал небольшое приложение от начала до конца.»',
    quote1Author: 'Амина · Самоучка',
    quote2: '«Короткие уроки + практика — это значит, что я реально пишу код. Не просто наблюдаю за другим.»',
    quote2Author: 'Джон · Смена карьеры',

    ctaTitle: 'Начните учиться по понятному плану',
    ctaSubtitle: 'Создайте аккаунт и начните первый трек за несколько минут.',
    ctaButton: 'Зарегистрироваться и начать',

    footerRights: 'Все права защищены',
    footerCreated: 'Создано Жасуланом Серикбеком',
    footerTerms: 'Условия',
    footerPrivacy: 'Конфиденциальность',
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

    cmpTradLabel: 'Дәстүрлі курстар',
    cmp1Cat: 'Бірінші жобаға дейін',
    cmp1KhVal: '14 күн', cmp1KhSub: 'Жұмыс істейтін қосымша жасайсыз',
    cmp1TrVal: '3–4 ай', cmp1TrSub: 'Алдымен теория, жоба — кейін',
    cmp2Cat: 'Практика мен теория',
    cmp2KhVal: '80%', cmp2KhSub: 'Уақытыңыз нақты код жазуға кетеді',
    cmp2TrVal: '20%', cmp2TrSub: 'Уақыттың көбі видео қарауға кетеді',
    cmp3Cat: 'Білімді сақтау',
    cmp3KhVal: '95%', cmp3KhSub: 'Нақты қатені кезінде үйренесіз',
    cmp3TrVal: '12%', cmp3TrSub: 'Бір аптада ұмытылады',
    cmp4Cat: 'Кері байланыс жылдамдығы',
    cmp4KhVal: 'Бірден', cmp4KhSub: 'ЖИ әр шешімді тексереді',
    cmp4TrVal: 'Күндер', cmp4TrSub: 'Оқытушының жауабын күту',
    cmp5Cat: 'Тығырықтан шығу',
    cmp5KhVal: 'Минуттар', cmp5KhSub: 'ЖИ-кеңес жауапқа жетелейді',
    cmp5TrVal: 'Сағаттар', cmp5TrSub: 'Форумдар немесе жалғыз іздеу',

    credTitle: 'Сезіне алатын сенімділік',
    credSubtitle: 'Жұмыс істейтін әзірлеушілер жасаған. Контент үймесін емес, нақты жолды қалайтын үйренушілер үшін.',
    quote1: '«Ең үлкен айырмашылық — реттілік. Секіруді тоқтаттым және соңында кішкентай қосымша жасап шықтым.»',
    quote1Author: 'Амина · Өз бетімен үйренуші',
    quote2: '«Қысқа сабақтар + практика — мен шынымен код жазамын. Тек біреудің жазғанын қараған жоқпын.»',
    quote2Author: 'Джон · Мансап ауыстырушы',

    ctaTitle: 'Ұстана алатын жоспармен оқуды бастаңыз',
    ctaSubtitle: 'Аккаунт жасап, бірінші тректі минуттарда бастаңыз.',
    ctaButton: 'Тіркеліп бастау',

    footerRights: 'Барлық құқықтар қорғалған',
    footerCreated: 'Жасулан Серікбек жасаған',
    footerTerms: 'Шарттар',
    footerPrivacy: 'Құпиялылық',
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
