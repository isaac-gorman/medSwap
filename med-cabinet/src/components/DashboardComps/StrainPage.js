import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import SavedStrains from "./SavedStrains";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import saveIcon from "./assets/saveIcon.svg";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { deleteStrain } from "../../store/actions/treatmentFormActions";
import loadingStrains from "./assets/loadingStrains.gif";
import savedStrainIcon from "./assets/savedStrainIcon.svg";

// setTimeout(function () {}, 3500);

const StrainPageContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  // height: 70vh;
  background: yellow;
  display: flex;
  // justify-content: center;
  // align-items: center;
`;

const LeftWrapper = styled.div`
  margin-left: 60px;
  width: 50%;
  // height: 90%;
  background: blue;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
`;

const RightWrapper = styled.div`
  width: 50%;
  height: 90%;
  background: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // align-items: center;
`;

const LInfo = styled.div`
  width: 400px;
  height: 300px;
  background: white;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h5`
  font-family: "Gotham-Book";
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

const LoadingStrainContainer = styled.div`
  width: 100%;
  height: 70vh;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.img`
  width: 60px;
  height: 60px;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const ImageDiv = styled.div``;

const StrainImage = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 20px;
`;

const StrainDetailHeading = styled.h6`
  font-family: "Gotham-Book";
  font-size: 14px;
`;

const StrainDetailText = styled.p`
  width: 320px;
  font-family: "Gotham-Light";
  font-size: 14px;
`;

const StrainPage = ({ deleteStrain }) => {
  const [strainData, setStrainData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { id } = useParams();
  console.log("I am the value of id", typeof id);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Unsave Button Clicked!!!");
    deleteStrain(id);
  };

  useEffect(() => {
    setTimeout(function () {
      setFetching(false);
      console.log("========2========", fetching);
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
    }, 500);
    return setFetching(true);
  }, [id]);

  console.log("I am the value of strain", strainData);

  return (
    <div>
      <Header />
      <SavedStrains />
      {fetching === true ? (
        <LoadingStrainContainer>
          <Spinner src={loadingStrains} alt="loading spinner" />
        </LoadingStrainContainer>
      ) : (
        strainData.map((item) => {
          return (
            <StrainPageContainer>
              <LeftWrapper>
                <LInfo>
                  <FlexWrapper>
                    <ImageDiv>
                      <StrainImage src={savedStrainIcon} alt="strain icon" />
                    </ImageDiv>
                    <Name>{item.Name}</Name>
                  </FlexWrapper>
                  <SaveButton onClick={handleClick}>
                    <SaveTxt>Unsave Strain</SaveTxt>
                    <SaveIcon src={saveIcon} alt="save icon" />
                  </SaveButton>
                </LInfo>
              </LeftWrapper>
              <RightWrapper>
                <StrainDetailHeading>Strain Description</StrainDetailHeading>
                <StrainDetailText>{item.Description}</StrainDetailText>

                <StrainDetailHeading>Effects</StrainDetailHeading>
                <StrainDetailText>{item.Positive_Effects}</StrainDetailText>

                <StrainDetailHeading>Treatment Reviews</StrainDetailHeading>
                <StrainDetailText>{item.Rating}</StrainDetailText>
              </RightWrapper>
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
