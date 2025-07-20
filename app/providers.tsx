"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactElement } from "react";
import { AuthContext } from "./auth/auth-context";

interface ProviderProps {
  children: ReactElement[];
  authenticated: boolean;
}

export default function Providers({ children, authenticated }: ProviderProps) {
  return (
    <AppRouterCacheProvider>
      {/* <ThemeProvider theme={}> */}
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      {/* </ThemeProvider> */}
    </AppRouterCacheProvider>
  );
}