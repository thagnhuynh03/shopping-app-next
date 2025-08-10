import { Backdrop, CircularProgress } from "@mui/material";
import { createPortal } from "react-dom";

export default function Loader() {
  if (typeof window === "undefined") return null; // avoid SSR issues

  return createPortal(
    <Backdrop
      open
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.modal + 1, // đảm bảo cao hơn mọi thứ
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>,
    document.body // render ra toàn bộ body
  );
}
