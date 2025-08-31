import { Loader2 } from 'lucide-react'

function Loading({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 size={40} className='text-primary animate-spin' />
    </div>
  )
}

export default Loading
