<template>
  <section class="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
    <header class="mb-4 flex items-center justify-between gap-2">
      <div>
        <h2 class="text-sm font-semibold text-slate-900 sm:text-base">
          Мои уроки
        </h2>
        <p class="mt-1 text-xs text-slate-600">
          Продолжайте обучение с того места, где остановились.
        </p>
      </div>
    </header>

    <ul class="space-y-4">
      <li
        v-for="lesson in lessons"
        :key="lesson.id"
        class="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-start gap-3">
          <button
            type="button"
            class="mt-0.5 inline-flex h-9 items-center justify-center rounded-full bg-pink-500 px-3 text-xs font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          >
            Начать
          </button>
          <div>
            <p class="text-sm font-semibold text-slate-900">
              {{ lesson.title }}
            </p>
            <p class="mt-0.5 text-xs text-slate-500">
              {{ lesson.duration }} ·
              <a
                :href="lesson.url"
                class="text-xs text-blue-600 underline underline-offset-2"
              >
                Открыть урок
              </a>
            </p>
            <div class="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
              <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                <div
                  class="h-1.5 rounded-full bg-pink-500"
                  :style="{ width: `${lesson.progress}%` }"
                />
              </div>
              <span class="whitespace-nowrap font-medium text-slate-700">
                {{ lesson.progress }}% завершено
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2">
          <span
            class="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700"
          >
            Напоминание
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
interface Lesson {
  id: number
  title: string
  duration: string
  url: string
  progress: number
}

interface LessonsListProps {
  lessons: Lesson[]
}

defineProps<LessonsListProps>()
</script>

