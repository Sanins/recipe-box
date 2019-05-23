import * as React from "react";
import * as routes from "../../constants/routes";
import { Button, Form } from 'react-bootstrap';
import { auth } from "../../firebase";

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  password?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  password: string;
}

export class SignInForm extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static INITIAL_STATE = {
    email: "",
    error: null,
    password: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...SignInForm.INITIAL_STATE };
  }

  public onSubmit = (event: any) => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...SignInForm.INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(SignInForm.propKey("error", error));
      });

    event.preventDefault();
  };

  public render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Form onSubmit={(event: any) => this.onSubmit(event)}>
        <Form.Group controlId="formEmailAddress">
          <Form.Label>Email Address</Form.Label>
          <Form.Control value={email} onChange={(event: any) => this.setStateWithEvent(event, "email")} type="text" placeholder="Email Address" />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={(event: any) => this.setStateWithEvent(event, "password")} type="password" placeholder="Password" />
        </Form.Group>
        <Button disabled={isInvalid} type="submit">Sign in</Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(SignInForm.propKey(columnType, (event.target as any).value));
  }
}
