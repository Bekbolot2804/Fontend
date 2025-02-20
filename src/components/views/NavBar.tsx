import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"

function NavBar() {
  return (
    <>
      <Navbar bg="blue" expand="lg" data-bs-theme="dark" fixed="top" className="my-navbar">
        {/*<Container>*/}
          {/*<Navbar.Brand href="/">Главная</Navbar.Brand>*/}
          <Nav className="me-auto">
            <Nav.Link href="/">Главная</Nav.Link>
            {/*<Nav.Link href="/Helps">Космические объекты</Nav.Link>*/}
            {/*<Nav.Link href="#pricing">Pricing</Nav.Link>*/}
          </Nav>
        {/*</Container>*/}
      </Navbar>
    </>
  );
}

export default NavBar;