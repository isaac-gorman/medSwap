import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import TreatmentForm from "./TreatmentForm";

import SavedStrains from "./SavedStrains";
import RecommendedStrains from "./RecommendedStrains";

const DashboardContainer = styled.div`
  width: 100vw;
  // height: 100vh;
  // background: #ffeaea;
`;

const DashComponents = styled.div`
  display: flex;
`;

const StrainContainer = styled.div`
  width: 60vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  // background: #e0e0e0;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header />
      <DashComponents>
        <TreatmentForm />
        <StrainContainer>
          <SavedStrains />
          <RecommendedStrains />
        </StrainContainer>
      </DashComponents>
    </DashboardContainer>
  );
};

export default Dashboard;
