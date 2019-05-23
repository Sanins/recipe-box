import * as React from "react";
import { auth } from "../firebase";
import { Button } from "react-bootstrap";

export const SignOutButton = () => (
  <Button type="button" onClick={auth.doSignOut}>
    Sign Out
  </Button>
);
