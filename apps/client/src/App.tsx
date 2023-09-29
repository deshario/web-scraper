import Layout from '@components/Layout'
import { useAuth } from '@hooks/useAuth'
import AuthPage from '@pages/Auth'
import KeywordPage from '@pages/Keyword'
import Notification from '@components/Notification'

const App = () => {
  const { authenticated } = useAuth()

  return (
    <Layout>
      {authenticated ? <KeywordPage /> : <AuthPage />}
      <Notification />
    </Layout>
  )
}

export default App
