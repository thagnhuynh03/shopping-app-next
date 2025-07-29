"use client";

import { ReactElement, useContext, useEffect } from "react";
import { ConfigProvider } from "antd";
import { ThemeProviderCustom, ThemeContext } from "./theme-context";
import { darkTheme, lightTheme } from "./theme";
import { AuthContext } from "./auth/auth-context";

interface ProviderProps {
  children: ReactElement[] | ReactElement;
  authenticated: boolean;
}

function InnerProviders({
  children,
  authenticated,
}: ProviderProps) {
  const { isDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background',
      isDarkMode ? '#18181B' : '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--foreground',
      isDarkMode ? '#F4F4F5' : '#27272A'
    );
  }, [isDarkMode]);
  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AuthContext.Provider value={authenticated}>
        {children}
      </AuthContext.Provider>
    </ConfigProvider>
  );
}

export default function Providers(props: ProviderProps) {
  return (
      <ThemeProviderCustom>
        <InnerProviders {...props} />
      </ThemeProviderCustom>
  );
}
