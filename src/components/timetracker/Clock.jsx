import React, { useState, useEffect, useRef } from "react";
import { useLoginContext } from "context/LoginContext";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import {
  getClockStatusById,
  saveTimestampToWorkformById,
  setClockStatusById,
} from "../../repositories/ClockRepository";
import { clockStateInterface, ClockState } from "models/Models";

import "./Clock.css";
import { color } from "@mui/system";

export default function Clock() {
  const [time, setTime] = useState(new Date(0));
  const [clockState, setClockState] = useState(ClockState.Off);
  const [startTimestamp, setStartTimestamp] = useState(0);
  const [pausedTimestamp, setPausedTimestamp] = useState(0);
  const myClockRef = useRef(undefined);
  const [loginState] = useLoginContext();

  useEffect(() => {
    retrieveClockState();

    return () => {
      console.log("Cleanup component here..");
      clearInterval(myClockRef.current);
    };
  }, []);

  async function retrieveClockState() {
    console.log("Initialize component here..");
    const timerStatus = await getClockStatusById(loginState.userId);
    if (timerStatus) {
      console.log("after init: " + JSON.stringify(timerStatus));
      setClockState(timerStatus.status);
      if (timerStatus.status === ClockState.Off) {
        setTime(new Date(0));
      }
      if (timerStatus.status === ClockState.Running) {
        setStartTimestamp(timerStatus.startTimestamp);
        clearInterval(myClockRef.current);
        myClockRef.current = setInterval(() => {
          setTime(new Date(Date.now() - timerStatus.startTimestamp));
        }, 1000);
      }
      if (timerStatus.status === ClockState.Stopped) {
        setStartTimestamp(timerStatus.startTimestamp);
        setPausedTimestamp(timerStatus.pausedTimestamp);
        setTime(new Date(timerStatus.pausedTimestamp));
      }
    } else {
      setTime(new Date(0));
    }
  }

  const start = async () => {
    clearInterval(myClockRef.current);
    myClockRef.current = setInterval(() => {
      setTime((previousTime) => new Date(previousTime.getTime() + 1000));
    }, 1000);
    await setClockStatusById(loginState.userId, {
      status: ClockState.Running,
      pausedTimestamp: 0,
      startTimestamp: Date.now(),
    });
    setStartTimestamp(Date.now());
    setClockState(ClockState.Running);
  };

  const stop = async () => {
    clearInterval(myClockRef.current);
    await setClockStatusById(loginState.userId, {
      startTimestamp: startTimestamp,
      pausedTimestamp: Date.now() - startTimestamp,
      status: ClockState.Stopped,
    });
    // Compensate 700 ms for UI lag ?? Ugly shiet
    setPausedTimestamp(Date.now() - startTimestamp - 700);
    setClockState(ClockState.Stopped);
  };

  const reset = async () => {
    clearInterval(myClockRef.current);
    await setClockStatusById(loginState.userId, clockStateInterface);
    setClockState(ClockState.Off);
    setStartTimestamp(0);
    setPausedTimestamp(0);
    setTime(new Date(0));
  };

  const resume = async () => {
    await setClockStatusById(loginState.userId, {
      startTimestamp: Date.now() - pausedTimestamp,
      pausedTimestamp: 0,
      status: ClockState.Running,
    });
    setStartTimestamp(Date.now() - pausedTimestamp);
    setClockState(ClockState.Running);
    clearInterval(myClockRef.current);
    myClockRef.current = setInterval(() => {
      setTime((previousTime) => new Date(previousTime.getTime() + 1000));
    }, 1000);
  };

  const save = async () => {
    //TODO still a problem with paused time retrieval
    await saveTimestampToWorkformById(loginState.userId, pausedTimestamp).then(
      () => reset()
    );
  };

  const requestTime = async () => {
    await 
  }

  return (
    <div className="clock-flex-container">
      <div className="inner-wrapper">
        <h2 className="clock"></h2>
      </div>
      {clockState === ClockState.Off ? (
        <Button
          variant="contained"
          style={{ background: "#202020", borderRadius: 100 }}
          className="Knop"
          size="large"
          onClick={start}
        >
          Start
        </Button>
      ) : (
        ""
      )}

      {clockState === ClockState.Running ? (
        <div>
          <Button
            variant="contained"
            style={{ background: "#505050", borderRadius: 100 }}
            className="Knop"
            size="large"
            onClick={stop}
          >
            Stop
          </Button>
        </div>
      ) : (
        ""
      )}

      {clockState === ClockState.Stopped ? (
        <div>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              style={{ background: "#009da5" }}
              size="large"
              onClick={resume}
            >
              Hervat
            </Button>
            <Button
              variant="outlined"
              style={{ background: "#FFFFFF", color: "#009da5" }}
              size="large"
              onClick={reset}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              style={{ background: "#009da5" }}
              size="large"
              onClick={save}
            >
              Opslaan
            </Button>
          </Stack>
        </div>
      ) : (
        ""
      )}
      <div>
        <Button
          variant="contained"
          style={{ background: "#505050", borderRadius: 10 }}
          className="ReqTime"
          size="large"
          onClick={requestTime}
        >
          Amongus
        </Button>
      </div>
    </div>
  );
}
