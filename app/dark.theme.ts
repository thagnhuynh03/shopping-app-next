"use client"; //chỉ được render trên client

import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default darkTheme;