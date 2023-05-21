import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextBox from "../../core/TextField";
import { useLoginContext } from "context/LoginContext";
import { Stack } from "@mui/material";
import { findUserById } from "../../repositories/UserRepository";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [state, dispatch] = useLoginContext();

  useEffect(() => {
    async function getUserSettings() {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) {
        const userData = await findUserById(user.uid);
        dispatch({ type: "SET_USER_NAME", userName: userData.displayName });
        dispatch({ type: "SET_USER_EMAIL", userEmail: userData.email });
        dispatch({ type: "SET_USER_ID", userId: userData.userId });
        dispatch({ type: "SET_LOGIN_STATE", isAuthenticated: true });
        dispatch({ type: "SET_USER_ADMIN", isAdmin: userData.isAdmin });
        navigate("/timer");
      } else {
        console.log("User not found..");
      }
    }

    getUserSettings();
  }, [user, loading, dispatch, navigate]);

  return (
    <>
      {!state.isAuthenticated ? (
        <div>
          <div className="cardLogin">
            <Card className="cardLoginStyle">
              <CardContent>
                <div className="loginSignupText">SIGN IN</div>
                <TextBox
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextBox
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </CardContent>
              <CardActions className="cardLoginActions">
                <Stack direction="column" spacing={2}>
                  <Button
                    style={{ background: "#009da5", color: "white" }}
                    onClick={() =>
                      signInWithEmailAndPassword(auth, email, password)
                    }
                  >
                    LOGIN
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default Login;
