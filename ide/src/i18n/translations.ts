export type Lang = 'en' | 'ru' | 'kk'

export const translations = {
  en: {
    // Sidebar
    dashboard: 'Dashboard',
    admin: 'Admin',
    studentGroups: 'Student Groups',
    profile: 'Profile',
    signOut: 'Sign out',

    // Dashboard
    welcomeBack: 'Welcome back, Developer!',
    pickUp: 'Pick up where you left off, or start something new.',
    courses: 'Courses',
    lessonsCompleted: 'Lessons Completed',
    tasksSolved: 'Tasks Solved',
    allCourses: 'All Courses',
    noCourses: 'No courses yet.',
    couldNotLoad: 'Could not load courses.',

    // Auth
    checkEmail: 'Check your email — magic link sent to',
    sendMagicLink: 'Send magic link',
    sending: 'Sending…',
    orContinueWith: 'or continue with',
    continueWithGitHub: 'Continue with GitHub',

    // Course plan
    backToDashboard: '← Dashboard',
    noModules: 'No modules yet.',
    loading: 'Loading…',

    // IDE
    backToTasks: '← Back to tasks',
    run: '▶ Run',
    running: 'Running…',
    light: 'Light',
    dark: 'Dark',
    inputOutput: 'Input / Output',
    constraints: 'Constraints',
    noExamples: 'No examples provided.',
    aiMentor: 'AI Mentor',
    askMentor: 'Ask mentor',
    voiceOn: 'Voice ON',
    voiceOff: 'Voice OFF',
    output: 'Output',
    runToSeeOutput: 'Run your code to see output.',

    // Admin
    courseManagement: 'Course Management',
    manageCourses: 'Manage courses, modules, lessons, and tasks.',
    liveRepositories: 'Live Repositories',
    noCoursesYet: 'No courses yet. Create one →',
    newCourse: 'New Course',
    newModule: 'New Module',
    newLesson: 'New Lesson',
    newTask: 'New Task',
    createCourse: 'Create Course',
    createModule: 'Create Module',
    createLesson: 'Create Lesson',
    createTask: 'Create Task',

    // Groups
    studentGroupsTitle: 'Student Groups',
    comingSoon: 'Coming soon.',

    // 404
    pageNotFound: 'Page not found',
    pageNotFoundDesc: "The page you're looking for doesn't exist.",
    goHome: 'Go home',
  },

  ru: {
    dashboard: 'Главная',
    admin: 'Админ',
    studentGroups: 'Группы студентов',
    profile: 'Профиль',
    signOut: 'Выйти',

    welcomeBack: 'С возвращением!',
    pickUp: 'Продолжите с того места, где остановились.',
    courses: 'Курсы',
    lessonsCompleted: 'Уроков пройдено',
    tasksSolved: 'Задач решено',
    allCourses: 'Все курсы',
    noCourses: 'Курсов пока нет.',
    couldNotLoad: 'Не удалось загрузить курсы.',

    checkEmail: 'Проверьте почту — ссылка отправлена на',
    sendMagicLink: 'Отправить ссылку',
    sending: 'Отправка…',
    orContinueWith: 'или войти через',
    continueWithGitHub: 'Войти через GitHub',

    backToDashboard: '← Главная',
    noModules: 'Модулей пока нет.',
    loading: 'Загрузка…',

    backToTasks: '← К задачам',
    run: '▶ Запустить',
    running: 'Выполняется…',
    light: 'Светлая',
    dark: 'Тёмная',
    inputOutput: 'Вход / Выход',
    constraints: 'Ограничения',
    noExamples: 'Примеры не указаны.',
    aiMentor: 'ИИ-ментор',
    askMentor: 'Спросить ментора',
    voiceOn: 'Голос ВКЛ',
    voiceOff: 'Голос ВЫКЛ',
    output: 'Вывод',
    runToSeeOutput: 'Запустите код, чтобы увидеть результат.',

    courseManagement: 'Управление курсами',
    manageCourses: 'Создавайте курсы, модули, уроки и задачи.',
    liveRepositories: 'Курсы',
    noCoursesYet: 'Курсов нет. Создайте первый →',
    newCourse: 'Новый курс',
    newModule: 'Новый модуль',
    newLesson: 'Новый урок',
    newTask: 'Новая задача',
    createCourse: 'Создать курс',
    createModule: 'Создать модуль',
    createLesson: 'Создать урок',
    createTask: 'Создать задачу',

    studentGroupsTitle: 'Группы студентов',
    comingSoon: 'Скоро.',

    pageNotFound: 'Страница не найдена',
    pageNotFoundDesc: 'Такой страницы не существует.',
    goHome: 'На главную',
  },

  kk: {
    dashboard: 'Басты бет',
    admin: 'Әкімші',
    studentGroups: 'Студент топтары',
    profile: 'Профиль',
    signOut: 'Шығу',

    welcomeBack: 'Қайта келдіңіз!',
    pickUp: 'Тоқтаған жерінізден жалғастырыңыз.',
    courses: 'Курстар',
    lessonsCompleted: 'Өтілген сабақтар',
    tasksSolved: 'Шешілген тапсырмалар',
    allCourses: 'Барлық курстар',
    noCourses: 'Курс жоқ.',
    couldNotLoad: 'Курстарды жүктеу мүмкін болмады.',

    checkEmail: 'Поштаңызды тексеріңіз — сілтеме жіберілді',
    sendMagicLink: 'Сілтеме жіберу',
    sending: 'Жіберілуде…',
    orContinueWith: 'немесе кіру',
    continueWithGitHub: 'GitHub арқылы кіру',

    backToDashboard: '← Басты бет',
    noModules: 'Модульдер жоқ.',
    loading: 'Жүктелуде…',

    backToTasks: '← Тапсырмаларға',
    run: '▶ Іске қосу',
    running: 'Орындалуда…',
    light: 'Ашық',
    dark: 'Қараңғы',
    inputOutput: 'Кіріс / Шығыс',
    constraints: 'Шектеулер',
    noExamples: 'Мысалдар көрсетілмеген.',
    aiMentor: 'ЖИ-ментор',
    askMentor: 'Ментордан сұрау',
    voiceOn: 'Дауыс ҚОСУ',
    voiceOff: 'Дауыс ӨШІРУ',
    output: 'Нәтиже',
    runToSeeOutput: 'Нәтижені көру үшін кодты іске қосыңыз.',

    courseManagement: 'Курстарды басқару',
    manageCourses: 'Курс, модуль, сабақ және тапсырмалар жасаңыз.',
    liveRepositories: 'Курстар',
    noCoursesYet: 'Курс жоқ. Жаңасын жасаңыз →',
    newCourse: 'Жаңа курс',
    newModule: 'Жаңа модуль',
    newLesson: 'Жаңа сабақ',
    newTask: 'Жаңа тапсырма',
    createCourse: 'Курс жасау',
    createModule: 'Модуль жасау',
    createLesson: 'Сабақ жасау',
    createTask: 'Тапсырма жасау',

    studentGroupsTitle: 'Студент топтары',
    comingSoon: 'Жақында.',

    pageNotFound: 'Бет табылмады',
    pageNotFoundDesc: 'Мұндай бет жоқ.',
    goHome: 'Басты бетке',
  },
} satisfies Record<string, Record<string, string>>

export type TranslationKey = keyof typeof translations.en
