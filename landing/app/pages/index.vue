<template>
  <div class="min-h-screen bg-white text-slate-900">
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <a href="#top" class="flex items-center gap-3">
          <span aria-hidden="true" class="h-9 w-9 rounded-lg border border-slate-200 bg-slate-50" />
          <span class="text-base font-semibold tracking-tight text-slate-900">KodHau</span>
        </a>

        <nav class="hidden flex-1 justify-center lg:flex">
          <ul class="flex items-center gap-8 text-sm font-medium text-slate-700">
            <li><a href="#problem" class="text-slate-700">{{ t('navProblem') }}</a></li>
            <li><a href="#solution" class="text-slate-700">{{ t('navSolution') }}</a></li>
            <li><a href="#features" class="text-slate-700">{{ t('navFeatures') }}</a></li>
            <li><a href="#proof" class="text-slate-700">{{ t('navProof') }}</a></li>
            <li><a :href="ideUrl" class="text-slate-700" target="_blank" rel="noopener noreferrer">{{ t('navTryIde') }}</a></li>
          </ul>
        </nav>

        <div class="ml-auto flex items-center gap-2">
          <!-- Language picker -->
          <div class="flex gap-1">
            <button v-for="l in (['kk','ru','en'] as const)" :key="l"
              @click="setLang(l)"
              :class="['rounded px-1.5 py-1 text-[10px] font-bold transition-colors', lang === l ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900']">
              {{ l === 'kk' ? 'ҚАЗ' : l === 'ru' ? 'РУС' : 'ENG' }}
            </button>
          </div>

          <a :href="`${ideUrl}/auth`"
            class="hidden sm:inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900">
            {{ t('login') }}
          </a>
          <a :href="`${ideUrl}/auth`"
            class="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white">
            {{ t('register') }}
          </a>

          <!-- Mobile hamburger -->
          <button
            class="lg:hidden ml-1 rounded-md p-2 text-slate-600 hover:bg-slate-100"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Toggle menu"
          >
            <svg v-if="!mobileMenuOpen" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
            </svg>
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile nav drawer -->
      <div v-if="mobileMenuOpen" class="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
        <a href="#problem" class="block text-sm font-medium text-slate-700 py-2" @click="mobileMenuOpen = false">{{ t('navProblem') }}</a>
        <a href="#solution" class="block text-sm font-medium text-slate-700 py-2" @click="mobileMenuOpen = false">{{ t('navSolution') }}</a>
        <a href="#features" class="block text-sm font-medium text-slate-700 py-2" @click="mobileMenuOpen = false">{{ t('navFeatures') }}</a>
        <a href="#proof" class="block text-sm font-medium text-slate-700 py-2" @click="mobileMenuOpen = false">{{ t('navProof') }}</a>
        <a :href="ideUrl" target="_blank" rel="noopener noreferrer" class="block text-sm font-medium text-slate-700 py-2" @click="mobileMenuOpen = false">{{ t('navTryIde') }}</a>
        <div class="pt-2 border-t border-slate-100 flex gap-3">
          <a :href="`${ideUrl}/auth`" class="flex-1 text-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900">{{ t('login') }}</a>
          <a :href="`${ideUrl}/auth`" class="flex-1 text-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white">{{ t('register') }}</a>
        </div>
      </div>
    </header>
    <main>
      <!-- Section 1: Hero -->
      <section id="top" ref="heroRef" class="relative overflow-hidden px-4 py-20 md:py-28 lg:py-36">
        <!-- Checkered background with corner fade -->
        <div class="pointer-events-none absolute inset-0" :style="{
          backgroundImage: `
              linear-gradient(to right, rgba(226,232,240,0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(226,232,240,0.6) 1px, transparent 1px)
            `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }" />

        <!-- Draggable tech logos - z-5 so they're behind text -->
        <div v-for="logo in logos" :key="logo.id"
          class="absolute z-5 flex cursor-grab select-none flex-col items-center gap-2 transition-opacity duration-300 ease-out will-change-transform active:cursor-grabbing"
          :class="[
            draggingId === logo.id ? 'opacity-100 duration-0' : 'opacity-60 hover:opacity-100'
          ]" :style="{
            transform: `translate3d(${logo.x}px, ${logo.y}px, 0)`,
          }" @mousedown="(e) => startDrag(e, logo.id)" @touchstart="(e) => startDragTouch(e, logo.id)">
          <img :src="logo.src" :alt="logo.label" class="h-16 w-16 md:h-20 md:w-20" draggable="false" />
          <span class="text-xs font-medium text-slate-600">{{ logo.label }}</span>
        </div>

        <!-- Hero content - z-10 but pointer-events-none so logos can be dragged through -->
        <div class="font-inter pointer-events-none relative z-10 mx-auto max-w-4xl text-center">
          <h1
            class="overflow-visible text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {{ t('heroLine1') }}
            <span class="inline-block rounded-none px-2 py-1" style="
                background: linear-gradient(105deg, #ea580c 0%, #eab308 100%);
                transform: skewX(-6deg);
              ">
              <span class="inline-block text-white" style="transform: skewX(6deg)">{{ t('heroWord1') }}</span>
            </span>
            <br class="hidden sm:inline" />
            {{ t('heroLine2') }}
            <span class="inline-block rounded-none px-2 py-1" style="
                background: linear-gradient(105deg, #2563eb 0%, #7c3aed 100%);
                transform: skewX(6deg);
              ">
              <span class="inline-block text-white" style="transform: skewX(-6deg)">{{ t('heroWord2') }}</span>
            </span>
            <br class="hidden sm:inline" />
            {{ t('heroLine3') }}
          </h1>
          <p class="mx-auto mt-8 max-w-xl text-base text-slate-500 md:text-lg">
            {{ t('heroSubtitle') }}
          </p>
          <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#"
              class="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-base font-semibold text-white"
              @click.prevent="onGetStarted">
              <span>{{ t('exploreCourse') }}</span>
              <kbd class="rounded-md bg-blue-400 px-2 py-0.5 text-sm font-medium text-white">
                ⌘ S
              </kbd>
            </a>
            <a href="#"
              class="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900"
              @click.prevent="onScheduleCall">
              <span>{{ t('joinFree') }}</span>
              <kbd class="rounded-md bg-slate-100 px-2 py-0.5 text-sm font-medium text-slate-700">
                ⌘ K
              </kbd>
            </a>
          </div>
        </div>
      </section>

      <!-- Trusted by: infinite logo marquee -->
      <section class="border-y border-slate-200 bg-white py-8">
        <p class="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
          {{ t('trustedBy') }}
        </p>
        <div class="relative mt-6 overflow-hidden">
          <div class="flex w-max animate-trusted-marquee items-center gap-12 px-4" aria-hidden="true">
            <template v-for="(_, setIndex) in 2" :key="setIndex">
              <a v-for="school in trustedBySchools" :key="`${setIndex}-${school.name}`" :href="school.url"
                target="_blank" rel="noopener noreferrer"
                class="flex shrink-0 items-center justify-center gap-2 transition-opacity hover:opacity-80">
                <img v-if="school.logo" :src="school.logo" :alt="school.name"
                  class="h-8 max-w-[120px] object-contain object-center md:h-10" />
                <span v-else
                  class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                  {{ school.name }}
                </span>
              </a>
            </template>
          </div>
        </div>
      </section>

      <!-- Section 2: Problem -->
      <section id="problem" class="border-t border-slate-200 bg-slate-50 px-4 py-16 md:py-20">
        <div class="mx-auto max-w-3xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">
            {{ t('problemTitle') }}
          </h2>
          <ul class="mt-8 space-y-6 text-lg text-slate-700">
            <li>{{ t('problem1') }}</li>
            <li>{{ t('problem2') }}</li>
            <li>{{ t('problem3') }}</li>
          </ul>
        </div>
      </section>

      <section class="bg-white py-24">
        <div class="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="text-center">
            <h2 class="text-4xl font-bold text-gray-900 md:text-4xl">
              {{ t('whyTitle') }}
            </h2>
            <p class="mx-auto mt-4 max-w-3xl text-lg text-gray-600 md:text-xl">
              {{ t('whySubtitle') }}
            </p>
          </div>

          <!-- Card Grid -->
          <div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div v-for="(item, index) in comparisonData" :key="index"
              class="relative rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-blue-500">
              <!-- Category label -->
              <div class="mb-3 text-sm font-medium text-gray-500">
                {{ item.category }}
              </div>

              <!-- Comparison row -->
              <div class="flex items-end justify-between gap-4">
                <!-- KodHau side -->
                <div class="flex-1">
                  <div :class="[
                    'mb-2 text-3xl font-bold',
                    item.kodhau.valueClass || 'text-gray-900',
                  ]">
                    {{ item.kodhau.value }}
                  </div>
                  <div v-if="item.kodhau.subtitle" class="mb-2 text-xs text-gray-500">
                    {{ item.kodhau.subtitle }}
                  </div>
                  <div class="text-sm text-gray-600">
                    {{ item.kodhau.label }}
                  </div>
                </div>

                <!-- VS divider -->
                <div class="mb-4 font-medium text-blue-400">
                  VS
                </div>

                <!-- Traditional side -->
                <div class="flex-1 text-right">
                  <div :class="[
                    'mb-2 font-bold',
                    item.traditional.valueClass || 'text-3xl text-gray-400',
                  ]">
                    {{ item.traditional.value }}
                  </div>
                  <div v-if="item.traditional.subtitle" class="mb-2 text-xs text-gray-500">
                    {{ item.traditional.subtitle }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ item.traditional.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <!-- Section 3: Solution / Product -->
      <section id="solution" class="border-t border-slate-200 px-4 py-16 md:py-20">
        <div class="mx-auto max-w-4xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">
            {{ t('solutionTitle') }}
          </h2>
          <p class="mt-4 text-lg text-slate-600">
            {{ t('solutionSubtitle') }}
          </p>
          <ul class="mt-10 grid gap-6 sm:grid-cols-2">
            <li class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h10" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">{{ t('feat1Title') }}</h3>
                  <p class="mt-2 text-slate-600">{{ t('feat1Desc') }}</p>
                </div>
              </div>
            </li>
            <li class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 18l6-6-6-6" />
                    <path d="M8 6l-6 6 6 6" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">{{ t('feat2Title') }}</h3>
                  <p class="mt-2 text-slate-600">{{ t('feat2Desc') }}</p>
                </div>
              </div>
            </li>
            <li class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 7l-8 4-8-4" />
                    <path d="M4 7v10l8 4 8-4V7" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">{{ t('feat3Title') }}</h3>
                  <p class="mt-2 text-slate-600">{{ t('feat3Desc') }}</p>
                </div>
              </div>
            </li>
            <li class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20s7-4 7-10V6l-7-2-7 2v4c0 6 7 10 7 10z" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">{{ t('feat4Title') }}</h3>
                  <p class="mt-2 text-slate-600">{{ t('feat4Desc') }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Section 4: Key Features -->
      <section id="features" class="border-t border-slate-200 bg-slate-50 px-4 py-16 md:py-20">
        <div class="mx-auto max-w-4xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">
            {{ t('featuresTitle') }}
          </h2>
          <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-base font-semibold text-slate-900">{{ t('kf1Title') }}</h3>
                  <p class="mt-1 text-slate-600">{{ t('kf1Desc') }}</p>
                </div>
              </div>
            </div>

            <div class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 6h13" />
                    <path d="M8 12h13" />
                    <path d="M8 18h13" />
                    <path d="M3 6h.01" />
                    <path d="M3 12h.01" />
                    <path d="M3 18h.01" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-base font-semibold text-slate-900">{{ t('kf2Title') }}</h3>
                  <p class="mt-1 text-slate-600">{{ t('kf2Desc') }}</p>
                </div>
              </div>
            </div>

            <div class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3v18" />
                    <path d="M7 8l5-5 5 5" />
                    <path d="M7 16l5 5 5-5" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-base font-semibold text-slate-900">Modern fundamentals</h3>
                  <p class="mt-1 text-slate-600">
                    Git, TypeScript, APIs, and patterns that show up in real codebases.
                  </p>
                </div>
              </div>
            </div>

            <div class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                    <path d="M8 7v10" />
                    <path d="M16 7v10" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-base font-semibold text-slate-900">Project-first learning</h3>
                  <p class="mt-1 text-slate-600">
                    Build small apps that look and work like real products.
                  </p>
                </div>
              </div>
            </div>

            <div class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-base font-semibold text-slate-900">Practice that sticks</h3>
                  <p class="mt-1 text-slate-600">
                    Repetition on the important parts—so you actually remember them.
                  </p>
                </div>
              </div>
            </div>

            <div class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 21s7-4 7-10V6l-7-2-7 2v4c0 6 7 10 7 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-base font-semibold text-slate-900">Beginner-safe</h3>
                  <p class="mt-1 text-slate-600">
                    Clear explanations, examples, and guardrails when you get stuck.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Social Proof / Credibility -->
      <section id="proof" class="border-t border-slate-200 px-4 py-16 md:py-20">
        <div class="mx-auto max-w-3xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">
            Credibility you can feel
          </h2>
          <p class="mt-4 text-lg text-slate-600">
            Built by working developers. Designed for learners who want a clean path, not a content dump.
          </p>
          <div class="mt-10 space-y-6 border-t border-slate-200 pt-10">
            <blockquote class="border-l-4 border-slate-300 pl-4 text-slate-700">
              <p class="text-lg">
                "The biggest difference is the order. I stopped jumping around and finally built a small app
                end-to-end."
              </p>
              <footer class="mt-2 text-sm text-slate-600">Amina · Self-taught developer</footer>
            </blockquote>
            <blockquote class="border-l-4 border-slate-300 pl-4 text-slate-700">
              <p class="text-lg">
                "Short lessons + practice steps means I actually write code. I don't just watch someone else do it."
              </p>
              <footer class="mt-2 text-sm text-slate-600">Jon · Career switcher</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <!-- Section 6: Call to Action -->
      <section id="cta" class="border-t border-slate-200 bg-slate-50 px-4 py-16 md:py-24">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">
            Start learning with a plan you can follow
          </h2>
          <p class="mt-4 text-lg text-slate-600">
            Create your account and begin the first track in minutes.
          </p>
          <div class="mt-10">
            <a :href="`${ideUrl}/auth`"
              class="inline-block rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white">
              Register and start
            </a>
          </div>
        </div>
      </section>

      <!-- Section 7: Footer -->
      <footer class="border-t border-slate-200 px-4 py-8">
        <div class="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span class="text-sm text-slate-600">
            KodHau · {{ currentYear }} · All rights reserved · Created by Zhasulan Serikbek
          </span>
          <nav class="flex gap-6 text-sm">
            <a href="#" class="text-slate-600">Terms</a>
            <a href="#" class="text-slate-600">Privacy</a>
          </nav>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const { lang, setLang, t } = useLang()
const mobileMenuOpen = ref(false)

import htmlLogo from '~/assets/images/html.svg'
import cssLogo from '~/assets/images/css.svg'
import pythonLogo from '~/assets/images/python.svg'
import swiftLogo from '~/assets/images/swift.svg'
import postgresqlLogo from '~/assets/images/postgresql.svg'
import aituLogo from '~/assets/images/aitu.png'
import harvardLogo from '~/assets/images/veritas.webp'
import stanfordLogo from '~/assets/images/stanford.png'
import nuLogo from '~/assets/images/NU_horizontal_1.png'
import satpayevLogo from '~/assets/images/Satabayev_University_logo.png'

const { public: { ideUrl } } = useRuntimeConfig()
const currentYear = new Date().getFullYear()

interface TrustedBySchool {
  name: string
  logo?: string
  url: string
}

const schools = [
  { name: 'Harvard', logo: harvardLogo, url: 'https://www.harvard.edu' },
  { name: 'Astana IT University', logo: aituLogo, url: 'https://astanait.edu.kz' },
  { name: 'Stanford', logo: stanfordLogo, url: 'https://www.stanford.edu' },
  { name: 'Nazarbayev University', logo: nuLogo, url: 'https://nu.edu.kz' },
  { name: 'Satbayev University', logo: satpayevLogo, url: 'https://satbayev.university' },
]

const trustedBySchools: TrustedBySchool[] = [...schools, ...schools, ...schools]

useHead({
  title: 'KodHau — Learn to code your dreams and design your future',
  meta: [
    {
      name: 'description',
      content: 'For beginners and self-taught developers. One path, real practice, modern stack.',
    },
  ],
})


function onGetStarted() {
  // Placeholder: e.g. navigate to signup or open modal
}

function onScheduleCall() {
  // Placeholder: e.g. open scheduling modal
}

function handleHeroHotkeys(e: KeyboardEvent) {
  const mod = e.metaKey || e.ctrlKey
  if (!mod) return
  if (e.key === 's') {
    e.preventDefault()
    onGetStarted()
  }
  if (e.key === 'k') {
    e.preventDefault()
    onScheduleCall()
  }
}

interface Logo {
  id: string
  label: string
  src: string
  x: number
  y: number
}

const heroRef = ref<HTMLElement | null>(null)
const draggingId = ref<string | null>(null)
const dragOffset = reactive({ x: 0, y: 0 })

const logos = reactive<Logo[]>([
  { id: 'html', label: 'HTML5', src: htmlLogo, x: 60, y: 120 },
  { id: 'css', label: 'CSS3', src: cssLogo, x: 40, y: 280 },
  { id: 'python', label: 'Python', src: pythonLogo, x: 820, y: 100 },
  { id: 'swift', label: 'Swift', src: swiftLogo, x: 200, y: 400 },
  { id: 'postgresql', label: 'PostgreSQL', src: postgresqlLogo, x: 780, y: 340 },
])

let animationFrameId: number | null = null

function startDrag(e: MouseEvent, id: string) {
  if (!heroRef.value) return
  e.preventDefault()
  draggingId.value = id

  const logo = logos.find((l) => l.id === id)
  if (!logo) return

  const rect = heroRef.value.getBoundingClientRect()
  dragOffset.x = e.clientX - rect.left - logo.x
  dragOffset.y = e.clientY - rect.top - logo.y

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function startDragTouch(e: TouchEvent, id: string) {
  if (!heroRef.value) return
  e.preventDefault()
  draggingId.value = id

  const logo = logos.find((l) => l.id === id)
  if (!logo) return

  const touch = e.touches[0]
  const rect = heroRef.value.getBoundingClientRect()
  dragOffset.x = touch.clientX - rect.left - logo.x
  dragOffset.y = touch.clientY - rect.top - logo.y

  document.addEventListener('touchmove', onDragTouch, { passive: false })
  document.addEventListener('touchend', stopDragTouch)
}

function onDrag(e: MouseEvent) {
  if (!draggingId.value || !heroRef.value) return

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  animationFrameId = requestAnimationFrame(() => {
    if (!draggingId.value || !heroRef.value) return

    const logo = logos.find((l) => l.id === draggingId.value)
    if (!logo) return

    const rect = heroRef.value.getBoundingClientRect()
    const newX = e.clientX - rect.left - dragOffset.x
    const newY = e.clientY - rect.top - dragOffset.y

    logo.x = Math.max(0, Math.min(newX, rect.width - 80))
    logo.y = Math.max(0, Math.min(newY, rect.height - 100))
  })
}

function onDragTouch(e: TouchEvent) {
  if (!draggingId.value || !heroRef.value) return
  e.preventDefault()

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  animationFrameId = requestAnimationFrame(() => {
    if (!draggingId.value || !heroRef.value) return

    const logo = logos.find((l) => l.id === draggingId.value)
    if (!logo) return

    const touch = e.touches[0]
    const rect = heroRef.value.getBoundingClientRect()
    const newX = touch.clientX - rect.left - dragOffset.x
    const newY = touch.clientY - rect.top - dragOffset.y

    logo.x = Math.max(0, Math.min(newX, rect.width - 80))
    logo.y = Math.max(0, Math.min(newY, rect.height - 100))
  })
}

function stopDrag() {
  draggingId.value = null
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function stopDragTouch() {
  draggingId.value = null
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  document.removeEventListener('touchmove', onDragTouch)
  document.removeEventListener('touchend', stopDragTouch)
}

function positionLogosOnMount() {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()

  logos[0].x = rect.width * 0.05
  logos[0].y = rect.height * 0.2

  logos[1].x = rect.width * 0.03
  logos[1].y = rect.height * 0.55

  logos[2].x = rect.width * 0.85
  logos[2].y = rect.height * 0.15

  logos[3].x = rect.width * 0.08
  logos[3].y = rect.height * 0.75

  logos[4].x = rect.width * 0.82
  logos[4].y = rect.height * 0.65
}

onMounted(() => {
  positionLogosOnMount()
  window.addEventListener('resize', positionLogosOnMount)
  window.addEventListener('keydown', handleHeroHotkeys)
})

onUnmounted(() => {
  window.removeEventListener('resize', positionLogosOnMount)
  window.removeEventListener('keydown', handleHeroHotkeys)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

interface ComparisonSide {
  value: string
  subtitle?: string
  label: string
  valueClass?: string
}

interface ComparisonCard {
  category: string
  kodhau: ComparisonSide
  traditional: ComparisonSide
}

const comparisonData: ComparisonCard[] = [
  {
    category: 'Time to Productivity',
    kodhau: { value: '14 дней', label: 'KodHau' },
    traditional: { value: '3-4 месяца', label: 'Традиционные LMS' },
  },
  {
    category: 'Подготовка контента',
    kodhau: {
      value: '0 минут',
      subtitle: 'ИИ берет ваши регламенты',
      label: 'KodHau',
    },
    traditional: {
      value: '200+ часов',
      subtitle: 'Прохождение курсов в LMS',
      label: 'Традиционные LMS',
    },
  },
  {
    category: 'Удержание знаний',
    kodhau: {
      value: '95%',
      subtitle: 'Обучение в моменте ошибки',
      label: 'KodHau',
    },
    traditional: {
      value: '12%',
      subtitle: 'Через неделю всё забыто',
      label: 'Традиционные LMS',
    },
  },
  {
    category: 'Внимание Senior-ментора',
    kodhau: {
      value: '0 часов',
      subtitle: 'ИИ-тень делает всё сама',
      label: 'KodHau',
    },
    traditional: {
      value: '~10 ч/нед',
      subtitle: 'На одного новичка',
      label: 'Традиционные LMS',
    },
  },
  {
    category: 'Стоимость ошибки',
    kodhau: {
      value: '$0',
      subtitle: 'ИИ блокирует ошибку до отправки',
      label: 'KodHau',
      valueClass: 'text-green-600',
    },
    traditional: {
      value: '\u221E',
      subtitle: 'Приходится исправлять ошибку',
      label: 'Традиционные LMS',
      // valueClass: 'text-red-500 text-6xl leading-none',
      valueClass: 'text-red-500 text-6xl',
    },
  },
]

</script>
