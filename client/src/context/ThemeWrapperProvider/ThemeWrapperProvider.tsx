import { ThemeProvider } from "@mui/material/styles";

// Themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

import { useUIContext } from "context/UIProvider";

const ThemeWrapperProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { isDarkMode }
  } = useUIContext();

  return (
    <ThemeProvider theme={isDarkMode ? themeDark : theme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapperProvider;
