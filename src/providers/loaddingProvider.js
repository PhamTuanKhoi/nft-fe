import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { loadingContext } from "../contexts/loaddingContext";
export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <loadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </loadingContext.Provider>
  );
}
