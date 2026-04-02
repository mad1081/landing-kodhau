<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <div class="flex min-h-screen">
      <Sidebar />

      <main class="flex-1 bg-slate-50">
        <div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 lg:px-8">
          <header class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Мой прогресс
              </h1>
              <p class="mt-1 text-sm text-slate-600 sm:text-base">
                Отслеживайте прогресс по направлениям программирования и целям.
              </p>
            </div>
          </header>

          <section class="flex flex-col gap-8">
            <HeaderStats :classes="classProgress" />

            <div class="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
              <div class="flex flex-col gap-6">
                <div class="grid gap-6 lg:grid-cols-2">
                  <TimeAndCoursesSummary :time-summary="timeSummary" :courses-summary="coursesSummary" />
                  <CourseStatusSummary :status="courseStatus" />
                </div>

                <LessonsList :lessons="lessons" />
              </div>

              <div class="flex flex-col gap-6">
                <GoalsList :goals="goals" />
                <UpcomingExams />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/dashboard/Sidebar.vue'
import HeaderStats from '~/components/dashboard/HeaderStats.vue'
import TimeAndCoursesSummary from '~/components/dashboard/TimeAndCoursesSummary.vue'
import CourseStatusSummary from '~/components/dashboard/CourseStatusSummary.vue'
import GoalsList from '~/components/dashboard/GoalsList.vue'
import LessonsList from '~/components/dashboard/LessonsList.vue'
import UpcomingExams from '~/components/dashboard/UpcomingExams.vue'

interface ClassProgress {
  id: number
  name: string
  percent: number
  code: string
  accentColor: string
}

interface TimeSummary {
  hours: number
  label: string
  changeLabel: string
  changeValue: string
}

interface CoursesSummary {
  totalCourses: number
  completedCourses: number
}

interface CourseStatus {
  total: number
  inProgress: number
  completed: number
  notStarted: number
}

interface Goal {
  id: number
  date: string
  title: string
  subject: string
  progress: number
}

interface Lesson {
  id: number
  title: string
  duration: string
  url: string
  progress: number
}

const classProgress: ClassProgress[] = [
  { id: 1, name: 'JavaScript', percent: 76, code: 'JS01', accentColor: 'bg-emerald-100' },
  { id: 2, name: 'TypeScript', percent: 54, code: 'TS02', accentColor: 'bg-purple-100' },
  { id: 3, name: 'React', percent: 32, code: 'RE03', accentColor: 'bg-pink-100' },
  { id: 4, name: 'PostgreSQL', percent: 89, code: 'PG04', accentColor: 'bg-sky-100' },
]

const timeSummary: TimeSummary = {
  hours: 32.5,
  label: 'Проведено за обучением',
  changeLabel: 'по сравнению с прошлой неделей',
  changeValue: '+10%',
}

const coursesSummary: CoursesSummary = {
  totalCourses: 12,
  completedCourses: 2,
}

const courseStatus: CourseStatus = {
  total: 12,
  inProgress: 4,
  completed: 2,
  notStarted: 6,
}

const goals: Goal[] = [
  {
    id: 1,
    date: '18 JUN',
    title: 'Написать конспект по основам JavaScript',
    subject: 'JavaScript',
    progress: 74,
  },
  {
    id: 2,
    date: '21 JUN',
    title: 'Подготовить шпаргалку по SQL-запросам',
    subject: 'PostgreSQL',
    progress: 62,
  },
  {
    id: 3,
    date: '30 JUN',
    title: 'Сделать небольшой проект на React',
    subject: 'React',
    progress: 18,
  },
]

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'JavaScript: основы синтаксиса',
    duration: '2 ч 30 мин',
    url: 'https://example.com/javascript-basics',
    progress: 15,
  },
  {
    id: 2,
    title: 'PostgreSQL: работа с запросами',
    duration: '1 ч 45 мин',
    url: 'https://example.com/postgresql-queries',
    progress: 15,
  },
]
</script>

