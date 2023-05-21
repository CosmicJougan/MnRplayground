import { useLoginContext } from "context/LoginContext";
import React from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ routeName, children }) {
  const [state, dispatch] = useLoginContext();

  if (!state.isAuthenticated) {
    return (
      <div>
        <Navigate to="/login" />
      </div>
    );
  }
  return children;
}
