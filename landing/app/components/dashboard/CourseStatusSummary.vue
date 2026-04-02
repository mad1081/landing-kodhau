<template>
  <section class="grid gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
    <!-- <article class="flex flex-col justify-between rounded-2xl bg-slate-50 p-4"> -->
      <!-- <p class="text-xs font-medium uppercase tracking-wide text-slate-500"> -->
        <!-- Всего курсов -->
      <!-- </p> -->
      <!-- <p class="mt-2 text-2xl font-semibold text-slate-900"> -->
        <!-- {{ status.total }} -->
      <!-- </p> -->
      <!-- <p class="mt-1 text-xs text-slate-500"> -->
        <!-- Все активные направления по программированию. -->
      <!-- </p> -->
    <!-- </article> -->

    <div class="grid gap-3 text-sm text-slate-700">
      <article class="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-emerald-700">
            В процессе
          </p>
          <p class="text-sm font-semibold text-emerald-900">
            {{ status.inProgress }}
          </p>
        </div>
        <div class="h-2 w-24 rounded-full bg-emerald-200">
          <div class="h-2 w-2/3 rounded-full bg-emerald-500" />
        </div>
      </article>

      <article class="flex items-center justify-between rounded-2xl bg-sky-50 px-4 py-3">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-sky-700">
            Завершено
          </p>
          <p class="text-sm font-semibold text-sky-900">
            {{ status.completed }}
          </p>
        </div>
        <div class="h-2 w-24 rounded-full bg-sky-200">
          <div class="h-2 w-3/4 rounded-full bg-sky-500" />
        </div>
      </article>

      <article class="flex items-center justify-between rounded-2xl bg-rose-50 px-3 py-2">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-rose-700">
            Пока не начато
          </p>
          <p class="text-sm font-semibold text-rose-900">
            {{ status.notStarted }}
          </p>
        </div>
        <div class="h-2 w-20 rounded-full bg-rose-200">
          <div class="h-2 w-1/4 rounded-full bg-rose-500" />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CourseStatus {
  total: number
  inProgress: number
  completed: number
  notStarted: number
}

interface CourseStatusSummaryProps {
  status: CourseStatus
}

defineProps<CourseStatusSummaryProps>()
</script>

