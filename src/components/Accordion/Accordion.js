import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const Accordion = ({ title, secondaryTitle, keyvalue, children, expanded, setExpanded }) => {
  console.log('keyvalue', keyvalue)
  const classes = useStyles();
  console.log('EXP', expanded)
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  return (
    <ExpansionPanel
      expanded={expanded === `panel${keyvalue + 1}`}
      onChange={handleChange(`panel${keyvalue + 1}`)}
      key={keyvalue}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${keyvalue}bh-content`}
        id={`panel${keyvalue}bh-header`}
      >
        <Typography className={classes.heading}>{title}</Typography>
        <Typography className={classes.secondaryHeading}>
          {secondaryTitle}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Accordion;
