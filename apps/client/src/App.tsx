import Layout from '@components/Layout'
import { useAuth } from '@hooks/useAuth'
import AuthPage from '@pages/Auth'
import KeywordPage from '@pages/Keyword'

const App = () => {
  const { authenticated } = useAuth()

  return <Layout>{authenticated ? <KeywordPage /> : <AuthPage />}</Layout>
}

export default App
