import { Link, useParams, useNavigate } from 'react-router-dom'
import { mockCoursePlans } from '../data/mockCoursePlan'
import {
  IconBell, IconHelp, IconFolderOpen, IconSearch,
  IconGitBranch, IconBug, IconPuzzle, IconSettings,
  IconUser, IconBookmark, IconShare,
} from '@tabler/icons-react'

export function LessonTheoryPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()

  // Find the first task of this lesson and open the Monaco IDE
  let practiceHref = '/ide/javascript-101-t1'
  for (const plan of Object.values(mockCoursePlans)) {
    for (const mod of plan.modules) {
      const lesson = mod.lessons.find(l => l.id === lessonId)
      if (lesson && lesson.tasks.length > 0) {
        practiceHref = `/ide/${plan.slug}-${lesson.tasks[0].id}`
        break
      }
    }
  }

  return (
    <div style={{ background: '#0b1326', color: '#dae2fd', fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>

      {/* TopAppBar */}
      <header style={{
        background: '#0b1326',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        borderBottom: '1px solid rgba(70,69,84,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#dae2fd', letterSpacing: '-0.025em' }}>
            Architect IDE
          </span>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <Link
              to="/"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#6366F1',
                borderBottom: '2px solid #6366F1',
                paddingBottom: '4px',
                textDecoration: 'none',
              }}
            >
              Curriculum
            </Link>
            <a
              href="#"
              style={{ fontSize: '0.875rem', fontWeight: 500, color: '#c7c4d7', textDecoration: 'none' }}
            >
              Projects
            </a>
            <a
              href="#"
              style={{ fontSize: '0.875rem', fontWeight: 500, color: '#c7c4d7', textDecoration: 'none' }}
            >
              Settings
            </a>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            style={{ color: '#c7c4d7', padding: '8px', borderRadius: '4px', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2d3449')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <IconBell size={20} />
          </button>
          <button
            style={{ color: '#c7c4d7', padding: '8px', borderRadius: '4px', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2d3449')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <IconHelp size={20} />
          </button>
        </div>
      </header>

      {/* SideNavBar */}
      <aside style={{
        background: '#171f33',
        position: 'fixed',
        top: '64px',
        left: 0,
        bottom: 0,
        width: '64px',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        gap: '32px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%' }}>
          <button style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '12px 0',
            color: '#6366F1',
            borderLeft: '2px solid #44e2cd',
            background: '#2d3449',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}>
            <IconFolderOpen size={20} />
          </button>
          <button
            style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px 0', color: '#c7c4d7', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2d3449'; e.currentTarget.style.color = '#dae2fd' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c7c4d7' }}
          >
            <IconSearch size={20} />
          </button>
          <button
            style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px 0', color: '#c7c4d7', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2d3449'; e.currentTarget.style.color = '#dae2fd' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c7c4d7' }}
          >
            <IconGitBranch size={20} />
          </button>
          <button
            style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px 0', color: '#c7c4d7', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2d3449'; e.currentTarget.style.color = '#dae2fd' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c7c4d7' }}
          >
            <IconBug size={20} />
          </button>
          <button
            style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px 0', color: '#c7c4d7', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2d3449'; e.currentTarget.style.color = '#dae2fd' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c7c4d7' }}
          >
            <IconPuzzle size={20} />
          </button>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%', paddingBottom: '80px' }}>
          <button
            style={{ color: '#c7c4d7', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#dae2fd')}
            onMouseLeave={e => (e.currentTarget.style.color = '#c7c4d7')}
          >
            <IconSettings size={20} />
          </button>
          <button
            style={{ color: '#c7c4d7', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#dae2fd')}
            onMouseLeave={e => (e.currentTarget.style.color = '#c7c4d7')}
          >
            <IconUser size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main style={{ paddingLeft: '64px', paddingTop: '64px', minHeight: '100vh', background: '#0b1326' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '64px 32px' }}>

          {/* Breadcrumbs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <Link
              to="/"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(199,196,215,0.6)',
                textDecoration: 'none',
              }}
            >
              Curriculum
            </Link>
            <span style={{ color: 'rgba(199,196,215,0.3)', fontSize: '12px' }}>/</span>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(199,196,215,0.6)' }}>
              JavaScript Fundamentals
            </span>
            <span style={{ color: 'rgba(199,196,215,0.3)', fontSize: '12px' }}>/</span>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#44e2cd' }}>
              Control Flow
            </span>
          </nav>

          {/* Lesson Header */}
          <header style={{ marginBottom: '48px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#dae2fd', marginBottom: '16px' }}>
              Mastering JavaScript Loops
            </h1>
            <p style={{ color: '#c7c4d7', fontSize: '1.125rem', maxWidth: '42rem', lineHeight: 1.75 }}>
              Loops are the backbone of repetitive logic in programming. They allow you to run the same block of code
              multiple times, saving time and reducing redundancy.
            </p>
          </header>

          {/* Lesson Content */}
          <article style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

            {/* Section: for Loop */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ height: '24px', width: '4px', background: '#44e2cd', borderRadius: '2px' }}></div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#dae2fd', margin: 0 }}>
                  The Classical{' '}
                  <code style={{ color: '#44e2cd' }}>for</code>
                  {' '}Loop
                </h2>
              </div>
              <p style={{ color: '#c7c4d7', marginBottom: '24px', lineHeight: 1.75 }}>
                The{' '}
                <code style={{ fontFamily: "'JetBrains Mono', monospace", color: '#bdc2ff', background: '#222a3d', padding: '2px 6px', borderRadius: '4px' }}>
                  for
                </code>
                {' '}loop is the most common way to iterate when you know how many times you need to repeat an action.
              </p>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: '#060e20',
                borderRadius: '12px',
                border: '1px solid rgba(70,69,84,0.2)',
                padding: '24px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(199,196,215,0.4)',
                  fontWeight: 700,
                }}>
                  JavaScript
                </div>
                <pre style={{ fontSize: '0.875rem', lineHeight: 1.75, margin: 0 }}>
                  <span style={{ color: '#ffb783' }}>for</span>
                  {' ('}
                  <span style={{ color: '#bdc2ff' }}>let</span>
                  {' i = '}
                  <span style={{ color: '#3cddc7' }}>0</span>
                  {'; i < '}
                  <span style={{ color: '#3cddc7' }}>5</span>
                  {'; i++) {\n  console.'}
                  <span style={{ color: '#7c87f3' }}>log</span>
                  {'(`Iteration number: '}
                  <span style={{ color: '#dae2fd' }}>{'${i}'}</span>
                  {'`);\n}'}
                </pre>
              </div>
            </section>

            {/* Section: while Loop */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ height: '24px', width: '4px', background: '#bdc2ff', borderRadius: '2px' }}></div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#dae2fd', margin: 0 }}>
                  The Flexible{' '}
                  <code style={{ color: '#bdc2ff' }}>while</code>
                  {' '}Loop
                </h2>
              </div>
              <p style={{ color: '#c7c4d7', marginBottom: '24px', lineHeight: 1.75 }}>
                A{' '}
                <code style={{ fontFamily: "'JetBrains Mono', monospace", color: '#bdc2ff', background: '#222a3d', padding: '2px 6px', borderRadius: '4px' }}>
                  while
                </code>
                {' '}loop continues to execute as long as a specified condition evaluates to{' '}
                <code style={{ color: '#44e2cd' }}>true</code>
                . Use this when the number of iterations is not known in advance.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: '#060e20',
                  borderRadius: '12px',
                  border: '1px solid rgba(70,69,84,0.2)',
                  padding: '24px',
                }}>
                  <pre style={{ fontSize: '0.875rem', lineHeight: 1.75, margin: 0 }}>
                    <span style={{ color: '#bdc2ff' }}>let</span>
                    {' count = '}
                    <span style={{ color: '#3cddc7' }}>0</span>
                    {';\n\n'}
                    <span style={{ color: '#ffb783' }}>while</span>
                    {' (count < '}
                    <span style={{ color: '#3cddc7' }}>3</span>
                    {') {\n  '}
                    <span style={{ color: '#c7c4d7' }}>{'// Code here'}</span>
                    {'\n  count++;\n}'}
                  </pre>
                </div>
                <div style={{
                  background: '#131b2e',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(70,69,84,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#dae2fd', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 0 }}>
                    Pro Tip
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#c7c4d7', lineHeight: 1.75, margin: 0 }}>
                    Always ensure your condition will eventually become false, otherwise you'll create an infinite loop
                    and crash your browser!
                  </p>
                </div>
              </div>
            </section>

            {/* Section: do...while */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ height: '24px', width: '4px', background: '#ffb783', borderRadius: '2px' }}></div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#dae2fd', margin: 0 }}>
                  Guaranteed Execution:{' '}
                  <code style={{ color: '#ffb783' }}>do...while</code>
                </h2>
              </div>
              <p style={{ color: '#c7c4d7', marginBottom: '24px', lineHeight: 1.75 }}>
                Unlike the while loop, a{' '}
                <code style={{ fontFamily: "'JetBrains Mono', monospace", color: '#bdc2ff', background: '#222a3d', padding: '2px 6px', borderRadius: '4px' }}>
                  do...while
                </code>
                {' '}loop will always execute its block at least once before checking the condition.
              </p>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: '#060e20',
                borderRadius: '12px',
                border: '1px solid rgba(70,69,84,0.2)',
                padding: '24px',
              }}>
                <pre style={{ fontSize: '0.875rem', lineHeight: 1.75, margin: 0 }}>
                  <span style={{ color: '#ffb783' }}>let</span>
                  {' active = '}
                  <span style={{ color: '#3cddc7' }}>false</span>
                  {';\n\n'}
                  <span style={{ color: '#ffb783' }}>do</span>
                  {' {\n  console.'}
                  <span style={{ color: '#7c87f3' }}>log</span>
                  {'('}
                  <span style={{ color: '#44e2cd' }}>"This runs once even if false"</span>
                  {');\n} '}
                  <span style={{ color: '#ffb783' }}>while</span>
                  {' (active);'}
                </pre>
              </div>
            </section>

          </article>

          {/* Footer Action */}
          <footer style={{
            marginTop: '96px',
            paddingTop: '64px',
            borderTop: '1px solid rgba(70,69,84,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ color: 'rgba(199,196,215,0.6)', fontSize: '0.875rem', marginBottom: '8px', marginTop: 0 }}>
                Lesson 4 of 12 complete
              </p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dae2fd', margin: 0 }}>
                Ready to test your knowledge?
              </h3>
            </div>
            <button
              style={{
                position: 'relative',
                padding: '16px 48px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #bdc2ff, #7c87f3)',
                color: '#000767',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
              onClick={() => navigate(practiceHref)}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              [ Go to Practice ] →
            </button>
            <div style={{
              marginTop: '48px',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              color: 'rgba(199,196,215,0.4)',
            }}>
              <button
                style={{ display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#dae2fd')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(199,196,215,0.4)')}
              >
                <IconBookmark size={14} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Save for later
                </span>
              </button>
              <button
                style={{ display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#dae2fd')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(199,196,215,0.4)')}
              >
                <IconShare size={14} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Share lesson
                </span>
              </button>
            </div>
          </footer>

        </div>
      </main>

    </div>
  )
}
