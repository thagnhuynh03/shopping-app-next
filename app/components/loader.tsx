"use client";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Backdrop open sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}