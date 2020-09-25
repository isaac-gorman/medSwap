import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import SavedStrains from "./SavedStrains";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import saveIcon from "./assets/saveIcon.svg";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { deleteStrain } from "../../store/actions/treatmentFormActions";

const StrainPageContainer = styled.div`
  width: 100%;
  height: 70vh;
  background: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftWrapper = styled.div`
  width: 50%;
  height: 90%;
  background: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RightWrapper = styled.div`
  width: 50%;
  height: 90%;
  background: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LInfo = styled.div`
  width: 300px;
  height: 300px;
  background: white;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h5`
  font-size: 1em;
`;

const SaveButton = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // background: yellow;
`;

const SaveTxt = styled.p`
  font-size: 0.75em;
`;

const SaveIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const StrainPage = ({ deleteStrain }) => {
  const [strainData, setStrainData] = useState([]);
  const { id } = useParams();
  console.log("I am the value of id", typeof id);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Unsave Button Clicked!!!");
    deleteStrain(id);
  };

  useEffect(() => {
    axiosWithAuth()
      .get("savedstrains/")
      .then((res) => {
        console.log("I am the res within Strain Page", res.data);
        const pageData = res.data.filter((item) => {
          // console.log("I am item", item.id);
          return item.id === Number(id);
        });
        console.log("I am pageData", pageData);
        setStrainData(pageData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log("I am the value of strain", strainData);

  return (
    <div>
      <Header />
      <SavedStrains />
      {!strainData[0] ? (
        <div>...loading</div>
      ) : (
        strainData.map((item) => {
          return (
            <StrainPageContainer>
              <LeftWrapper>
                <LInfo>
                  <Name>{item.Name}</Name>
                  <SaveButton onClick={handleClick}>
                    <SaveTxt>Unsave Strain</SaveTxt>
                    <SaveIcon src={saveIcon} alt="save icon" />
                  </SaveButton>
                </LInfo>
              </LeftWrapper>
              <RightWrapper></RightWrapper>
            </StrainPageContainer>
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    savedStrains: state.savedStrains,
  };
};

export default connect(mapStateToProps, { deleteStrain })(StrainPage);
