import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Accordian from "@material-ui/core/Accordion";
import AccordianDetails from "@material-ui/core/AccordionDetails";
import AccordianSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";
import SpecificSymptoms from "./SpecificSymptoms";

const CustomAccordian = ({
  checkHandler,
  formValues,
  properties,
  name,
  isChecked,
}) => {
  return (
    <Accordian>
      <AccordianSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="list of symptoms"
        id="accordian-symptoms-list"
      >
        <Typography style={{ fontSize: ".75em" }} className="accordian-title">
          {" "}
          {name}{" "}
        </Typography>
      </AccordianSummary>
      {Object.keys(formValues).map(
        (symptoms, index) =>
          properties.includes(symptoms) && (
            <SpecificSymptoms
              symptoms={symptoms}
              formValues={formValues}
              key={index}
              checkHandler={checkHandler}
            />
          )
      )}
    </Accordian>
  );
};

export default CustomAccordian;
