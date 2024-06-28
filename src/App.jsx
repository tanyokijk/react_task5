import React from "react";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import UsersList from "./components/UsersList";
import styled, {
  ThemeProvider as StyledThemeProvider,
} from "styled-components";

const lightTheme = {
  background: "#fff",
  color: "#000",
};

const darkTheme = {
  background: "#333",
  color: "#fff",
};

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <AppWrapper>
        <button onClick={toggleTheme}>
          {theme === "light"
            ? "Переключити на темну тему"
            : "Переключити на світлу тему"}
        </button>
        <UsersList />
      </AppWrapper>
    </StyledThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
