import { ExternalLink, GitFork } from 'lucide-react'
import FadeIn from './FadeIn'

const projects = [
  {
    title: 'TaskFlow',
    description:
      'A real-time project management app with drag-and-drop boards, team collaboration, and Slack integration. Built for speed and simplicity.',
    tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    gradient: 'from-violet-500 to-purple-600',
    demo: '#',
    code: '#',
  },
  {
    title: 'ShopSense',
    description:
      'An e-commerce analytics dashboard that aggregates sales data across platforms and generates AI-powered insights for store owners.',
    tags: ['Next.js', 'Python', 'FastAPI', 'OpenAI'],
    gradient: 'from-blue-500 to-cyan-500',
    demo: '#',
    code: '#',
  },
  {
    title: 'DevNotes',
    description:
      'A markdown-first note-taking app for developers with code syntax highlighting, tagging, and full-text search across 10k+ notes instantly.',
    tags: ['TypeScript', 'Electron', 'SQLite', 'React'],
    gradient: 'from-emerald-500 to-teal-500',
    demo: '#',
    code: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-accent font-semibold text-sm uppercase tracking-widest text-center mb-3">
            My Work
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-16 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none border border-gray-200 dark:border-gray-800 hover:border-accent/40 dark:hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className={`h-40 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                  <span className="text-5xl font-black text-white/30 select-none">
                    {p.title[0]}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map(t => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={p.demo}
                      className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a
                      href={p.code}
                      className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <GitFork size={14} /> Code
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
