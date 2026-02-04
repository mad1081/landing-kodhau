<template>
  <div class="min-h-screen bg-white text-slate-900">
    <header class="sticky top-0 z-10 border-b border-slate-200 bg-white">
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
      <section id="top" class="px-4 py-16 md:py-24 lg:py-28">
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Get job-ready coding skills with a clear plan.
          </h1>
          <p class="mt-6 text-lg text-slate-600 md:text-xl">
            KodHau is for beginners and self-taught developers who want to stop guessing and start shipping real projects.
          </p>
          <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#cta"
              class="inline-block w-full shrink-0 rounded-md bg-blue-600 px-8 py-3 text-center text-base font-medium text-white sm:w-auto"
            >
              Start learning
            </a>
            <a
              href="#solution"
              class="inline-block text-base font-medium text-blue-600"
            >
              See the learning flow
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
                    A single path that builds foundations first, then projects—so you always know what’s next.
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
                    Learn with tools you’ll actually use: Git, TypeScript, APIs, and modern front-end patterns.
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
                    You always know what “done” looks like before you move on.
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
                “The biggest difference is the order. I stopped jumping around and finally built a small app end-to-end.”
              </p>
              <footer class="mt-2 text-sm text-slate-600">Amina · Self-taught developer</footer>
            </blockquote>
            <blockquote class="border-l-4 border-slate-300 pl-4 text-slate-700">
              <p class="text-lg">
                “Short lessons + practice steps means I actually write code. I don’t just watch someone else do it.”
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
const currentYear = new Date().getFullYear()

useHead({
  title: 'Kodhau — Learn to code with structure and practice',
  meta: [
    {
      name: 'description',
      content: 'For beginners and self-taught developers. One path, real practice, modern stack.',
    },
  ],
})
</script>
