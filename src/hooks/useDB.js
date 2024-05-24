import { useContext } from "react";
import DBContext from "../store/DBStore";

export const useDB = () => {
  const context = useContext(DBContext);
  if (!context) {
    throw new Error("useDBContext must be used within an DBProvider");
  }
  return context;
};
