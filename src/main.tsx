import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { theme } from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./pages/layout";
import { MonthlyReport } from "./pages/monthly";
import { DailyReport } from "./pages/daily";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import ProtectedRoute from "./pages/components/protected-route";
import { AuthProvider } from "./pages/components/auth";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
            children: [],
          },
          {
            path: "/daily",
            element: <DailyReport />,
            children: [],
          },
          {
            path: "/monthly",
            element: <MonthlyReport />,
            children: [],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
