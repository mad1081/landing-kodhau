<template>
  <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <article
      v-for="item in classes"
      :key="item.id"
      class="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
    >
      <div class="flex items-start justify-between gap-2">
        <div class="space-y-1">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500">
            Курс {{ item.code }}
          </p>
          <h2 class="text-base font-semibold text-slate-900">
            {{ item.name }}
          </h2>
        </div>

        <div
          class="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-50"
        >
          <div
            :class="[
              'absolute inset-1 rounded-full',
              item.accentColor,
            ]"
          />
          <div class="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold">
            {{ item.percent }}%
          </div>
        </div>
      </div>

      <p class="mt-4 text-xs text-slate-500">
        Текущий прогресс по этому курсу.
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
interface ClassProgressCard {
  id: number
  name: string
  percent: number
  code: string
  accentColor: string
}

interface HeaderStatsProps {
  classes: ClassProgressCard[]
}

defineProps<HeaderStatsProps>()
</script>

