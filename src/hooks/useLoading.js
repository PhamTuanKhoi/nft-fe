import { useContext } from "react";
import { loadingContext } from "../contexts/loaddingContext";

export const useLoading = () => {
  return useContext(loadingContext);
};
