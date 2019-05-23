import * as React from "react";
import { auth } from "../../firebase";
import { Form, Button } from "react-bootstrap";

interface InterfaceProps {
  error?: any;
  history?: any;
  passwordOne?: string;
  passwordTwo?: string;
}

interface InterfaceState {
  error?: any;
  passwordOne?: string;
  passwordTwo?: string;
}

export class PasswordChangeForm extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static INITIAL_STATE = {
    error: null,
    passwordOne: "",
    passwordTwo: ""
  };

  private static propKey(propertyName: string, value: string): object {
    return { [propertyName]: value };
  }

  constructor(props: any) {
    super(props);
    this.state = { ...PasswordChangeForm.INITIAL_STATE };
  }

  public onSubmit = (event: any) => {
    const { passwordOne }: any = this.state;

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...PasswordChangeForm.INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(PasswordChangeForm.propKey("error", error));
      });

    event.preventDefault();
  };

  public render() {
    const { passwordOne, passwordTwo, error }: any = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <Form onSubmit={(event:any) => this.onSubmit(event)}>
        <Form.Group controlId="accountNewPassword">
          <Form.Control
            value={passwordOne}
            onChange={(event:any) => this.setStateWithEvent(event, "passwordOne")}
            type="password"
            placeholder="New Password"
          />
        </Form.Group>
        <Form.Group controlId="accountConfirmNewPassword">
          <Form.Control
            value={passwordTwo}
            onChange={(event:any) => this.setStateWithEvent(event, "passwordTwo")}
            type="password"
            placeholder="Confirm New Password"
          />
        </Form.Group>
        <Button disabled={isInvalid} type="submit">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(
      PasswordChangeForm.propKey(columnType, (event.target as any).value)
    );
  }
}
