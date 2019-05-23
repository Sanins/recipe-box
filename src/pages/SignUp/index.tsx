import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../../constants/routes";
import { SignUpForm } from "./SignUpForm";
import { Form } from 'react-bootstrap';

const SignUpComponent = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

export const SignUpLink = () => (
  <Form.Label>Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link></Form.Label>
);

export const SignUp = withRouter(SignUpComponent);
