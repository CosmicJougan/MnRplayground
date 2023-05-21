import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import MakeCards from "./MakeCards";
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
import { DateRange } from "react-date-range";
import { getWorkformsForDateRange } from "repositories/WorkformRepository";
import { useEffect, useState } from "react";
import UserDataCard from "./UserDataCards";

export default function PDFlayout(props) {
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
  const nameParam = props.name;
  const idParam = props.id;

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
      const list = await getWorkformsForDateRange(idParam, getDates());

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
          if (document.workedTimeInMs > 8 * 60 * 60 * 1000) {
            weekTotalOvertimeInMs +=
              document.workedTimeInMs - 8 * 60 * 60 * 1000;
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
      if (document.workedTimeInMs > 8 * 60 * 60 * 1000) {
        weekTotalOvertimeInMs += document.workedTimeInMs - 8 * 60 * 60 * 1000;
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
    <div>
      <Text>{nameParam}</Text>
      <Text>
        {"gewerkte uren: " + weekTotalState.totalWorkedTime.toFixed(2) + " uur"}
      </Text>
      <Text>
        {"waarvan overuren: " +
          weekTotalState.totalOvertime.toFixed(2) +
          " uur"}
      </Text>
      <Text>
        {"uren in magazijn: " +
          weekTotalState.totalMaterial.toFixed(2) +
          " uur"}
      </Text>
      <Text>
        {"Kilometers eigen vervoer: " +
          weekTotalState.totalPersonalTransportation.toFixed(2) +
          " uur"}
      </Text>
      <Text>
        {"Kilometers bedrijfs vervoer: " +
          weekTotalState.totalCompanyTransportation.toFixed(2) +
          " uur"}
      </Text>
    </div>
  );
}
