import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import schema from "../utils/schema";
import { loginUser } from "../store/actions/treatmentFormActions";
import { connect } from "react-redux";

const defaultValues = {
  email: "",
  password: "",
};

const Login = ({ loginUser }) => {
  const [values, setValues] = useState(defaultValues);

  const onChange = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const loginHandler = (evt) => {
    evt.preventDefault();
    console.log("clicked!");
    loginUser(values);
  };

  return (
    <form className="login-form">
      <TextField
        name="email"
        variant="filled"
        type="email"
        label="Email"
        value={values.email}
        onChange={onChange}
        className="login-form-field"
        color="secondary"
      />
      <TextField
        name="password"
        variant="filled"
        type="Password"
        label="Password"
        value={values.password}
        onChange={onChange}
        className="login-form-field"
        color="secondary"
      />

      <Button
        onClick={loginHandler}
        className="login-form-field"
        variant="contained"
        color="secondary"
      >
        Login
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { loginUser })(Login);
