import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./nav.css"
function CollapsibleExample() {
  return (
    <div className="navbar__container">
      <Navbar collapseOnSelect expand="lg" className="sticky-nav">
        <Container>
          <Navbar.Brand href="#home">SYSU</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ backgroundColor: "white", color: "black" }}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Nav>
              <Nav.Link href="#about"><span>About</span></Nav.Link>
              <Nav.Link href="#post"><span>Post</span></Nav.Link>
              <Nav.Link href="#popular"><span>Popular</span></Nav.Link>
              <Nav.Link href="#contact"><span>Contact</span></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CollapsibleExample;
