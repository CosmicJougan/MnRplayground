import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import LoadSpinner from "components/spinner/LoadSpinner";
import { useLoginContext } from "context/LoginContext";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { getWorkformsForDateRange } from "repositories/WorkformRepository";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./LiveFollower.css";
import { nl } from "date-fns/locale";

export default function UserDataCard(props) {
  const [loginState, dispatch] = useLoginContext();
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const [weekTotalState, setWeekTotalState] = useState({
    totalWorkedTime: 0,
    totalOvertime: 0,
    totalCompanyTransportation: 0,
    totalPersonalTransportation: 0,
    totalMaterial: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const startOfWeek = (date) => {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
  };

  const endOfWeek = (date) => {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? 0 : 7);

    return new Date(date.setDate(diff));
  };

  const [dateState, setDateState] = useState([
    {
      startDate: startOfWeek(new Date()),
      endDate: endOfWeek(new Date()),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const startDate = startOfWeek(new Date());
    const endDate = endOfWeek(new Date());
    setDateState([
      { startDate: startDate, endDate: endDate, key: "selection" },
    ]);

    const fetchData = async () => {
      const list = await getWorkformsForDateRange(props.idParam, getDates());

      setDocuments(list);
      return list;
    };

    fetchData()
      .then((list) => {
        const weekTotalTemp = {
          totalWorkedTime: 0,
          totalOvertime: 0,
          totalCompanyTransportation: 0,
          totalPersonalTransportation: 0,
          totalMaterial: 0,
        };
        var weekTotalWorkedTimeInMs = 0;
        var weekTotalOvertimeInMs = 0;
        var weekTotalMaterialInMs = 0;

        list.forEach((document) => {
          weekTotalTemp.totalPersonalTransportation +=
            document.personalTransportation;
          weekTotalTemp.totalCompanyTransportation +=
            document.companyTransportation;
          weekTotalWorkedTimeInMs += document.workedTimeInMs;
          weekTotalMaterialInMs += document.materialInMs;
          if (document.workedTimeInMs > 8*60*60*1000) {
            weekTotalOvertimeInMs += document.workedTimeInMs - 8*60*60*1000;
          }
        });

        

        weekTotalTemp.totalWorkedTime = weekTotalWorkedTimeInMs / 3600000;
        weekTotalTemp.totalOvertime = weekTotalOvertimeInMs / 3600000;
        weekTotalTemp.totalMaterial = weekTotalMaterialInMs / 3600000;

        setWeekTotalState(weekTotalTemp);
      })
      .then(() => setIsLoaded(true))
      .catch(console.error);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    // await fetchData()
    //   .then(() => {
    //     console.log("FetchData called in handleClose()");
    //     aggregateWeekData();
    //   })
    //   .catch(console.error);
  };

  const submitWeek = async () => {
    setOpen(false);
    await fetchData()
      .then(() => {
        console.log("FetchData called in submitWeek()");
        aggregateWeekData();
      })
      .catch(console.error);
  };

  const fetchData = async () => {
    const list = await getWorkformsForDateRange(props.idParam, getDates());
    console.log("In fetchData: " + JSON.stringify(dateState));
    setDocuments(list);
  };

  const aggregateWeekData = () => {
    console.log("In aggregateData: " + JSON.stringify(dateState));
    const weekTotalTemp = {
      totalWorkedTime: 0,
      totalOvertime: 0,
      totalCompanyTransportation: 0,
      totalPersonalTransportation: 0,
      totalMaterial: 0,
    };
    var weekTotalWorkedTimeInMs = 0;
    var weekTotalOvertimeInMs = 0;
    var weekTotalMaterialInMs = 0;

    documents.forEach((document) => {
      weekTotalTemp.totalPersonalTransportation +=
        document.personalTransportation;
      weekTotalTemp.totalCompanyTransportation +=
        document.companyTransportation;
      weekTotalWorkedTimeInMs += document.workedTimeInMs;
      weekTotalMaterialInMs += document.materialInMs;
      if (document.workedTimeInMs > 8*60*60*1000) {
        weekTotalOvertimeInMs += document.workedTimeInMs - 8*60*60*1000;
      }
    });


    weekTotalTemp.totalWorkedTime = weekTotalWorkedTimeInMs / 3600000;
    weekTotalTemp.totalOvertime = weekTotalOvertimeInMs / 3600000;
    weekTotalTemp.totalMaterial = weekTotalMaterialInMs / 3600000;

    setWeekTotalState(weekTotalTemp);
  };

  // @ts-ignore
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const getDates = (
    startDate = dateState[0].startDate,
    stopDate = dateState[0].endDate
  ) => {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(
        new Date(currentDate)
          .toLocaleDateString()
          .toString()
          .replaceAll("-", "/")
      );
      currentDate = currentDate.addDays(1);
    }
    console.log(dateArray);
    console.log("GetDates: " + JSON.stringify(dateState));
    return dateArray;
  };

  return (
    <div className="container">
      {!isLoaded && <LoadSpinner />}
      {isLoaded && (
        <Card className="followerStyle">
          <CardContent className="DataCard">
            <table>
              <tbody>
                <tr>
                  <td className="centreren" colSpan={2}>
                    <Typography
                      className="nameStyle"
                      sx={{ fontSize: 18, align: "center" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {props.nameParam}
                      <Button onClick={handleClickOpen}>
                        {dateState[0].startDate.toLocaleDateString()} ~{" "}
                        {dateState[0].endDate.toLocaleDateString()}
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Kies je datums"}
                        </DialogTitle>
                        <DialogContent>
                          <DateRange
                            editableDateInputs={true}
                            onChange={async (item) => {
                              setDateState([item.selection]);
                            }}
                            moveRangeOnFirstSelection={false}
                            ranges={dateState}
                            weekStartsOn={1}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={submitWeek}>kies</Button>
                        </DialogActions>
                      </Dialog>
                    </Typography>
                  </td>
                </tr>
                <tr className="m-3">
                  <td className="td">
                    <p>Totale gewerkte uren: </p>
                  </td>
                  <td className="td">
                    <TextField
                      className="DataCardContents right"
                      size="small"
                      value={weekTotalState.totalWorkedTime.toFixed(2)}
                      fullWidth
                      variant="outlined"
                      id="total-worked-time"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td className="td">
                    <p>Waarvan overuren: </p>
                  </td>
                  <td className="td">
                    <TextField
                      className="DataCardContents right"
                      size="small"
                      value={weekTotalState.totalOvertime.toFixed(2)}
                      fullWidth
                      variant="outlined"
                      id="total-overtime"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td className="td">
                    <p>Totale Persoonlijke Verplaatsing: </p>
                  </td>
                  <td className="td">
                    <TextField
                      className="DataCardContents right"
                      size="small"
                      value={weekTotalState.totalPersonalTransportation.toFixed(
                        2
                      )}
                      fullWidth
                      variant="outlined"
                      type="number"
                      label="Verplaatsing persoons"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td className="td">
                    <p>Totale Bedrijfs Verplaatsing: </p>
                  </td>
                  <td className="td">
                    <TextField
                      className="DataCardContents right"
                      size="small"
                      value={weekTotalState.totalCompanyTransportation.toFixed(
                        2
                      )}
                      fullWidth
                      variant="outlined"
                      type="number"
                      label="Verplaatsing werk"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td className="td">
                    <p>Totale tijd in magazijn: </p>
                  </td>
                  <td className="td">
                    <TextField
                      className="DataCardContents right"
                      size="small"
                      value={weekTotalState.totalMaterial.toFixed(2)}
                      fullWidth
                      variant="outlined"
                      label="magazijn"
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
