import {
  ADD_TREATMENT,
  ADD_TREATMENT_SUCCESS,
  ADD_TREATMENT_ERROR,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERROR,
  DELETE_PROFILE,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_ERROR,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SAVE_STRAIN_SUCCESS,
  DELETE_STRAIN_SUCCESS,
} from "../actions";

const initialState = {
  email: "",
  password: "",
  error: "",
  isFetching: false,
  savedStrains: [],
  id: "",
  symptoms: {
    cramps: false,
    depression: false,
    "eye pressure": false,
    fatigue: false,
    headache: false,
    headaches: false,
    inflammation: false,
    insomnia: false,
    "lack of appetite": false,
    "muscle spasms": false,
    nausea: false,
    pain: false,
    seizures: false,
    spasticity: false,
    stress: false,
  },
  recommendedStrain: null,
};

export const reducer = (state = initialState, action) => {
  console.log("ACTION FROM OUR REDUCER ===>", action);
  switch (action.type) {
    case ADD_TREATMENT:
      return {
        ...state,
        isFetching: true,
        recommendedStrain: 0,
      };
    case ADD_TREATMENT_SUCCESS:
      console.log(
        "I am the value of the state after a ADD_TREATMENT_SUCCESS ",
        action.payload
      );
      return {
        ...state,
        id: state.id,
        isFetching: false,
        symptoms: {
          ...state.symptoms,
          action,
        },
        error: "",
        recommendedStrain: action.payload,
      };
    case ADD_TREATMENT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        isFetching: true,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        error: "",
        isFetching: false,
      };
    case EDIT_PROFILE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      };
    case DELETE_PROFILE:
      console.log(action.payload);
      return {
        ...state,
        username: action.payload,
        password: action.payload,
        isFetching: true,
      };
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        username: action.payload,
        password: action.payload,
        isFetching: false,
      };
    case DELETE_PROFILE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      };
    case LOGIN_USER:
      console.log("LOGIN_USER ===>", action.payload);
      return {
        ...initialState,
        isFetching: true,
      };
    case LOGIN_USER_SUCCESS:
      console.log("LOGIN_USER_SUCCESS ===>", action.payload);
      return {
        ...initialState,
        email: action.payload.email,
        password: action.payload.password,
        id: action.payload.id,
        error: "",
        isFetching: false,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      };
    case REGISTER_USER:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        id: action.payload.id,
        error: "",
        isFetching: false,
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      };
    case SAVE_STRAIN_SUCCESS:
      const newSavedStrain = action.payload;
      return {
        ...state,
        // savedStrains: [...state.savedStrains, newSavedStrain],
        savedStrains: [...state.savedStrains, newSavedStrain],
      };
    case DELETE_STRAIN_SUCCESS:
      const removedStrain = action.payload;
      console.log("I am removed strain", removedStrain);
      const filteredStrains = state.savedStrains.filter((item) => {
        return item.id !== Number(removedStrain);
      });
      console.log("I am filtred strains", filteredStrains);
      return {
        ...state,
        savedStrains: filteredStrains,
      };

    default:
      return state;
  }
};
