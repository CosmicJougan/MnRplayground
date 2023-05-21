import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoginContext } from "context/LoginContext";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  setWorkformById,
  getWorkformForDateById,
} from "../../repositories/WorkformRepository";
import { workFormInterface } from "models/Models";

import "./WorkForm.css";
import { getUsers } from "repositories/UserRepository";

export default function WorkForm() {
  const [workFormState, setWorkFormState] = useState(workFormInterface);
  const [loginState] = useLoginContext();
  const { date } = useParams();
  const [localeDate] = useState(date);
  const [docId, setDocId] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [user, setUser] = useState(loginState.userId);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState(loginState.userName);


  
  useEffect(() => {
    getWorkFormDataByDate();
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);


  async function getWorkFormDataByDate() {
    const { form, docId } = await getWorkformForDateById(
      user,
      localeDate.toString().replaceAll("-", "/")
    );
    setWorkFormState(form);
    setDocId(docId);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  

  const calculateFormTimestamp = (workedTimeString) => {
    const timeParts = workedTimeString.split(":");
    return 3600000 * parseInt(timeParts[0]) + 60000 * parseInt(timeParts[1]);
  };

  const onSubmit = async () => {
    console.log(workFormState);
    handleClose();

    console.log("Sla timestamp hier op: " + workFormState.workedTimeInMs);
    await setWorkformById(docId, {
      ...workFormState,
    });
  };
  const handleSwitch = (userSelect) => {
    console.log("deze test werkt met " + userSelect.displayName);
    setUser(userSelect.userId)
    console.log(userSelect)
    setUserName(userSelect.displayName)
    getWorkFormDataByDate();
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));     
    handleClose2();
  }

  return (
    <div>
      <div className="cardWorkForm">
        <Card className="cardWorkFormStyle">
          <CardContent className="cardWorkFormContent">
            <Typography
              sx={{ fontSize: 18, align: "center" }}
              color="text.secondary"
              gutterBottom
            >
              <button className="selecterKnop" onClick={handleClickOpen2}>
                  {userName}'s Werkfiche {localeDate}
              </button> 
            </Typography>
            <Dialog
              open={open2}
              onClose={handleClose2}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Welke werknemer kies je?"}
              </DialogTitle>
              <DialogContent>
                <ul>
                  {users.map((userData) => (
                    <li key={userData.userId}>
                      <button className="selectie" onClick={async (item) => {
                              handleSwitch(userData);
                            }}>
                        {userData.displayName}
                      </button>
                    </li>
                    ))}
                </ul>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2}>Terug</Button>
              </DialogActions>
            </Dialog>
            <TextField
              size="small"
              value={workFormState.workedTime}
              fullWidth
              variant="outlined"
              id="time"
              type="time"
              label="Gewerkte uren"
              onChange={(event) =>
                setWorkFormState({
                  ...workFormState,
                  workedTimeInMs: calculateFormTimestamp(event.target.value),
                  workedTime: event.target.value,
                })
              }
            />
            <TextField
              size="small"
              value={workFormState.constructionSite}
              fullWidth
              variant="outlined"
              id="Locatie werf"
              label="Locatie werf"
              onChange={(event) =>
                setWorkFormState({
                  ...workFormState,
                  constructionSite: event.target.value,
                })
              }
            />
            <TextField
              size="small"
              value={workFormState.personalTransportation}
              fullWidth
              variant="outlined"
              type="number"
              label="Verplaatsing persoons"
              onChange={(event) =>
                setWorkFormState({
                  ...workFormState,
                  personalTransportation: parseInt(event.target.value),
                })
              }
            />
            <TextField
              size="small"
              value={workFormState.companyTransportation}
              fullWidth
              variant="outlined"
              type="number"
              label="Verplaatsing werk"
              onChange={(event) =>
                setWorkFormState({
                  ...workFormState,
                  companyTransportation: parseInt(event.target.value),
                })
              }
            />
            <TextField
              size="small"
              value={workFormState.material}
              fullWidth
              type="time"
              variant="outlined"
              label="Laden/Lossen/Materiaal"
              onChange={(event) =>
                setWorkFormState({
                  ...workFormState,
                  materialInMs: calculateFormTimestamp(event.target.value),
                  material: event.target.value,    
                })
              }
            />
            <TextField
              size="small"
              value={workFormState.notes}
              fullWidth
              variant="outlined"
              label="Opmerkingen"
              multiline={true}
              maxRows={3}
              onChange={(event) =>
                setWorkFormState({
                  ...workFormState,
                  notes: event.target.value,
                })
              }
            />
          </CardContent>
          <CardActions className="cardWorkFormActions">
            <Button
              style={{ background: "#009da5", color: "white" }}
              onClick={handleClickOpen}
            >
              Opslaan
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Gegevens opslaan?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Bent u zeker dat u deze gegevens wilt opslaan/overschrijven?
                  Alle gewijzigde data gaat verloren.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Terug</Button>
                <Button onClick={onSubmit} autoFocus>
                  Opslaan
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
