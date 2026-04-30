import GlobalStyle from "./styles/GlobalStyle.tsx";
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "./styles/theme.ts";
import { RouterProvider } from "react-router";
import GetRouter from "./router/GetRouter.tsx";
import { ThemeContext, type ThemeType } from "./contexts/theme/ThemeContext.ts";
import { useEffect, useState } from "react";

function App() {
    const [theme, setTheme] = useState<ThemeType>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark" ? "dark" : "light";
    });

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
                <GlobalStyle />
                <RouterProvider router={GetRouter} />
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;
