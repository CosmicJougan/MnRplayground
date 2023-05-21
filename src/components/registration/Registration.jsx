import React, { useState } from "react";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import TextBox from "../../core/TextField";
import { createUserById } from "repositories/UserRepository";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";

import "./Registration.css";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [messageLabel, setMessageLabel] = useState("");

  const handleSubmit = async () => {
    if (
      password &&
      confirmedPassword &&
      password === confirmedPassword &&
      password.length >= 6 &&
      confirmedPassword.length >= 6
    ) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          await createUserById(userCredentials.user.uid, {
            email: userCredentials.user.email,
            displayName: name,
            isAdmin: isAdmin,
            userId: userCredentials.user.uid,
          }).then(() =>
            setMessageLabel(`Nieuwe gebruiker voor ${email} is aangemaakt.`)
          );
        })
        .catch((error) => {
          if (error.message === "EMAIL_EXISTS") {
            setMessageLabel("Deze gebruiker bestaat al.");
          } else {
            setMessageLabel("Er ging iets mis, probeer opnieuw.");
          }
        });
    } else if (!password || !confirmedPassword) {
      setMessageLabel("Passwoord en bevestiging moeten ingevuld zijn!");
    } else if (password.length < 6) {
      setMessageLabel("Passwoord moet minstens 6 tekens lang zijn!");
    } else if (password !== confirmedPassword) {
      setMessageLabel("Passwoord en bevestigd passwoord komen niet overeen!");
    } else {
      setMessageLabel("Er ging iets mis, probeer het opnieuw...");
    }
  };

  return (
    <>
      <div>
        <div className="cardRegistration">
          <Card className="cardRegistrationStyle">
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
                className="registartionSignupText"
              >
                Voeg nieuwe gebruiker toe
              </Typography>
              <TextBox
                label="Naam"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextBox
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextBox
                label="Passwoord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextBox
                label="Bevestig passwoord"
                type="password"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
            </CardContent>
            <CardActions className="cardRegistrationActions">
              <Stack direction="column" spacing={1}>
                <FormControlLabel
                  control={<Checkbox />}
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(!isAdmin)}
                  label="Is Admin"
                />
                <Button
                  style={{ background: "#009da5", color: "white" }}
                  onClick={handleSubmit}
                >
                  Toevoegen
                </Button>
              </Stack>
            </CardActions>
            {messageLabel ? (
              <div className="registrationMessageText">{messageLabel}</div>
            ) : null}
          </Card>
        </div>
      </div>
    </>
  );
}
