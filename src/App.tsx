import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./pages/layout";
import { MonthlyReport } from "./pages/monthly";
import { DailyReport } from "./pages/daily";
import { Dashboard } from "./pages/dashboard";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
  ]);

  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
