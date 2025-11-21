import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(2,132,199,0.2),transparent_40%)]"/>
      <div className="absolute inset-0 opacity-30" style={{background:"url('data:image/svg+xml,%3Csvg width=\\"100%25\\" height=\\"100%25\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cdefs%3E%3ClinearGradient id=\\"g\\" x1=\\"0\\" y1=\\"0\\" x2=\\"1\\" y2=\\"1\\"%3E%3Cstop offset=\\"0%25\\" stop-color=\\"%230a1b2e\\"/%3E%3Cstop offset=\\"100%25\\" stop-color=\\"%2303162a\\"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" fill=\\"url(%23g)\\"/%3E%3C/svg%3E') center/cover no-repeat"}}/>
      <div className="relative h-screen flex items-center">
        <div className="max-w-5xl mx-auto w-full px-8">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-left"
            >
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 drop-shadow"
              >
                DropLine
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-4 text-lg sm:text-xl text-blue-200/80 max-w-xl"
              >
                منصة توصيل سريعة لمنتجات الحرف اليدوية والكرونيه والملابس ومستحضرات التجميل وغيرها داخل مدينتك.
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Splash
