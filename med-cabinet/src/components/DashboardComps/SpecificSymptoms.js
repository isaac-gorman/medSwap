import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import AccordianDetails from "@material-ui/core/AccordionDetails";
import { FormControlLabel } from "@material-ui/core";

const SpecificSymptoms = ({ symptoms, checkHandler }) => {
  const [isChecked, setIsChecked] = useState(false);

  const clickHandler = (evt) => {
    evt.preventDefault();
    setIsChecked(!isChecked);
    const { name, value } = evt.target;
    if (value === "true") {
      checkHandler(name, false);
    } else {
      checkHandler(name, true);
    }
  };

  return (
    <AccordianDetails className="treatment-form">
      <FormControlLabel
        label={symptoms}
        labelPlacement="end"
        control={
          <Checkbox
            className="form-input"
            type="checkbox"
            color="secondary"
            name={symptoms}
            value={isChecked}
            checked={isChecked}
            onClick={clickHandler}
          />
        }
      />
    </AccordianDetails>
  );
};

export default SpecificSymptoms;
