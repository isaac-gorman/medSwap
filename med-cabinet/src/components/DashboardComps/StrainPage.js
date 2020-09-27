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
  // background: yellow;
  display: flex;
  // justify-content: center;
  // align-items: center;
`;

const LeftWrapper = styled.div`
  margin-left: 100px;
  width: 50%;
  // height: 90%;
  // background: blue;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
`;

const RightWrapper = styled.div`
  width: 50%;
  height: 90%;
  // background: lightblue;
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
  // background: yellow;
  font-family: "AGaramondPro-Bold";
  font-size: 64px;
  margin-top: 0px;
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
  font-family: "Gotham-Book";
  font-size: 12px;
  font-size: 0.75em;
  &:hover {
    color: #9ab8e9;
  }
  &:active {
    color: #4285f4;
  }
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
  // background: yellow;
`;

const ImageDiv = styled.div``;

const StrainImage = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 20px;
`;

const StrainDetailHeading = styled.h6`
  margin-top: 0px;
  margin-bottom: 10px;
  font-family: "Gotham-Book";
  font-size: 14px;
`;

const StrainDetailText = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  width: 320px;
  font-family: "Gotham-Light";
  font-size: 14px;
`;

const StrainRatingText = styled.h6`
  margin-top: 0px;
  margin-bottom: 0px;
  width: 320px;
  font-family: "Gotham-Medium";
  font-size: 32px;
`;

const SectionDivider = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  width: 80%;
  // height: 0px;
  border-bottom: 0.1px solid #bdbdbd;
  // border-radius: 20px;
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
                      {/* <StrainImage src={savedStrainIcon} alt="strain icon" /> */}
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
                <SectionDivider />
                <StrainDetailHeading>Effects</StrainDetailHeading>
                <StrainDetailText>{item.Positive_Effects}</StrainDetailText>
                <SectionDivider />
                <StrainDetailHeading>Treatment Reviews</StrainDetailHeading>
                <StrainRatingText>{item.Rating}</StrainRatingText>
                <SectionDivider />
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
