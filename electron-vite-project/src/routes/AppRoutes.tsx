import React, { createContext, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';


// Define the type for your theme context
interface ThemeContextType {
  theme: string;
  changeTheme: () => void;
  setUrl: React.Dispatch<React.SetStateAction<null | string>>;
  url: null | string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  method: string;
}

// Create a strongly-typed context with the specified type
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
      </Route>
    )
  );

  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');
  const [url, setUrl] = useState<null | string>(null);
  const [method, setMethod] = useState<string>('GET');

  const changeTheme = () => {
    let newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, changeTheme, setUrl, url, method, setMethod }}
    >
      <div className="app-provider" data-theme={theme}>
        <RouterProvider router={router} />
      </div>
    </ThemeContext.Provider>
  );
}
