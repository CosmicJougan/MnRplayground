import React, {
  createContext,
  useEffect,
  useContext,
  useMemo,
  useReducer,
} from "react";
import LoginReducer, { initialLoginState } from "./LoginReducer";

export const LoginContext = createContext(initialLoginState);

export default function LoginWrapper({ children }) {
  const [state, dispatch] = useReducer(LoginReducer, initialLoginState);

  const contextValue = useMemo(() => {
    return [state, dispatch];
  }, [state, dispatch]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loginState"))) {
      dispatch({
        type: "INIT_LOGIN_STATE",
        value: JSON.parse(localStorage.getItem("loginState")),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialLoginState) {
      localStorage.setItem("loginState", JSON.stringify(state));
    }
  }, [state]);

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
