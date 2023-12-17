import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Change the import to useNavigate
import "../components/styles/regframe.css";

import facebookIcon from "../svgs/facebook.svg";
import googleIcon from "../svgs/google.svg";
import githubIcon from "../svgs/github.svg";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

export function SignInFrame() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [twoFactorAuthToken, setTwoFactorAuthToken] = useState("");

  // Use the useNavigate hook instead of useHistory

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Google Authentication Handler
  const handleGoogleAuth = () => {
    window.open(`http://localhost:3000/auth/google/`, "_self");
  };
  const handleSignUpRedirect = () => {
    navigate("/SignUp"); // Update with your actual signup path
  };

  const { loginUser, loginInfo, updateLoginInfo, loginError, loginLoading } =
    useContext(AuthContext);

  const handleInputChange = (e) => {
    updateLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();

    if (loginInfo.user) {
      navigate("/"); // Navigate to the chat page or desired route
    }
  };

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{ height: "100vh", justifyContent: "center", padding: "10%" }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />

              <Button variant="primary" type="submit">
                {loginLoading ? "Getting you in..." : "Login"}
              </Button>
              {loginError?.error && (
                <Alert variant="danger">
                  <p>{loginError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
