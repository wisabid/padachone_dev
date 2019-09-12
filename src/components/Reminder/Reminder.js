import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
import CheckedIcon from "@material-ui/icons/CheckCircle";
import { UserContext } from "../../store/context/userContext";
import { validateUserTimezone } from "../../utils";
import { addAlert } from "../../utils";
import { messaging } from "../../config/firebase";
import TestReminder from "./TestReminder";

const useStyles = makeStyles(theme => ({
  button: {
    // margin: theme.spacing(1),
    margin: "5px",
    padding: "0",
    minHeight: "25px"
  },
  input: {
    display: "none"
  }
}));

export default function Reminder({ prayer, time }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, name: "" });

  const { tz, handleNav, setTempdata } = useContext(UserContext);
  const [enableAlarm, setEnableAlarm] = useState(true);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    // Check for Reminder cookie
    if (sessionStorage.getItem(`padachone_reminder:${time}`)) {
      setEnableAlarm(false);
    } else {
      debugger;
      // it should be <, and  > is only for testing
      if (new Date().getHours() < parseInt(time.split(":")[0])) {
        setEnableAlarm(true);
      } else if (new Date().getHours() === parseInt(time.split(":")[0])) {
        if (new Date().getMinutes() >= parseInt(time.split(":")[1])) {
          setHide(true);
        } else {
          setEnableAlarm(true);
        }
      } else {
        setHide(true);
      }
    }
  }, [time]);

  const handleAlert = () => {
    debugger;
    if (!sessionStorage.getItem(`padachone_testreminder`)) {
      // setTempdata([{ prayer, time, tz }]);
      // handleNav("testcron");
      setModal({ show: true, name: "testcron" });
    } else {
      addAlert({ prayer, time, tz }).then(res => {
        if (res === "OK") {
          console.log("%c OKAY", "font-size:50px;");
          setEnableAlarm(false);
        }
      });
    }
  };

  // Reminder is only available for same timezone
  // Also for Android and chrome only..not for ios safari
  if (validateUserTimezone(tz) && messaging) {
    return (
      <>
        <IconButton
          color="primary"
          className={classes.button}
          aria-label="add an alarm"
          onClick={() => setLoading(true)}
        >
          {!enableAlarm ? (
            <CheckedIcon fontSize="default" />
          ) : !hide ? (
            loading ? (
              <small style={{ fontSize: "12px", fontStyle: "Italic" }}>
                Scheduling...
              </small>
            ) : (
              <AlarmIcon
                onClick={() => {
                  handleAlert();
                }}
              />
            )
          ) : null}
        </IconButton>
        <TestReminder
          modal={modal}
          setModal={setModal}
          prayer={prayer}
          time={time}
          handleAlert={handleAlert}
        />
      </>
    );
  } else {
    return null;
  }
}
