import { motion } from 'framer-motion'
import { ArrowDown, GitFork, Link, Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center max-w-3xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-purple-600 mx-auto mb-8 flex items-center justify-center text-3xl text-white font-bold shadow-lg shadow-accent/30"
        >
          A
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-accent font-semibold text-sm uppercase tracking-widest mb-4"
        >
          Full-Stack Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white"
        >
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Alex
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed"
        >
          I build beautiful, performant web apps and turn ideas into reality.
          Passionate about clean code, great UX, and the open web.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-full font-semibold transition-all duration-200 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-5 justify-center mt-10"
        >
          {[
            { icon: GitFork, href: '#', label: 'GitHub' },
            { icon: Link, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#contact', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-white dark:hover:bg-accent transition-all duration-200 hover:-translate-y-0.5"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 animate-bounce text-gray-400 hover:text-accent transition-colors"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  )
}
