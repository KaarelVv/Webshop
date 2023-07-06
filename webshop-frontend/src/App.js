import './App.css';

import { Link, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AddProduct from './pages/AddProduct';
import MaintainProduct from './pages/MaintainProduct';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  return (
    <div className="App">

      {/* <Link to="/">
      <img className='logo' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' alt=''/>
      </Link>

      <Link to="/lisa">
      <button className='menu-button'>Lisa toode</button>
      </Link>

      <Link to="/halda">
      <button className='menu-button'>Halda tooteid</button>
      </Link> */}

      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="mainPage">
            <img className='logo'
              src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
              alt='' />
              </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="mainPage">Meie tooted</Nav.Link>
              <NavDropdown title="Admin" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/lisa">Lisa toode</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/halda">Halda tooteid</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      <Routes>
        <Route path='mainPage' element={<Homepage />} />
        <Route path='lisa' element={<AddProduct />} />
        <Route path='halda' element={<MaintainProduct />} />
      </Routes>

    </div>
  );
}

export default App;
