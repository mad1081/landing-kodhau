<template>
  <aside class="hidden w-20 flex-col justify-between border-r border-slate-200 bg-slate-50 px-3 py-4 sm:flex lg:w-24">
    <div class="flex flex-col items-center gap-8">
      <NuxtLink to="/" class="flex items-center justify-center">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-900">
          K
        </span>
      </NuxtLink>

      <nav aria-label="Основная навигация">
        <ul class="flex flex-col items-center gap-4 text-slate-400">
          <li>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-medium text-slate-50 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              aria-label="Панель прогресса"
            >
              <span class="sr-only">Панель прогресса</span>
              <span class="text-base">📚</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-medium text-slate-500 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              aria-label="Календарь"
            >
              <span class="text-base">📅</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-medium text-slate-500 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              aria-label="Сообщения"
            >
              <span class="text-base">💬</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-medium text-slate-500 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              aria-label="Настройки"
            >
              <span class="text-base">⚙️</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <div class="flex flex-col items-center gap-3">
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
        aria-label="Профиль пользователя"
      >
        <span>JS</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface SidebarProps {}

defineProps<SidebarProps>()
</script>

