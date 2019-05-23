import * as React from "react";
import { auth } from "../../firebase";
import { Button, Form } from 'react-bootstrap';

export class PasswordForgetForm extends React.Component {
  private static INITIAL_STATE = {
    email: "",
    error: null
  };

  private static propKey(propertyName: string, value: string) {
    return { [propertyName]: value };
  }

  constructor(props: any) {
    super(props);

    this.state = { ...PasswordForgetForm.INITIAL_STATE };
  }

  public onSubmit = (event: any) => {
    const { email }: any = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...PasswordForgetForm.INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(PasswordForgetForm.propKey("error", error));
      });

    event.preventDefault();
  };

  public render() {
    const { email, error }: any = this.state;
    const isInvalid = email === "";

    return (
      <Form onSubmit={(event:any) => this.onSubmit(event)}>
        <Form.Group controlId="formForgotEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control value={email} onChange={(event: any) => this.setStateWithEvent(event, "email")} type="text" placeholder="Email Address" />
        </Form.Group>
        <Button disabled={isInvalid} type="submit">
          Forgot Password
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(
      PasswordForgetForm.propKey(columnType, (event.target as any).value)
    );
  }
}
