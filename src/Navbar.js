import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./nav.css";
function CollapsibleExample() {
  return (
    <div className="navbar__container">
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed={"top"}
        sticky="top"
        className={"position-sticky ps-0"}
      >
        <Container>
          <Navbar.Brand href="#home">SYSU</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" sticky="top">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Post</Nav.Link>
            <Nav.Link href="#pricing">Popular</Nav.Link> */}
            </Nav>
            <Nav>
              <Nav.Link href="#about">
                <span>About</span>
              </Nav.Link>
              <Nav.Link href="#post">
                <span>Post</span>
              </Nav.Link>
              <Nav.Link href="#popular">
                <span>Popular</span>
              </Nav.Link>
              <Nav.Link eventKey={2} href="#contact">
                <span>Contact</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CollapsibleExample;
