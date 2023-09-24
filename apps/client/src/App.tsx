import Layout from '@components/Layout'
import AuthPage from '@pages/Auth'
import KeywordPage from '@pages/Keyword'

const App = () => {
  return (
    <Layout>
      <AuthPage />
      <KeywordPage />
    </Layout>
  )
}

export default App
