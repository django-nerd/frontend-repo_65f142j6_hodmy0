import { useState } from 'react'
import Splash from './components/Splash'
import RoleSelector from './components/RoleSelector'
import AuthForms from './components/AuthForms'

function App() {
  const [stage, setStage] = useState('splash')
  const [role, setRole] = useState(null)

  if (stage === 'splash') {
    return <Splash onDone={() => setStage('choose')} />
  }

  if (stage === 'choose') {
    return <RoleSelector onSelect={(r)=>{ setRole(r); setStage('auth') }} />
  }

  if (stage === 'auth') {
    return <AuthForms role={role} />
  }

  return null
}

export default App
