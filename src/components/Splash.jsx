import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Soft radial accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(2,132,199,0.2),transparent_40%)]"/>
      {/* Subtle diagonal sheen (pure CSS gradient to avoid data-URI parsing issues) */}
      <div className="absolute inset-0 opacity-25 bg-gradient-to-tr from-[#0a1b2e] via-transparent to-[#03162a]"/>

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
