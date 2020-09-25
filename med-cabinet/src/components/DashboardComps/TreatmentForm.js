import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CustomAccordian from "./CustomAccordian";
import { addTreatment } from "../../store/actions/treatmentFormActions";
import { FormControlLabel, List, Typography } from "@material-ui/core";

import styled from "styled-components";

const FormContainer = styled.div`
  width: 40vw;
  // background: #f2f2f2;
  border-top: 0.75px solid #bdbdbd;
  border-right: 0.75px solid #bdbdbd;
  border-bottom: 0.75px solid #bdbdbd;
`;

// object of array to help properly sort the accordian lists
const themes = [
  {
    name: "Physical",
    properties: [
      "fatigue",
      "headache",
      "headaches",
      "inflammation",
      "seizures",
      "eye pressure",
      "nausea",
      "lack of appetite",
    ],
  },
  {
    name: "Muscle Pain",
    properties: ["cramps", "pain", "spasticity", "muscle spasms"],
  },
  {
    name: "Mental",
    properties: ["stress", "insomnia", "depression"],
  },
];

const TreatmentForm = ({ symptoms, addTreatment }) => {
  const [formValues, setFormValues] = useState(symptoms);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const submitHandler = (evt) => {
    evt.preventDefault();
    const symptomsString = Object.keys(formValues).reduce((o, key) => {
      formValues[key] === true && (o[key] = formValues[key]);
      return o;
    }, {});
    const info = {
      symptoms: Object.keys(symptomsString).join(", ").toString(),
    };
    addTreatment(info);
  };

  const checkHandler = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <FormContainer>
      <List
        className="treatment-form-div"
        style={{
          height: "100%",
          overflow: "auto",
          width: "80%",
          padding: "20px",
          marginBottom: "100px",
        }}
      >
        <h6>What do you want to treat?</h6>
        <form style={{ width: "100%" }}>
          {themes.map((theme) => (
            <CustomAccordian
              properties={theme.properties}
              name={theme.name}
              checkHandler={checkHandler}
              formValues={formValues}
            />
          ))}
          <Button
            variant="contained"
            color="secondary"
            id="treatment-form-button"
            onClick={submitHandler}
            style={{
              height: "40px",
              width: "100%",
              fontSize: ".65em",
            }}
          >
            {" "}
            Suggest Strains
          </Button>
        </form>
      </List>
    </FormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    symptoms: state.symptoms,
    clickSymptoms: state.clickSymptoms,
  };
};

export default connect(mapStateToProps, { addTreatment })(TreatmentForm);
