import { ReactNode } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

interface IProps {
  children: ReactNode
}

const Layout = ({ children }: IProps) => {
  return (
    <div className='App'>
      <Navbar bg='primary' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='#'>Data Scraper</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='#'>Guest</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='pt-4'>{children}</Container>
    </div>
  )
}

export default Layout
