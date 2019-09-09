import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function Reminder({addAlert}) {
  const classes = useStyles();
  return (
      <IconButton color="primary" className={classes.button} aria-label="add an alarm" onClick={addAlert}>
        <AlarmIcon />
      </IconButton>
  );
}