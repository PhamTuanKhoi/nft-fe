import React, { useEffect } from "react";

const ThemeContext = React.createContext({ theme: "light", undefined });

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "dark"
  );
  useEffect(() => {
    const themeStorage = localStorage.getItem("theme");
    document.body.classList.add(themeStorage);
    setTheme(themeStorage);
  }, []);
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.classList.remove(theme === "light" ? "dark" : "light");
    document.body.classList.add(theme);
    // setCookie("styleCookieName", isDarkMode ? "dark" : "light", 365);
  }
  localStorage.setItem("theme", theme, 365);
  document.body.classList.replace(theme === "dark" ? "light" : "dark", theme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
