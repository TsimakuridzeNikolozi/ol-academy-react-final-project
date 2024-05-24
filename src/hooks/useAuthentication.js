import { useContext } from "react";
import AuthenticationContext from "../store/AuthenticationStore";

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      "useAuthenticationContext must be used within an AuthenticationProvider"
    );
  }
  return context;
};
