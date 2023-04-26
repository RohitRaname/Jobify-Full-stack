import { Logo, FormRow, Alert } from "./../components";
import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [state, setState] = useState(initialState);
  const { showAlert, displayAlert, user, isLoading, register, login } =
    useAppContext();
  const Navigate = useNavigate();

  useEffect(() => {
    if (user) setTimeout(() => Navigate("/"), 3100);
    // eslint-disable-next-line
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    const { name, email, password, isMember } = state;

    if (!email || !password || (!isMember && !name)) return displayAlert();

    const currentUser = { name, email, password };

    if (isMember) {
      login(currentUser);
    } else {
      register(currentUser);
    }
  };

  const resetState = () =>
    setState({
      name: "",
      email: "",
      password: "",
    });

  const toggleMember = () => {
    resetState();
    setState({ ...state, isMember: !state.isMember });
  };

  const { name, email, password, isMember } = state;

  return (
    <Wrapper className="page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3> {isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {!isMember && (
          <FormRow
            {...{ name: "name", value: name, type: "text", handleChange }}
          />
        )}
        <FormRow
          {...{ name: "email", value: email, type: "email", handleChange }}
        />
        <FormRow
          {...{
            name: "password",
            value: password,
            type: "password",
            handleChange,
          }}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            login({
              name: "testUser",
              email: "test@gmail.com",
              password: "secret",
            });
          }}
        >
          {isLoading?"...loading":"Demo App"}
        </button>

        <p>
          {isMember ? "Not a member yet? " : "Already a member?"}
          <button className="member-btn" type="button" onClick={toggleMember}>
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

