import { ReactNode } from 'react'
import { useAuth } from '@hooks/useAuth'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Alert from 'react-bootstrap/Alert'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from './index.module.scss'

interface IProps {
  children: ReactNode
}

const Layout = ({ children }: IProps) => {
  const auth = useAuth()
  const hasNotification = !!auth.notification

  return (
    <div className='App'>
      {hasNotification && (
        <Alert key='danger' variant='danger' className={styles.notification}>
          {auth.notification}
        </Alert>
      )}

      <Navbar bg='primary' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='#'>Data Scraper</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {!auth.authenticated ? (
                <Nav.Link href='#'>Guest</Nav.Link>
              ) : (
                <NavDropdown title={auth.user?.username ?? 'Guest'} menuVariant='dark'>
                  <NavDropdown.Item onClick={auth.deAuthenticate}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className='pt-4'>{children}</Container>
    </div>
  )
}

export default Layout
