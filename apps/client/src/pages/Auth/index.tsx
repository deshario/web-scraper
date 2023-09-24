import { useCallback, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import LoginForm from '@components/Forms/LoginForm'
import RegisterForm from '@components/Forms/RegisterForm'
import { useAuth } from '@hooks/useAuth'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login')
  const auth = useAuth()

  const handleTabSelect = useCallback((tabKey: string | null) => {
    if (tabKey) setActiveTab(tabKey)
  }, [])

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Body>
            <Tabs activeKey={activeTab} className='mb-3' onSelect={handleTabSelect}>
              <Tab eventKey='login' title='Login'>
                <LoginForm onSubmit={auth.authenticate} />
              </Tab>
              <Tab eventKey='register' title='Register'>
                <RegisterForm onSubmit={auth.register} />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default AuthPage
