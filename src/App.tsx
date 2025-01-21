import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Layout } from "./pages/layout";
import { MonthlyReport } from "./pages/monthly";
import { DailyReport } from "./pages/daily";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
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
