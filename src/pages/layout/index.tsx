import { Card, NavLink, Paper, Text } from "@mantine/core";
// import { IconGauge, IconFingerprint } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Outlet } from "react-router";

export const Layout: React.FC = () => {
  const [active, setActive] = useState(0);
  const data = [
    {
      // icon: IconGauge,
      label: "Dashboard",
      href: "dashboard",
    },
    {
      // icon: IconFingerprint,
      label: "Laporan Harian",
      href: "daily",
    },
    {
      // icon: IconFingerprint,
      label: "Laporan Bulanan",
      href: "monthly",
    },
  ];

  const [userName, setUserName] = useState<string | null>(null);

  const items = data.map((item, index) => (
    <NavLink
      href={item.href}
      key={item.label}
      active={index === active}
      label={item.label}
      // leftSection={<item.icon size={16} stroke={1.5} />}
      onClick={() => setActive(index)}
      className={styles.navlink}
    />
  ));

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      setUserName(parsedAuth.name);
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <Paper shadow="xs" className={styles.sidebar}>
        {items}
      </Paper>
      <div className={styles.page}>
        <Card className={styles.header}>
          <Text>Hello, {userName || "Guest"}</Text>
        </Card>
        <Outlet />
      </div>
    </div>
  );
};
