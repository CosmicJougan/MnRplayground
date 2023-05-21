// import React, { createContext, useEffect, useReducer } from "react";
// import LoginReducer from "./Reducer";

// const initialState = {
//   userName: "Login",
//   isAuthenticated: false,
//   error: "",
// };

// const Store = ({ children }) => {
//   const [state, dispatch] = useReducer(LoginReducer, initialState, (initial) => {
//     userName: JSON.parse(localStorage.getItem("userName"),
//     isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated"),
//     error: ''
//   });

//   useEffect(() => {
//     localStorage.setItem("userName", JSON.stringify(state.userName));
//     localStorage.setItem(
//       "isAuthenticated",
//       JSON.stringify(state.isAuthenticated)
//     );
//   }, [state]);

//   return (
//     <UserContext.Provider value={[state, dispatch]}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const UserContext = createContext(initialState);
// export default Store;
