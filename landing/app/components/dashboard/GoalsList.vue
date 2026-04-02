<template>
  <section class="rounded-3xl bg-lime-50 p-5 shadow-sm ring-1 ring-lime-100">
    <header class="mb-4 flex items-center justify-between gap-2">
      <div>
        <h2 class="text-sm font-semibold text-slate-900 sm:text-base">
          Мои цели
        </h2>
        <p class="mt-1 text-xs text-slate-600">
          Отслеживайте задачи по программированию.
        </p>
      </div>
      <button
        type="button"
        class="hidden rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-lime-50 sm:inline-flex"
      >
        Смотреть все
      </button>
    </header>

    <ul class="space-y-3">
      <li
        v-for="goal in goals"
        :key="goal.id"
        class="flex items-start gap-3 rounded-2xl bg-white/70 p-3"
      >
        <div
          class="flex flex-col items-center rounded-2xl bg-lime-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-lime-800"
        >
          <span>{{ goal.date.split(' ')[0] }}</span>
          <span>{{ goal.date.split(' ')[1] }}</span>
        </div>
        <div class="flex-1 space-y-2">
          <p class="text-xs font-semibold text-slate-900 sm:text-sm">
            {{ goal.title }} — <span class="font-normal text-slate-500">{{ goal.subject }}</span>
          </p>
          <div class="flex items-center gap-2 text-[10px] text-slate-500">
            <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-lime-100">
              <div
                class="h-1.5 rounded-full bg-lime-500"
                :style="{ width: `${goal.progress}%` }"
              />
            </div>
            <span class="min-w-[2.5rem] text-right font-medium text-lime-700">
              {{ goal.progress }}%
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
interface Goal {
  id: number
  date: string
  title: string
  subject: string
  progress: number
}

interface GoalsListProps {
  goals: Goal[]
}

defineProps<GoalsListProps>()
</script>

