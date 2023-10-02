import { ReactNode } from 'react'
import { useAuth } from '@hooks/useAuth'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

interface IProps {
  children: ReactNode
}

const Layout = ({ children }: IProps) => {
  const auth = useAuth()

  return (
    <div className='App'>
      <Navbar bg='primary' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='#'>Data Scraper</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {!auth.authenticated ? (
                <Nav.Link href='#'>Guest</Nav.Link>
              ) : (
                <NavDropdown title={auth.user!.username} menuVariant='dark'>
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
