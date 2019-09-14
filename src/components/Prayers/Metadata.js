import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import MoonIcon from "@material-ui/icons/Brightness3";

import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color : 'rgba(0, 0, 0, 0.54)',
    // backgroundColor: "rgb(25, 118, 210)",
    // borderRadius: "5px",
    // color: "#fff"
    fontSize : '12px',
  },
  avatar: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#6495ed",
    fontSize: "14px",
    fontWeight: "bold",
    fontStyle: "italic"
  }
}));

const Metadata = ({ data }) => {
  const classes = useStyles();

  return (
    <>
      {/* <Grid container justify="center" alignItems="center">
        <Avatar className={classes.orangeAvatar}>{data.date.hijri.day}</Avatar>{" "}
        -
        <Avatar className={classes.orangeAvatar}>
          {data.date.hijri.month.number}
        </Avatar>{" "}
        -
        <Avatar className={classes.orangeAvatar}>{data.date.hijri.year}</Avatar>
        <span
          style={{
            fontSize: "10px",
            color: "rgba(0, 0, 0, 0.54)",
            fontStyle: "italic"
          }}
        >
          ({data.date.hijri.format})
        </span>
      </Grid> */}
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItem button>
          
          <ListItemText
            primary={<>{data.date.hijri.date}<span
            style={{
              fontSize: "10px",
              fontStyle: "italic"
            }}
          >
            ({data.date.hijri.format})
          </span></>}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          {/* <ListItemIcon>
            <MoonIcon />
          </ListItemIcon> */}
          <ListItemText
            primary={`${data.date.hijri.weekday.ar} (weekday : ${data.date.hijri.weekday.en})`}
          />
        </ListItem>
        <Divider />

        <ListItem button alignItems="center">
          <ListItemText
            primary={`${data.date.hijri.month.ar} (month : ${data.date.hijri.month.en})`}
          />
        </ListItem>

        <Divider />

        <ListItem button alignItems="center">
          <ListItemText
            primary={`${data.date.hijri.designation.expanded} (${data.date.hijri.designation.abbreviated})`}
          />
        </ListItem>
      </List>
    </>
  );
};

export default Metadata;
