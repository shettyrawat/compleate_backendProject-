import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const theme = 'dark'; // Always dark

    useEffect(() => {
        document.body.setAttribute('data-theme', 'dark');
    }, []);

    const toggleTheme = () => {
        // Disabled for forced dark mode
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
