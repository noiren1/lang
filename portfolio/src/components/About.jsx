import FadeIn from './FadeIn'

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python',
  'PostgreSQL', 'Docker', 'AWS', 'GraphQL',
  'Tailwind CSS', 'Next.js', 'Git', 'REST APIs',
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-accent font-semibold text-sm uppercase tracking-widest text-center mb-3">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-16 text-gray-900 dark:text-white">
            Who I Am
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              <p>
                I'm a full-stack developer with 5+ years of experience building
                web applications that scale. I care deeply about performance,
                accessibility, and developer experience.
              </p>
              <p>
                When I'm not coding, I'm exploring new technologies, contributing
                to open source, or enjoying a good espresso while reading about
                distributed systems.
              </p>
              <p>
                I believe great software starts with a great team — collaboration,
                clarity, and curiosity are my core values.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <h3 className="text-lg font-semibold mb-5 text-gray-800 dark:text-gray-200">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-accent hover:text-white dark:hover:bg-accent transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
