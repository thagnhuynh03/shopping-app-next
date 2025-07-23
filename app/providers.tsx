"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactElement } from "react";
import { AuthContext } from "./auth/auth-context";
import { ConfigProvider, theme } from "antd";

interface ProviderProps {
  children: ReactElement[];
  authenticated: boolean;
}

export default function Providers({ children, authenticated }: ProviderProps) {
  return (
    <AppRouterCacheProvider>
      {/* <ThemeProvider theme={}> */}
      <ConfigProvider theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
            
        },
        components: {
          Button: {
            defaultHoverBorderColor: "#8a745c",
            defaultHoverColor: "#8a745c"
          }
        }
      }}>
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
        </ConfigProvider>
      {/* </ThemeProvider> */}
    </AppRouterCacheProvider>
  );
}