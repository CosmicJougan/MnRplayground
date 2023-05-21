export const initialLoginState = {
  userName: "Login",
  userEmail: "",
  userId: "",
  isAdmin: false,
  isAuthenticated: false,
  error: "",
};

export default function LoginReducer(state, action) {
  switch (action.type) {
    case "INIT_LOGIN_STATE":
      return action.value;
    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.userName,
      };
    case "SET_USER_EMAIL":
      return {
        ...state,
        userEmail: action.userEmail,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.userId,
      };
    case "SET_LOGIN_STATE":
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    case "SET_USER_ADMIN":
      return {
        ...state,
        isAdmin: action.isAdmin,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };

    default:
      throw Error("Unknown action.");
  }
}
