<template>
  <section class="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
    <header class="flex items-center justify-between gap-2">
      <div>
        <h2 class="text-sm font-semibold text-slate-900 sm:text-base">
          Ближайшие экзамены
        </h2>
        <p class="mt-1 text-xs text-slate-600">
          Узнайте, какие проверки знаний вас ждут дальше.
        </p>
      </div>
    </header>

    <div class="flex flex-col gap-4 rounded-2xl bg-slate-900 px-4 py-5 text-slate-50">
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-lg"
          aria-hidden="true"
        >
          🎓
        </div>
        <div>
          <p class="text-sm font-semibold">
            Скоро назначен экзамен
          </p>
          <p class="mt-1 text-xs text-slate-300">
            Ближайший экзамен: <span class="font-semibold">«Web-сайтты жобалау және үздіксіз жұмыс істеуін қамтамасыз ету»</span>.
            Мы напомним вам о дате и подготовке заранее.
          </p>
        </div>
      </div>

      <button
        type="button"
        class="inline-flex w-max items-center justify-center rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        Запланировать первый экзамен
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
interface UpcomingExamsProps {}

defineProps<UpcomingExamsProps>()
</script>

