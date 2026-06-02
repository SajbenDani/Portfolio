import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { asset } from '@/lib/utils'

interface VideoModalProps {
  isOpen: boolean
  src: string
  onClose: () => void
}

export default function VideoModal({ isOpen, src, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            className="relative z-10 w-full max-w-4xl"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
            <video
              src={asset(src)}
              controls
              autoPlay
              className="w-full rounded-xl border border-white/10"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
