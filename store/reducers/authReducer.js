import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/authAction";

const initialState = {
  token: null,
  userId: null,
  didTryAL: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAL: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAL: true,
      };
    case LOGOUT:
      return {
        initialState,
      };
    /* case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      }; */
    default:
      return state;
  }
};
