import React, { useState, useParams } from "react";
import Card from "@material-ui/core/Card";
import { CardMedia } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import {
  deleteProfile,
  editProfile,
} from "../store/actions/treatmentFormActions";
import TextField from "@material-ui/core/TextField";
import User from "./User.png";

const Profile = ({ editProfile, deleteProfile, state }) => {
  const [isClicked, setIsClick] = useState(false);
  const [editState, setEditState] = useState({
    email: state.email,
    password: state.password,
  });

  const preventDelete = (evt) => {
    evt.preventDefault();
    setIsClick(true);
  };

  const changeHandler = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setEditState({
      ...editState,
      [name]: value,
    });
  };

  const finalDelete = (evt) => {
    evt.preventDefault();
    deleteProfile(state, state.id);
  };

  const editUser = (evt) => {
    evt.preventDefault();
    editProfile(editState, state.id);
  };

  return (
    <>
      <div id={isClicked ? "gray-out-background" : null}>
        <Card
          className={isClicked ? "profile-card gray" : "profile-card"}
          id={isClicked ? "gray-out-background" : null}
          variant="outlined"
        >
          <CardMedia
            component="img"
            id={isClicked ? "img-gray-out-background" : "profile-img"}
            src={User}
          />
          <div className="profile-credentials-div">
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              color="secondary"
              placeholder={editState.email}
              name="email"
              value={editState.email}
              onChange={changeHandler}
            />

            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              color="secondary"
              placeholder={editState.password}
              name="password"
              value={editState.password}
              onChange={changeHandler}
            />

            <div>
              <span onClick={editUser} className="profile-adjustment-links">
                <EditIcon />
                <p>Edit Information</p>
              </span>
              <span
                onClick={preventDelete}
                className="profile-adjustment-links"
              >
                <DeleteIcon color="secondary" />
                <p className="delete-profile-text">Delete Account</p>
              </span>
            </div>
          </div>
        </Card>
        {isClicked && (
          <Card id="delete-are-you-sure">
            Are you sure you want to delete your profile?
            <span onClick={finalDelete}>Yes</span>
            <span onClick={() => setIsClick(false)}>No</span>
          </Card>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps, { editProfile, deleteProfile })(
  Profile
);
