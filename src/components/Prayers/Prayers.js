import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";
import Prayer from "./Prayer";
import "./prayers.css";
import Timer from "../Timer";
import { getJustPrayers } from "../../utils";
import { useRenderCounts } from "../../hooks/api-hooks";
import Accordion from "../Accordion";
import Metadata from "./Metadata";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    color: green[500]
  },
  secondary: {
    color: "#4caf50"
  }
}));

const Prayers = props => {
  useRenderCounts("Prayers.js");
  const { prdata: data } = props;
  const [expanded, setExpanded] = useState(false);

  const {
    data: { timings }
  } = data;
  const [onlyPrayers, setOnlyPrayers] = useState({});
  useEffect(() => {
    if (timings.hasOwnProperty("Fajr")) {
      let justPrayers = getJustPrayers({ timings: timings });
      setOnlyPrayers(justPrayers);
    }
  }, [timings]);
  // const [data, setData] = usePrayer('Amsterdam');

  const { data: prayerdata, code, status } = data;
  console.log("PDATA", prayerdata);
  const classes = useStyles();
  // useEffect(() => {
  //     if (prayerdata && Object.keys(prayerdata).length) {
  //         //localStorage.setItem()
  //         //throw new Error('Uncaught');
  //     }

  // })

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <div className="pdnContainer">
        {onlyPrayers.hasOwnProperty("Fajr") && <Timer prayers={onlyPrayers} />}
        {typeof data === "object" &&
        code === 200 &&
        Object.keys(prayerdata).length ? (
          <>
            <Grow in={true}>
              <div>
                <Accordion
                  title={prayerdata.date.hijri.month.ar}
                  secondaryTitle="Hijri"
                  key="{index}"
                  expanded={expanded}
                  setExpanded={setExpanded}
                >
                  <div className="metadata-container">
                    <Metadata data={prayerdata} />
                    {/* {JSON.stringify(prayerdata.date.hijri)} */}
                  </div>
                </Accordion>
                <Prayer pdata={prayerdata} />
              </div>
            </Grow>
          </>
        ) : (
          <CircularProgress className={classes.progress} color="secondary" />
        )}
      </div>
    </Slide>
  );
};

export default Prayers;
