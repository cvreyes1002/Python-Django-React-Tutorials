import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { AuthProvider } from './AuthContext'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      <AuthProvider>
        {!isOwnerPath && <Navbar />}
      </AuthProvider>
    </div>
  )
}

export default App



