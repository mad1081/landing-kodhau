<template>
  <section class="flex flex-col gap-4">
    <div class="grid gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500">
            {{ timeSummary.label }}
          </p>
          <p class="mt-2 text-2xl font-semibold text-slate-900">
            {{ timeSummary.hours.toFixed(2) }}
            <span class="text-sm font-normal text-slate-500">ч</span>
          </p>
        </div>
        <div class="flex flex-col items-end text-xs font-medium">
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-600">
            <span>▲</span>
            <span>{{ timeSummary.changeValue }}</span>
          </span>
          <span class="mt-1 text-slate-500">
            {{ timeSummary.changeLabel }}
          </span>
        </div>
      </div>

      <div class="mt-4">
        <div class="flex items-end justify-between gap-2 text-[10px] text-slate-500">
          <span v-for="day in days" :key="day.label">
            {{ day.label }}
          </span>
        </div>
        <div class="mt-2 flex items-end justify-between gap-2 rounded-2xl bg-slate-50 px-3 py-2">
          <div
            v-for="day in days"
            :key="day.label"
            class="flex w-full flex-col items-center gap-1"
          >
            <div
              class="w-2 rounded-full bg-purple-300"
              :style="{ height: `${day.height}px` }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 rounded-3xl bg-slate-900 p-5 text-slate-50 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-300">
            Всего курсов
          </p>
          <p class="mt-2 text-2xl font-semibold">
            {{ coursesSummary.totalCourses }}
          </p>
        </div>
        <div class="relative h-16 w-16">
          <div class="absolute inset-0 rounded-full bg-slate-800" />
          <div class="absolute inset-2 rounded-full bg-slate-900" />
          <div class="absolute inset-[6px] rounded-full bg-emerald-400" />
          <div class="absolute inset-[18px] rounded-full bg-slate-900" />
        </div>
      </div>
      <p class="text-xs text-slate-300">
        {{ coursesSummary.completedCourses }} курса уже завершено.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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

interface TimeAndCoursesSummaryProps {
  timeSummary: TimeSummary
  coursesSummary: CoursesSummary
}

const props = defineProps<TimeAndCoursesSummaryProps>()

interface DayBar {
  label: string
  height: number
}

const days = computed<DayBar[]>(() => [
  { label: 'ПН', height: 26 },
  { label: 'ВТ', height: 40 },
  { label: 'СР', height: 52 },
  { label: 'ЧТ', height: 32 },
  { label: 'ПТ', height: 60 },
  { label: 'СБ', height: 44 },
  { label: 'ВС', height: 20 },
])
</script>

