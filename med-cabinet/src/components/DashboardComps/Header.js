import React from "react";
import styled from "styled-components";
import medSwap from "./assets/medSwap.svg";
import user from "./assets/user.svg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  width: 100vw;
  height: 70px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ComponentWrapper = styled.div`
  width: 95%;
  height: 40px;
  // background: #f3f3f3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // align-self: flex-end;
`;

const Logo = styled.img`
  width: 100px;
  // flex-grow: 7;
  // height: 20px;
  // margin-left: 40px;
`;

const Profile = styled.img`
  width: 40px;
  // flex-grow: 1;
  // align-self: center;
  // height: 20px;
  // margin-left: 40px;
`;

const Header = ({ id }) => {
  return (
    <HeaderContainer>
      <ComponentWrapper>
        <Logo src={medSwap} alt="" />
        <Link to={`/profile/${id}`}>
          <Profile src={user} alt="profile-img" />
        </Link>
      </ComponentWrapper>
    </HeaderContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps, {})(Header);
