export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800 text-center">
      <p className="text-sm text-gray-400 dark:text-gray-600">
        © {new Date().getFullYear()} Alex. Built with React + Tailwind CSS.
      </p>
    </footer>
  )
}
