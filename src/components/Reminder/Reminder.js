import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
import CheckedIcon from "@material-ui/icons/CheckCircle";
import { UserContext } from "../../store/context/userContext";
import { validateUserTimezone } from "../../utils";
import {addAlert} from '../../utils';


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

export default function Reminder({ prayer, time}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { tz } = useContext(UserContext);
  const [enableAlarm, setEnableAlarm] = useState(true);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    // Check for Reminder cookie
    if (sessionStorage.getItem(`padachone_reminder:${time}`)) {
      setEnableAlarm(false);
    }
    else {
      // it should be <, and  > is only for testing
      if (new Date().getHours() < time.split(":")[0]) {
        setEnableAlarm(true);
      }
      else if(new Date().getHours() === time.split(":")[0]) {
        if (new Date().getMinutes() >= time.split(":")[1]) {
          setHide(true)
        }
        else {
          setEnableAlarm(true)
        }
      }
      else {
        setHide(true)
      }
    }
  }, [time]);

  // Reminder is only available for same timezone
  if (validateUserTimezone(tz)) {
    return (
      <IconButton
        color="primary"
        className={classes.button}
        aria-label="add an alarm"
        onClick={() => setLoading(true)}
      >
        {!enableAlarm ? (
          <CheckedIcon fontSize="default"/>
        ) : !hide ? (
          loading ? (
            <small style={{ fontSize: "12px", fontStyle: "Italic" }}>
              Scheduling...
            </small>
          ) : (
            <AlarmIcon onClick={() => addAlert({prayer, time, tz}).then((res) => {
              if (res === 'OK') {
                console.log('%c OKAY', 'font-size:50px;');
                setEnableAlarm(false);
              }
            })} />
          )
        ) : null}
      </IconButton>
    );
  } else {
    return null;
  }
}
