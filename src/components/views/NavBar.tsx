import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"

function NavBar() {
  return (
    <>
      <Navbar bg="primary" expand="lg" data-bs-theme="dark" fixed="top" className="my-navbar">
        <Nav className="me-auto">
          <Nav.Link href="/">Главная</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;

// "primary"

// "secondary"

// "success"

// "danger"

// "warning"

// "info"

// "light"

// "dark"