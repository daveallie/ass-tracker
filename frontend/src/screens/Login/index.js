import React, { useState } from "react";
import {Button, Input} from "semantic-ui-react";
import { login } from "../../util/api";
import styles from "./styles.module.css";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    login()
      .then(() => window.location.reload())
  };

  return (
    <div className={styles.container}>
      <img className={styles.icon} src="https://cdn2.iconfinder.com/data/icons/fashion-beauty-accessories/128/underwear-thong-butt-512.png" />
      <div className={styles.loginBox}>
        <div className={styles.loginText}>Login</div>
        <div className={styles.inputs}>
          <Input fluid placeholder='Username' />
          <Input fluid placeholder='Password' />
        </div>
        <Button secondary loading={loading} onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}

export default Login;
