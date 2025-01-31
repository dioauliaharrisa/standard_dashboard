import dayjs from "dayjs";
import { useState } from "react";
// import { Calendar } from "@mantine/dates";
import { Alert } from "@mantine/core";
// import { IconInfoCircle } from "@tabler/icons-react";

export const Dashboard = () => {
  const [selected, setSelected] = useState<Date[]>([]);
  // const icon = <IconInfoCircle />;
  const handleSelect = (date: Date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, "date"));
    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    }
  };
  return (
    <>
      <Alert
        variant="light"
        color="blue"
        title="Alert title"
        // icon={icon}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
        quae tempore necessitatibus placeat saepe.
      </Alert>
      {/* <Calendar
        getDayProps={(date) => ({
          selected: selected.some((s) => dayjs(date).isSame(s, "date")),
          onClick: () => handleSelect(date),
        })}
      /> */}
    </>
  );
};
