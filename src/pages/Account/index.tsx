import * as React from "react";
import { AuthUserContext } from "../../firebase/AuthUserContext";
import { withAuthorization } from "../../firebase/withAuthorization";
import { PasswordForgetForm } from "../PasswordForget/PasswordForgetForm";
import { PasswordChangeForm } from "./PasswordChangeForm";

export const AccountComponent = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {(authUser as any).email}</h1>
        <div>
          <h2>Forgotten Password</h2>
          <PasswordForgetForm />
        </div>
        <div>
          <h2>Reset Password</h2>
          <PasswordChangeForm />
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = (authUser: any) => !!authUser;

export const Account = withAuthorization(authCondition)(AccountComponent);
