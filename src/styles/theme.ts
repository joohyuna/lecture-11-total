import type { DefaultTheme } from "styled-components";

export const LightTheme: DefaultTheme = {
    colors: {
        background: {
            default: "#f4f6f8",
            paper: "#ffffff",
        },
        text: {
            default: "#2c3e50",
            disabled: "#9c9e9e",
        },
        divider: "#eeeeee",
        primary: "#1976d2",
        secondary: "#f39c12",
        success: "#2e7d32",
        info: "#0288d1",
        warning: "#ed6c02",
        error: "#d32f2f",
    },
};

export const DarkTheme: DefaultTheme = {
    colors: {
        background: {
            default: "#121212",
            paper: "#1e1e1e",
        },
        text: {
            default: "#e0e0e0",
            disabled: "#757575",
        },
        divider: "#333333",
        primary: "#90caf9",
        secondary: "#ffb74d",
        success: "#71c784",
        info: "#4fc3f7",
        warning: "#ffb74d",
        error: "#e57373",
    },
};