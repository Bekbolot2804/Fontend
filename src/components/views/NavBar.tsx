import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"

export default function NavBar() { // Добавлен export default
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

// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import "./NavBar.css"

// export default function NavBar() {
//   const cartItemsCount = useSelector((state: RootState) => 
//     state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
//   );

//   return (
//     <>
//       <Navbar bg="primary" expand="lg" data-bs-theme="dark" fixed="top" className="my-navbar">
//         <Nav className="me-auto">
//           <Nav.Link href="/">Главная</Nav.Link>
//           <Nav.Link href="#cart">
//             Корзина <span className="badge bg-danger ms-2">{cartItemsCount}</span>
//           </Nav.Link>
//         </Nav>
//       </Navbar>
//     </>
//   );
// }