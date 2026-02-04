<template>
  <div class="min-h-screen bg-white text-slate-900">
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <a href="#top" class="flex items-center gap-3">
          <span
            aria-hidden="true"
            class="h-9 w-9 rounded-lg border border-slate-200 bg-slate-50"
          />
          <span class="text-base font-semibold tracking-tight text-slate-900">KodHau</span>
        </a>

        <nav class="hidden flex-1 justify-center sm:flex">
          <ul class="flex items-center gap-8 text-sm font-medium text-slate-700">
            <li><a href="#problem" class="text-slate-700">Problem</a></li>
            <li><a href="#solution" class="text-slate-700">Solution</a></li>
            <li><a href="#features" class="text-slate-700">Features</a></li>
            <li><a href="#proof" class="text-slate-700">Proof</a></li>
          </ul>
        </nav>

        <div class="ml-auto flex items-center gap-3">
          <a
            href="#cta"
            class="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900"
          >
            Login
          </a>
          <a
            href="#cta"
            class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            Register
          </a>
        </div>
      </div>
    </header>
    <main>
      <!-- Section 1: Hero -->
      <section
        id="top"
        ref="heroRef"
        class="relative overflow-hidden px-4 py-20 md:py-28 lg:py-36"
      >
        <!-- Checkered background with corner fade -->
        <div
          class="pointer-events-none absolute inset-0"
          :style="{
            backgroundImage: `
              linear-gradient(to right, rgba(226,232,240,0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(226,232,240,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          }"
        />

        <!-- Draggable tech logos -->
        <div
          v-for="logo in logos"
          :key="logo.id"
          class="absolute z-10 flex cursor-grab select-none flex-col items-center gap-2 active:cursor-grabbing"
          :class="[
            draggingId === logo.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'
          ]"
          :style="{
            left: `${logo.x}px`,
            top: `${logo.y}px`,
          }"
          @mousedown="(e) => startDrag(e, logo.id)"
          @touchstart="(e) => startDragTouch(e, logo.id)"
        >
          <div v-html="logo.svg" class="h-16 w-16 md:h-20 md:w-20" />
          <span class="text-xs font-medium text-slate-600">{{ logo.label }}</span>
        </div>

        <!-- Hero content -->
        <div class="relative z-10 mx-auto max-w-4xl text-center">
          <h1 class="font-serif text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Learn to
            <span class="inline-block rounded bg-amber-400 px-2 py-1 text-slate-900">code</span>
            your<br class="hidden sm:inline" />
            dreams and
            <span class="inline-block rounded bg-blue-400 px-2 py-1 text-slate-900">design</span>
            your<br class="hidden sm:inline" />
            future
          </h1>
          <p class="mx-auto mt-8 max-w-xl text-base text-slate-500 md:text-lg">
            Lorem ipsum dolor sit amet consectetur. Vestibulum est dui maecenas integer.
            Dolor eu dignissim condimentum risus. Quis amet vitae amet lobortis at.
          </p>
          <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#cta"
              class="inline-block rounded-md bg-amber-500 px-8 py-3 text-center text-base font-medium text-white"
            >
              Explore Course
            </a>
            <a
              href="#solution"
              class="inline-block rounded-md border border-slate-300 bg-white px-8 py-3 text-center text-base font-medium text-slate-900"
            >
              Join Free Course
            </a>
          </div>
        </div>
      </section>

      <!-- Section 2: Problem -->
      <section id="problem" class="border-t border-slate-200 bg-slate-50 px-4 py-16 md:py-20">
        <div class="mx-auto max-w-3xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">
            Most people learn in the wrong order
          </h2>
          <ul class="mt-8 space-y-6 text-lg text-slate-700">
            <li>
              You bounce between videos and docs, but nothing connects into a plan.
            </li>
            <li>
              You can follow a tutorial, but you freeze when you have to build alone.
            </li>
            <li>
              You spend weeks on topics that don't move you closer to a real project.
            </li>
          </ul>
        </div>
      </section>

      <!-- Section 3: Solution / Product -->
      <section id="solution" class="border-t border-slate-200 px-4 py-16 md:py-20">
        <div class="mx-auto max-w-4xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">
            Learn by building, with guardrails
          </h2>
          <p class="mt-4 text-lg text-slate-600">
            KodHau guides you through the essentials in the right sequence, then makes you practice until it clicks.
          </p>
          <ul class="mt-10 grid gap-6 sm:grid-cols-2">
            <li class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h10" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">Structured curriculum</h3>
                  <p class="mt-2 text-slate-600">
                    A single path that builds foundations first, then projects—so you always know what's next.
                  </p>
                </div>
              </div>
            </li>
            <li class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 18l6-6-6-6" />
                    <path d="M8 6l-6 6 6 6" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">Real coding practice</h3>
                  <p class="mt-2 text-slate-600">
                    Short exercises and project steps that force you to write code, not just consume content.
                  </p>
                </div>
              </div>
            </li>
            <li class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 7l-8 4-8-4" />
                    <path d="M4 7v10l8 4 8-4V7" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">Modern stack</h3>
                  <p class="mt-2 text-slate-600">
                    Learn with tools you'll actually use: Git, TypeScript, APIs, and modern front-end patterns.
                  </p>
                </div>
              </div>
            </li>
            <li class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20s7-4 7-10V6l-7-2-7 2v4c0 6 7 10 7 10z" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">Clarity and focus</h3>
                  <p class="mt-2 text-slate-600">
                    Tight lessons, clear checklists, and practical outcomes—so you keep moving.
                  </p>
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
            Key features
          </h2>
          <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-base font-semibold text-slate-900">Milestone-driven path</h3>
                  <p class="mt-1 text-slate-600">
                    You always know what "done" looks like before you move on.
                  </p>
                </div>
              </div>
            </div>

            <div class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 6h13" />
                    <path d="M8 12h13" />
                    <path d="M8 18h13" />
                    <path d="M3 6h.01" />
                    <path d="M3 12h.01" />
                    <path d="M3 18h.01" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-base font-semibold text-slate-900">Short lessons, clear steps</h3>
                  <p class="mt-1 text-slate-600">
                    Read a concept, then immediately apply it with a concrete task.
                  </p>
                </div>
              </div>
            </div>

            <div class="rounded-md border border-slate-200 bg-white p-6">
              <div class="flex items-start gap-4">
                <span class="rounded-md border border-slate-200 bg-slate-50 p-2 text-blue-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                "The biggest difference is the order. I stopped jumping around and finally built a small app end-to-end."
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
            <a
              href="#"
              class="inline-block rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white"
            >
              Register and start
            </a>
          </div>
        </div>
      </section>

      <!-- Section 7: Footer -->
      <footer class="border-t border-slate-200 px-4 py-8">
        <div class="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span class="text-sm text-slate-600">
            KodHau · {{ currentYear }}
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

const currentYear = new Date().getFullYear()

useHead({
  title: 'KodHau — Learn to code your dreams and design your future',
  meta: [
    {
      name: 'description',
      content: 'For beginners and self-taught developers. One path, real practice, modern stack.',
    },
  ],
})

interface Logo {
  id: string
  label: string
  svg: string
  x: number
  y: number
}

const heroRef = ref<HTMLElement | null>(null)
const draggingId = ref<string | null>(null)
const dragOffset = reactive({ x: 0, y: 0 })

const logos = reactive<Logo[]>([
  {
    id: 'html',
    label: 'HTML5',
    x: 60,
    y: 120,
    svg: `<svg viewBox="0 0 128 128" class="w-full h-full"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>`,
  },
  {
    id: 'css',
    label: 'CSS3',
    x: 40,
    y: 280,
    svg: `<svg viewBox="0 0 128 128" class="w-full h-full"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114H64.001z"/><path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018z"/><path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881z"/><path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.633-7.012-.331-3.711zm-.047 27.994v13.831H48.792l-.277-3.108-.631-7.012-.332-3.711z"/></svg>`,
  },
  {
    id: 'python',
    label: 'Python',
    x: 820,
    y: 100,
    svg: `<svg viewBox="0 0 128 128" class="w-full h-full"><linearGradient id="python-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"/><stop offset="1" stop-color="#306998"/></linearGradient><path fill="url(#python-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/><linearGradient id="python-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"/><stop offset="1" stop-color="#FFE873"/></linearGradient><path fill="url(#python-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/></svg>`,
  },
  {
    id: 'swift',
    label: 'Swift',
    x: 100,
    y: 400,
    svg: `<svg viewBox="0 0 128 128" class="w-full h-full"><linearGradient id="swift-a" gradientUnits="userSpaceOnUse" x1="109.851" y1="18.51" x2="22.314" y2="112.202"><stop offset="0" stop-color="#FA7850"/><stop offset="1" stop-color="#F2601D"/></linearGradient><path fill="url(#swift-a)" d="M126.31 88.169c-.083-.145-8.291-15.054-8.291-15.054 3.317-18.627-3.801-40.399-22.121-57.32 0 0 2.418 8.939 1.252 16.889-7.727-9.709-34.957-34.723-64.447-45.476 3.107 3.968 35.263 37.699 42.251 45.415-8.236-3.817-35.631-17.039-56.535-20.139 2.206 2.997 33.545 29.119 48.074 41.538-20.403-1.123-38.227-5.035-38.324-5.059-.097-.024-1.38-.301-1.38-.301s23.13 19.377 53.946 25.063c-14.242 11.478-45.086 29.534-74.448 25.74 33.752 21.047 77.162 18.466 103.892-8.106 1.335-1.337 2.619-2.736 3.849-4.189 12.451-2.39 19.879 2.606 19.879 2.606s-2.918-5.856-7.597-1.607z"/></svg>`,
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    x: 780,
    y: 340,
    svg: `<svg viewBox="0 0 128 128" class="w-full h-full"><path d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409-13.924 2.873-14.881-1.842-14.881-1.842 14.703-21.815 20.849-49.508 15.545-56.287-14.47-18.489-39.517-9.746-39.936-9.52l-.134.025c-2.751-.571-5.83-.912-9.289-.968-6.301-.104-11.082 1.652-14.709 4.402 0 0-44.683-18.409-42.604 23.151.442 8.841 12.672 66.898 27.26 49.362 5.332-6.412 10.484-11.834 10.484-11.834 2.558 1.699 5.622 2.567 8.834 2.255l.249-.212c-.078.796-.044 1.575.099 2.497-3.757 4.199-2.653 4.936-10.166 6.482-7.602 1.566-3.136 4.355-.221 5.084 3.535.884 11.712 2.136 17.238-5.598l-.22.882c1.474 1.18 1.375 8.477 1.583 13.69.209 5.214.558 10.079 1.621 12.948 1.063 2.868 2.317 10.256 12.191 8.14 8.252-1.764 14.561-4.309 15.136-27.985" fill="#336791"/><path d="M66.509 81.014c-.37-3.512-.057-6.511-.057-6.511s-1.871.263-2.947.307a17.921 17.921 0 0 1-2.722-.104c-.058.033-.45 2.865-.115 6.406.376 3.973 2.292 6.59 4.388 5.989 2.097-.6 1.822-2.115 1.453-6.087" fill="#fff"/><path d="M62.042 72.808c-.901.247-1.899.74-2.469 1.46-.199.251-.378.533-.527.827-.118.229-.216.466-.298.708-.199.592-.327 1.214-.381 1.859a8.32 8.32 0 0 0 .108 2.019c.072.452.171.895.297 1.324.242.814.556 1.59.926 2.325.075.15.15.298.228.445.212.4.441.79.685 1.171.195.304.4.601.616.89.217.291.443.574.678.85.47.552.977 1.072 1.521 1.561.27.243.548.481.833.714.569.467 1.169.903 1.8 1.306.301.192.611.377.926.556.336.191.678.374 1.025.551.7.356 1.424.677 2.17.965.373.143.752.281 1.135.412.384.132.773.258 1.168.378.793.241 1.601.462 2.423.664.821.202 1.656.385 2.504.548.848.164 1.708.308 2.58.432.874.124 1.758.228 2.651.311.893.083 1.795.147 2.705.189.91.042 1.828.063 2.753.063s1.843-.021 2.753-.063c.91-.042 1.812-.106 2.705-.189.893-.083 1.777-.187 2.651-.311.872-.124 1.732-.268 2.58-.432.848-.163 1.683-.346 2.504-.548.822-.202 1.63-.423 2.423-.664.395-.12.784-.246 1.168-.378.383-.131.762-.269 1.135-.412.746-.288 1.47-.609 2.17-.965.347-.177.689-.36 1.025-.551.315-.179.625-.364.926-.556.631-.403 1.231-.839 1.8-1.306.285-.233.563-.471.833-.714.544-.489 1.051-1.009 1.521-1.561.235-.276.461-.559.678-.85.216-.289.421-.586.616-.89.244-.381.473-.771.685-1.171.078-.147.153-.295.228-.445.37-.735.684-1.511.926-2.325.126-.429.225-.872.297-1.324a8.32 8.32 0 0 0 .108-2.019c-.054-.645-.182-1.267-.381-1.859a5.387 5.387 0 0 0-.298-.708 4.384 4.384 0 0 0-.527-.827c-.57-.72-1.568-1.213-2.469-1.46-.305-.084-.602-.131-.886-.145l.003-.005c-.193-.032-.383-.045-.567-.045-.184 0-.374.013-.567.045l.003.005c-.284.014-.581.061-.886.145-.481.132-.959.331-1.412.591-.453.26-.881.581-1.271.954-.39.373-.742.798-1.04 1.262-.299.464-.543.966-.718 1.493-.175.528-.281 1.081-.308 1.645-.013.282-.008.566.015.85.023.284.062.568.118.85a8.95 8.95 0 0 0 .435 1.681c.099.276.209.549.329.816.24.535.52 1.049.835 1.538l.026.041c-.012.07-.022.139-.034.209-.161 1.039-.315 2.332-.456 3.818-.141 1.486-.27 3.166-.382 5.005-.112 1.839-.207 3.837-.279 5.956-.072 2.119-.121 4.358-.143 6.682-.022 2.323-.016 4.731.019 7.188.036 2.457.1 4.963.197 7.484" fill="#336791"/><path d="M85.601 40.857c-2.404-.168-4.291.224-5.652 1.075-.629-.089-1.32-.147-2.082-.166-2.128-.052-4.629.266-6.898 1.024-1.797.601-3.465 1.445-4.886 2.538-1.048.806-1.946 1.749-2.666 2.83-.601-1.118-1.431-2.088-2.474-2.907-1.424-1.117-3.088-1.944-4.87-2.499-2.275-.708-4.768-.971-6.896-.865-.763.038-1.452.11-2.07.214-1.365-.804-3.245-1.152-5.64-.94-3.756.333-7.478 2.142-9.844 5.142l-.089.127c-2.044 2.926-3.278 7.085-3.538 11.873-.138 2.555.067 5.142.574 7.63l.023.108c.212 1.062.502 2.126.866 3.18.367 1.058.81 2.108 1.325 3.141.258.518.533 1.031.823 1.538.29.507.595 1.008.915 1.501.955 1.474 2.035 2.871 3.246 4.159.607.645 1.243 1.265 1.911 1.856.668.591 1.368 1.154 2.102 1.684.367.265.744.521 1.129.768.385.247.779.484 1.182.712.201.114.405.225.61.334.204.109.411.215.619.319.416.207.838.405 1.268.594.429.189.865.369 1.309.539.443.17.893.331 1.349.482.456.151.918.292 1.387.423.469.131.943.252 1.423.363.48.111.965.212 1.455.303.98.182 1.975.324 2.987.424 1.011.1 2.039.157 3.083.169 1.044.012 2.104-.021 3.18-.101 1.076-.08 2.168-.205 3.276-.375.554-.085 1.112-.181 1.675-.288.563-.107 1.13-.225 1.702-.354.572-.129 1.148-.27 1.728-.422.58-.152 1.164-.315 1.752-.49.588-.175 1.179-.361 1.774-.558.595-.197 1.193-.406 1.795-.625.601-.22 1.206-.45 1.814-.692.607-.241 1.218-.493 1.831-.756" fill="#336791"/><path d="M120.789 87.399c-3.296-8.358-9.6-11.49-9.668-11.517l-.237-.111-.21.154c-.033.024-2.937 2.167-8.096 1.567l-.152-.017-.13.085c-.051.034-.108.07-.17.111-.06.04-.126.084-.199.133-.146.098-.312.214-.501.35-.378.271-.828.612-1.357 1.024-1.058.826-2.425 1.936-4.052 3.327-1.627 1.391-3.515 3.063-5.623 4.983l-.07.064-.051.081c-.034.054-.073.12-.119.2-.046.08-.097.172-.154.278-.113.212-.245.468-.393.771-.296.606-.648 1.374-1.04 2.305-.784 1.862-1.719 4.307-2.721 7.348-1.002 3.041-2.072 6.677-3.126 10.886-1.053 4.209-2.09 8.991-3.024 14.301-.023.063-.049.146-.076.245-.027.099-.056.215-.086.348-.06.265-.122.595-.183.987-.062.392-.122.845-.181 1.356-.118 1.022-.226 2.291-.318 3.809-.092 1.518-.168 3.285-.225 5.299-.057 2.014-.095 4.275-.115 6.781-.02 2.506-.02 5.258-.001 8.254.019 2.996.057 6.237.115 9.72l.003.134.085.103c.058.07.118.14.178.21.06.07.121.14.183.209.062.069.125.137.188.205.063.068.127.135.192.2.065.066.131.13.197.193.066.063.133.125.2.186.067.061.135.121.203.179.068.058.136.114.206.169.139.109.28.213.424.311.144.098.29.19.44.276.15.086.302.166.457.24.155.074.313.142.473.204.16.062.323.118.488.168.165.05.333.094.503.132.17.038.343.07.518.095.175.025.352.044.532.057.18.013.362.019.547.019.185 0 .367-.006.547-.019.18-.013.357-.032.532-.057.175-.025.348-.057.518-.095.17-.038.338-.082.503-.132.165-.05.328-.106.488-.168.16-.062.318-.13.473-.204.155-.074.307-.154.457-.24.15-.086.296-.178.44-.276.144-.098.285-.202.424-.311.07-.055.138-.111.206-.169.068-.058.136-.118.203-.179.067-.061.134-.123.2-.186.066-.063.132-.127.197-.193.065-.065.129-.132.192-.2.063-.068.126-.136.188-.205.062-.069.123-.139.183-.209.06-.07.12-.14.178-.21l.085-.103.003-.134c.058-3.483.096-6.724.115-9.72.019-2.996.019-5.748-.001-8.254-.02-2.506-.058-4.767-.115-6.781-.057-2.014-.133-3.781-.225-5.299-.092-1.518-.2-2.787-.318-3.809-.059-.511-.119-.964-.181-1.356-.061-.392-.123-.722-.183-.987-.03-.133-.059-.249-.086-.348-.027-.099-.053-.182-.076-.245-.934-5.31-1.971-10.092-3.024-14.301-1.054-4.209-2.124-7.845-3.126-10.886-1.002-3.041-1.937-5.486-2.721-7.348-.392-.931-.744-1.699-1.04-2.305-.148-.303-.28-.559-.393-.771-.057-.106-.108-.198-.154-.278-.046-.08-.085-.146-.119-.2l-.051-.081-.07-.064c-2.108-1.92-3.996-3.592-5.623-4.983-1.627-1.391-2.994-2.501-4.052-3.327-.529-.412-.979-.753-1.357-1.024-.189-.136-.355-.252-.501-.35-.073-.049-.139-.093-.199-.133-.062-.041-.119-.077-.17-.111l-.13-.085-.152.017c-5.159.6-8.063-1.543-8.096-1.567l-.21-.154-.237.111c-.068.027-6.372 3.159-9.668 11.517-.161.407-.245.89-.256 1.473-.011.583.05 1.266.184 2.051.134.785.341 1.672.623 2.657.282.985.638 2.07 1.07 3.248.432 1.178.94 2.449 1.525 3.805.585 1.356 1.247 2.796 1.987 4.315.74 1.519 1.558 3.117 2.453 4.786.895 1.669 1.867 3.409 2.917 5.213l.069.118c.094.16.19.32.289.48.099.16.2.32.304.48.104.16.211.319.32.478l.017.026c-2.041 4.094-3.137 8.563-3.196 13.089-.059 4.526.855 9.106 2.706 13.411l.064.149.143.073c.029.015.062.031.098.049.036.018.075.037.118.058.086.042.186.09.3.145.228.11.508.243.84.402.664.318 1.532.725 2.605 1.224l.01.004c.023.011.048.022.076.035.028.013.059.026.094.041.069.03.152.064.248.103.192.078.429.17.712.277.566.214 1.302.479 2.21.797 1.816.636 4.263 1.45 7.339 2.441 3.076.991 6.78 2.16 11.113 3.505 4.333 1.345 9.294 2.867 14.883 4.564l.181.055.171-.086c.034-.017.069-.035.104-.053.035-.018.071-.036.107-.055.072-.037.145-.076.219-.115.148-.078.299-.16.451-.244.304-.168.613-.346.927-.534.628-.376 1.273-.792 1.934-1.248.661-.456 1.339-.952 2.033-1.488.694-.536 1.403-1.112 2.128-1.727.725-.615 1.464-1.269 2.218-1.962.754-.693 1.522-1.425 2.303-2.195.781-.77 1.575-1.579 2.382-2.425.807-.846 1.627-1.73 2.458-2.651.831-.921 1.674-1.879 2.528-2.872.854-.993 1.719-2.022 2.594-3.085.875-1.063 1.761-2.161 2.655-3.292.894-1.131 1.798-2.296 2.711-3.493.913-1.197 1.834-2.426 2.763-3.687.929-1.261 1.866-2.553 2.81-3.876.944-1.323 1.895-2.677 2.851-4.06.956-1.383 1.919-2.796 2.887-4.238.968-1.442 1.941-2.912 2.919-4.41.978-1.498 1.962-3.024 2.949-4.576.987-1.552 1.979-3.131 2.975-4.735l.068-.11c.03-.048.062-.099.094-.152.032-.053.064-.108.098-.166.068-.115.138-.24.211-.374.146-.269.3-.574.461-.915.161-.341.329-.718.502-1.132.087-.207.175-.422.264-.645.089-.223.178-.454.269-.692.091-.238.182-.484.274-.737.092-.253.185-.513.278-.781.186-.536.375-1.103.566-1.702.191-.599.385-1.23.58-1.894.195-.664.392-1.36.59-2.09.198-.73.397-1.492.597-2.289.2-.797.4-1.628.601-2.493.201-.865.402-1.764.603-2.698.201-.934.401-1.902.601-2.905.2-1.003.398-2.04.595-3.112.197-1.072.393-2.178.586-3.319.193-1.141.384-2.316.572-3.526.188-1.21.372-2.453.553-3.731.181-1.278.358-2.59.531-3.937.173-1.347.342-2.728.505-4.143.163-1.415.321-2.863.473-4.345.152-1.482.298-2.998.437-4.547.139-1.549.271-3.131.395-4.747.124-1.616.241-3.264.349-4.945.108-1.681.207-3.394.298-5.14.091-1.746.172-3.524.244-5.334.072-1.81.134-3.652.186-5.525.052-1.873.094-3.778.126-5.714.032-1.936.052-3.903.062-5.901.01-1.998.008-4.027-.006-6.087-.014-2.06-.04-4.15-.078-6.271-.038-2.121-.088-4.272-.15-6.453-.062-2.181-.136-4.392-.223-6.633-.087-2.241-.186-4.511-.298-6.811-.112-2.3-.237-4.629-.375-6.987-.138-2.358-.289-4.745-.453-7.16-.164-2.415-.342-4.858-.532-7.329-.19-2.471-.394-4.969-.61-7.494-.216-2.525-.446-5.077-.689-7.656-.243-2.579-.5-5.184-.77-7.815-.27-2.631-.554-5.287-.851-7.969-.297-2.682-.608-5.389-.932-8.12-.324-2.731-.662-5.487-1.013-8.267-.351-2.78-.716-5.584-1.094-8.411-.378-2.827-.77-5.677-1.175-8.55-.405-2.873-.824-5.769-1.256-8.686-.432-2.917-.877-5.856-1.336-8.817-.459-2.961-.932-5.942-1.417-8.944-.485-3.002-.984-6.024-1.497-9.066-.513-3.042-1.039-6.103-1.578-9.183-.539-3.08-1.092-6.179-1.657-9.296-.565-3.117-1.144-6.252-1.735-9.405-.591-3.153-1.195-6.323-1.812-9.51-.617-3.187-1.247-6.39-1.889-9.61-.642-3.22-1.298-6.455-1.966-9.706-.668-3.251-1.349-6.517-2.043-9.798-.694-3.281-1.401-6.577-2.12-9.888-.719-3.311-1.452-6.636-2.196-9.975-.744-3.339-1.502-6.692-2.272-10.058-.77-3.366-1.553-6.745-2.349-10.137-.796-3.392-1.604-6.796-2.424-10.213-.82-3.417-1.653-6.846-2.498-10.286-.845-3.44-1.702-6.892-2.571-10.355-.869-3.463-1.751-6.937-2.644-10.421-.893-3.484-1.799-6.979-2.716-10.483-.917-3.504-1.846-7.018-2.787-10.541-.941-3.523-1.893-7.055-2.857-10.596-.964-3.541-1.94-7.09-2.927-10.648-.987-3.558-1.985-7.124-2.995-10.697-1.01-3.573-2.031-7.154-3.063-10.742-1.032-3.588-2.076-7.182-3.131-10.783-1.055-3.601-2.12-7.208-3.197-10.822-1.077-3.614-2.165-7.234-3.264-10.859-1.099-3.625-2.209-7.255-3.33-10.891-1.121-3.636-2.253-7.277-3.395-10.923-1.142-3.646-2.295-7.296-3.459-10.951-1.164-3.655-2.338-7.314-3.522-10.977-1.184-3.663-2.379-7.33-3.584-11.001-1.205-3.671-2.42-7.345-3.645-11.023-1.225-3.678-2.46-7.358-3.704-11.042-1.244-3.684-2.499-7.37-3.762-11.059-1.263-3.689-2.536-7.38-3.818-11.074-1.282-3.694-2.574-7.39-3.875-11.088-1.301-3.698-2.611-7.397-3.93-11.098-1.319-3.701-2.646-7.403-3.982-11.107-1.336-3.704-2.68-7.409-4.033-11.115-1.353-3.706-2.714-7.412-4.083-11.119" fill="none"/><path d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409-13.924 2.873-14.881-1.842-14.881-1.842 14.703-21.815 20.849-49.508 15.545-56.287-14.47-18.489-39.517-9.746-39.936-9.52l-.134.025c-2.751-.571-5.83-.912-9.289-.968-6.301-.104-11.082 1.652-14.709 4.402 0 0-44.683-18.409-42.604 23.151.442 8.841 12.672 66.898 27.26 49.362 5.332-6.412 10.484-11.834 10.484-11.834 2.558 1.699 5.622 2.567 8.834 2.255l.249-.212c-.078.796-.044 1.575.099 2.497-3.757 4.199-2.653 4.936-10.166 6.482-7.602 1.566-3.136 4.355-.221 5.084 3.535.884 11.712 2.136 17.238-5.598l-.22.882c1.474 1.18 2.507 7.672 2.334 13.557-.174 5.885-.29 9.926.871 13.082 1.16 3.156 2.316 10.256 12.192 8.14 8.252-1.768 12.528-6.351 13.124-13.995.422-5.435 1.377-4.631 1.438-9.49l.767-2.3c.884-7.367.14-9.743 5.225-8.638l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409-13.924 2.873-14.881-1.842-14.881-1.842 14.703-21.815 20.849-49.508 15.545-56.287-14.47-18.489-39.517-9.746-39.936-9.52" fill="none" stroke="#fff" stroke-width="4.155" stroke-linecap="round" stroke-linejoin="round"/><path d="M61.809 68.93c-.39-6.004-.318-12.059 1.087-14.457 2.376-4.06 8.217-3.729 10.477-1.205 2.259 2.524 3.313 6.195 3.313 11.083 0 5.378-.546 9.135-1.475 13.309" fill="none" stroke="#fff" stroke-width="2.077" stroke-linecap="round" stroke-linejoin="round"/><path d="M53.604 101.48c-.287-4.616-.425-9.263.082-11.166 1.349-5.059 5.287-8.631 10.089-8.855 4.803-.225 7.99 3.11 9.007 7.83.607 2.816.504 5.777.306 8.825" fill="none" stroke="#fff" stroke-width="2.077"/></svg>`,
  },
])

function startDrag(e: MouseEvent, id: string) {
  if (!heroRef.value) return
  e.preventDefault()
  draggingId.value = id

  const logo = logos.find((l) => l.id === id)
  if (!logo) return

  dragOffset.x = e.clientX - logo.x
  dragOffset.y = e.clientY - logo.y

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
  dragOffset.x = touch.clientX - logo.x
  dragOffset.y = touch.clientY - logo.y

  document.addEventListener('touchmove', onDragTouch, { passive: false })
  document.addEventListener('touchend', stopDragTouch)
}

function onDrag(e: MouseEvent) {
  if (!draggingId.value || !heroRef.value) return

  const logo = logos.find((l) => l.id === draggingId.value)
  if (!logo) return

  const rect = heroRef.value.getBoundingClientRect()
  const newX = e.clientX - dragOffset.x
  const newY = e.clientY - dragOffset.y

  logo.x = Math.max(0, Math.min(newX, rect.width - 80))
  logo.y = Math.max(0, Math.min(newY, rect.height - 80))
}

function onDragTouch(e: TouchEvent) {
  if (!draggingId.value || !heroRef.value) return
  e.preventDefault()

  const logo = logos.find((l) => l.id === draggingId.value)
  if (!logo) return

  const touch = e.touches[0]
  const rect = heroRef.value.getBoundingClientRect()
  const newX = touch.clientX - dragOffset.x
  const newY = touch.clientY - dragOffset.y

  logo.x = Math.max(0, Math.min(newX, rect.width - 80))
  logo.y = Math.max(0, Math.min(newY, rect.height - 80))
}

function stopDrag() {
  draggingId.value = null
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function stopDragTouch() {
  draggingId.value = null
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
})

onUnmounted(() => {
  window.removeEventListener('resize', positionLogosOnMount)
})
</script>
