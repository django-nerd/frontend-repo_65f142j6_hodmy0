import { useEffect, useState } from 'react'

export default function BackendUrlBar({ onChange }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const env = import.meta.env.VITE_BACKEND_URL
    const saved = localStorage.getItem('dropline.backendUrl')
    const initial = saved || env || ''
    setValue(initial)
    if (onChange) onChange(initial)
  }, [])

  const save = () => {
    localStorage.setItem('dropline.backendUrl', value)
    if (onChange) onChange(value)
  }

  return (
    <div className="flex items-center gap-2 bg-white/70 border border-slate-200 rounded-xl p-2">
      <span className="text-xs text-slate-600">Backend URL</span>
      <input
        className="flex-1 text-sm bg-transparent outline-none px-2"
        placeholder="https://<your-backend>.host"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={save} className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white">Save</button>
    </div>
  )
}
