import { useParams, useNavigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useLesson } from '../hooks/useLesson'

export function LessonTheoryPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { lesson, loading, error } = useLesson(lessonId)

  const firstTaskId = lesson?.tasks[0]?.id

  return (
    <div style={{ background: '#0b1326', color: '#dae2fd', fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>

      {/* TopBar */}
      <header style={{
        background: '#0b1326',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: '56px', display: 'flex', alignItems: 'center',
        padding: '0 24px', borderBottom: '1px solid rgba(70,69,84,0.3)',
        gap: '16px',
      }}>
        <Link to="/" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6366F1', textDecoration: 'none' }}>
          ← Dashboard
        </Link>
        {lesson && (
          <span style={{ fontSize: '0.875rem', color: 'rgba(199,196,215,0.5)' }}>
            {(lesson.module as any)?.course?.title} / {(lesson.module as any)?.title} / {lesson.title}
          </span>
        )}
      </header>

      <main style={{ paddingTop: '56px', maxWidth: '52rem', margin: '0 auto', padding: '80px 32px' }}>

        {loading && (
          <div style={{ color: 'rgba(199,196,215,0.5)', fontSize: '0.875rem' }}>Loading lesson…</div>
        )}

        {error && (
          <div style={{ color: '#f87171', fontSize: '0.875rem' }}>Failed to load lesson: {error}</div>
        )}

        {!loading && lesson && (
          <>
            <header style={{ marginBottom: '48px' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#dae2fd', margin: '0 0 12px' }}>
                {lesson.title}
              </h1>
            </header>

            {lesson.theory_md ? (
              <article className="prose-lesson">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#dae2fd', marginBottom: '16px' }}>{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#dae2fd', marginBottom: '12px', marginTop: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '4px', height: '20px', background: '#44e2cd', borderRadius: '2px', display: 'inline-block' }} />
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#bdc2ff', marginBottom: '8px', marginTop: '24px' }}>{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p style={{ color: '#c7c4d7', lineHeight: 1.8, marginBottom: '20px' }}>{children}</p>
                    ),
                    code: ({ children, className }) => {
                      const isBlock = className?.includes('language-')
                      if (isBlock) {
                        return (
                          <pre style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            background: '#060e20',
                            borderRadius: '10px',
                            border: '1px solid rgba(70,69,84,0.2)',
                            padding: '20px 24px',
                            overflowX: 'auto',
                            marginBottom: '24px',
                          }}>
                            <code style={{ fontSize: '0.875rem', lineHeight: 1.75, color: '#c7c4d7' }}>{children}</code>
                          </pre>
                        )
                      }
                      return (
                        <code style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: '#bdc2ff', background: '#222a3d',
                          padding: '2px 6px', borderRadius: '4px', fontSize: '0.875em',
                        }}>{children}</code>
                      )
                    },
                    ul: ({ children }) => (
                      <ul style={{ color: '#c7c4d7', paddingLeft: '20px', marginBottom: '20px', lineHeight: 1.8 }}>{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol style={{ color: '#c7c4d7', paddingLeft: '20px', marginBottom: '20px', lineHeight: 1.8 }}>{children}</ol>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote style={{
                        borderLeft: '3px solid #44e2cd', paddingLeft: '16px',
                        color: 'rgba(199,196,215,0.7)', marginBottom: '20px', fontStyle: 'italic',
                      }}>{children}</blockquote>
                    ),
                  }}
                >
                  {lesson.theory_md}
                </ReactMarkdown>
              </article>
            ) : (
              <p style={{ color: 'rgba(199,196,215,0.4)', fontStyle: 'italic' }}>
                No theory content yet for this lesson.
              </p>
            )}

            {/* Footer */}
            <footer style={{ marginTop: '80px', paddingTop: '48px', borderTop: '1px solid rgba(70,69,84,0.15)', textAlign: 'center' }}>
              <p style={{ color: 'rgba(199,196,215,0.5)', fontSize: '0.875rem', marginBottom: '24px' }}>
                Ready to practice?
              </p>
              {firstTaskId ? (
                <button
                  onClick={() => navigate(`/ide/${firstTaskId}`)}
                  style={{
                    padding: '14px 48px', borderRadius: '8px',
                    background: 'linear-gradient(135deg, #bdc2ff, #7c87f3)',
                    color: '#000767', fontWeight: 700, border: 'none',
                    cursor: 'pointer', fontSize: '1rem',
                  }}
                >
                  Go to Practice →
                </button>
              ) : (
                <p style={{ color: 'rgba(199,196,215,0.3)', fontSize: '0.875rem' }}>No tasks attached yet.</p>
              )}
            </footer>
          </>
        )}
      </main>
    </div>
  )
}
