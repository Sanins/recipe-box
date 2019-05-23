import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import { AuthUserContext } from "../firebase/AuthUserContext";
import { SignOutButton } from "./SignOutButton";
import { Navbar, Nav } from "react-bootstrap";

export const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand>React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link>
          <Link to={routes.LANDING}>Landing</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to={routes.HOME}>Home</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to={routes.ACCOUNT}>Account</Link>
        </Nav.Link>
        <Nav.Link>
          <SignOutButton />
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const NavigationNonAuth = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand>React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link>
          <Link to={routes.LANDING}>Landing</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to={routes.SIGN_IN}>Sign In</Link>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

