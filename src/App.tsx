import "@mantine/core/styles.css";
// import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./pages/layout";
import { MonthlyReport } from "./pages/monthly";
import { DailyReport } from "./pages/daily";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import ProtectedRoute from "./pages/components/protected-route";
import { AuthProvider } from "./pages/components/auth";

export default function App() {
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

  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MantineProvider>
  );
}
