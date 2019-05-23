import * as React from "react";
import * as routes from "../../constants/routes";
import { auth, db } from "../../firebase";
import { Form, Button } from "react-bootstrap";

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  passwordOne?: string;
  passwordTwo?: string;
  username?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  passwordOne: string;
  passwordTwo: string;
  username: string;
}

export class SignUpForm extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static INITIAL_STATE = {
    email: "",
    error: null,
    passwordOne: "",
    passwordTwo: "",
    username: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...SignUpForm.INITIAL_STATE };
  }

  public onSubmit(event: any) {
    event.preventDefault();

    const { email, passwordOne, username } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {

            this.setState(() => ({ ...SignUpForm.INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(SignUpForm.propKey("error", error));
          });
      })
      .catch(error => {
        this.setState(SignUpForm.propKey("error", error));
      });
  }

  public render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Form onSubmit={(event:any) => this.onSubmit(event)}>
        <Form.Group controlId="signUpFullName">
          <Form.Control
            value={username}
            onChange={(event:any) => this.setStateWithEvent(event, "username")}
            type="text"
            placeholder="Full Name"
          />
        </Form.Group>
        <Form.Group controlId="signUpEmailAddress">
          <Form.Control
            value={email}
            onChange={(event:any) => this.setStateWithEvent(event, "email")}
            type="text"
            placeholder="Email Address"
          />
        </Form.Group>
        <Form.Group controlId="signUpPassword">
          <Form.Control
            value={passwordOne}
            onChange={(event:any) => this.setStateWithEvent(event, "passwordOne")}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="signUpConfirmPassword">
        <Form.Control
          value={passwordTwo}
          onChange={(event:any) => this.setStateWithEvent(event, "passwordTwo")}
          type="password"
          placeholder="Confirm Password"
        />
        </Form.Group>
        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }

  private setStateWithEvent(event: any, columnType: string) {
    this.setState(SignUpForm.propKey(columnType, (event.target as any).value));
  }
}
