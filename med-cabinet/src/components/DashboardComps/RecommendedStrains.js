import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { saveTreatment } from "../../store/actions/treatmentFormActions";
import styled from "styled-components";
import med from "./assets/med.svg";
import loadingStrains from "./assets/loadingStrains.gif";
import saveIcon from "./assets/saveIcon.svg";

const RecommendedStrainsContainer = styled.div`
  width: 100%;
  min-height: 400px;
  // background: lightblue;
  border-bottom: 0.75px solid #bdbdbd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const NoRecStrainsContainer = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoRecIcon = styled.img`
  width: 100px;
  height: 100px;
`;

const NoStrainsText = styled.p`
  font-family: "Gotham-Book";
  color: #bdbdbd;
  font-size: 0.75em;
`;

const CalculatingText = styled.h5`
  font-family: "Gotham-Book";
  color: #e26276;
  font-size: 0.75em;
`;
const Spinner = styled.img`
  width: 60px;
  height: 60px;
`;

const CardContainer = styled.div`
  width: 80%;
  height: 600px;
  // border: 0.5px solid #bdbdbd;
  margin-top: 10px;
  margin-bottom: 100px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
`;

const RecText = styled.p`
  font-family: "Gotham-Book";
  font-size: 12px;
  margin-top: 40px;
  // width: 420px;
  // text-align: left;
`;

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
`;

const SaveButton = styled.button`
  width: 100px;
  height: 40px;
  display: flex;
  border: none;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  // background: yellow;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px -0.51px 4.48819px rgba(0, 0, 0, 0.25);
  &:hover {
    background: #f3f7f9;
  }
  &:active {
    background: #ecf9ff;
    box-shadow: inset 0px 0.49px 4.48819px rgba(0, 0, 0, 0.25);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  just
  width: 100%;
  justify-content: flex-end;
  // height: 100px;
  // background: yellow;
`;
const SaveTxt = styled.p`
  font-family: "Gotham-Book";
  font-size: 12px;
`;

const SaveIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const RecommendedStrainName = styled.h2`
  font-family: "AGaramondPro-Bold";
  font-size: 64px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const TitleInfo = styled.p`
  margin-right: 10px;
  font-family: "Gotham-Light";
  font-size: 16px;
`;

const RatingText = styled.p`
  font-family: "Gotham-Book";
  font-size: 16px;
`;

const QuickInfoDiv = styled.div`
  margin-top: 0px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // background: yellow;
`;

const RatingWrapper = styled.div`
  width: 100px;
  // margin-left: 20px;
  display: flex;
  // background: lightblue;
`;

const EffectsWrapper = styled.div`
  width: 400px;
  margin-left: 20px;
  display: flex;
  // background: lightblue;
`;

const RecommendedStrains = ({
  recommendedStrain,
  isFetching,
  saveTreatment,
  id,
}) => {
  const [savedStrain, setSavedStrain] = useState();
  console.log(id, "<============");

  useEffect(() => {
    return saveTreatment(savedStrain);
  }, [saveTreatment, savedStrain]);

  const handleClick = (e) => {
    e.preventDefault();

    delete recommendedStrain.ID;

    setSavedStrain({
      ...recommendedStrain,
      Rating: recommendedStrain.Rating.toString(),
      user_id: id,
    });

    console.log("savedStrain state", savedStrain);
  };

  // {
  //   // console.log("recommended strain", recommendedStrain);
  // }

  if (recommendedStrain === null) {
    return (
      <RecommendedStrainsContainer>
        <NoRecStrainsContainer>
          <NoRecIcon src={med} alt="No recommendation icons" />
          <NoStrainsText>
            You have 0 Recommend Strains for Treatment
          </NoStrainsText>
        </NoRecStrainsContainer>
      </RecommendedStrainsContainer>
    );
  } else if (isFetching === true && recommendedStrain === 0) {
    return (
      <RecommendedStrainsContainer>
        <NoRecStrainsContainer>
          <Spinner src={loadingStrains} alt="loading spinner" />
          <CalculatingText>Calculating Your Recommended Strain</CalculatingText>
        </NoRecStrainsContainer>
      </RecommendedStrainsContainer>
    );
  } else {
    return (
      <RecommendedStrainsContainer>
        <CardContainer>
          <RecText>Recommended Treatment</RecText>
          <CardWrapper>
            <ButtonWrapper>
              <SaveButton onClick={handleClick}>
                <SaveIcon src={saveIcon} alt="save icon" />
                <SaveTxt>Save</SaveTxt>
              </SaveButton>
            </ButtonWrapper>
            <RecommendedStrainName>
              {recommendedStrain.Name}
            </RecommendedStrainName>
            <QuickInfoDiv>
              <RatingWrapper>
                <TitleInfo>Rating</TitleInfo>
                <RatingText>{recommendedStrain.Rating}</RatingText>
              </RatingWrapper>

              <EffectsWrapper>
                <TitleInfo>Effects</TitleInfo>
                <RatingText>{recommendedStrain.Positive_Effects}</RatingText>
              </EffectsWrapper>
            </QuickInfoDiv>
          </CardWrapper>
        </CardContainer>
      </RecommendedStrainsContainer>
    );
  }
};

const mapStateToProps = (state) => {
  console.log(state, "<=========");
  return {
    recommendedStrain: state.recommendedStrain,
    isFetching: state.isFetching,
    id: state.id,
  };
};

export default connect(mapStateToProps, { saveTreatment })(RecommendedStrains);
