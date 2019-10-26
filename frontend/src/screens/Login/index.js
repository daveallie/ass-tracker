import React from "react";
import { Button } from "semantic-ui-react";
import { login } from "../../util/api";

const handleLogin = () => login()
  .then(() => window.location.reload());

const Login = () => (
  <div>
    <h1>LOGIN</h1>
    <Button primary onClick={handleLogin}>Login</Button>
  </div>
);

export default Login;
