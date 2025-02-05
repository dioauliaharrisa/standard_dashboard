import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Calendar } from "@mantine/dates";
import { Alert, Button } from "@mantine/core";
import { ModalAddSchedule } from "../components/modal-add-schedule";
import { Schedules } from "./types";

const API_BASE_URL = "http://localhost:3000";

export const Dashboard = () => {
  const [selected, setSelected] = useState<Date[]>([]);
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const toggleForm = () => {
    console.log("🦆 ~ toggleForm ~ shouldShowForm:", shouldShowForm);
    setShouldShowForm(!shouldShowForm);
  };
  // const icon = <IconInfoCircle />;
  const handleSelect = (date: Date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, "date"));
    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    }
  };

  const [schedules, setSchedules] = useState<Schedules[]>([]);

  const fetchTodaySchedule = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/schedules/get-today-schedule`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSchedules(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodaySchedule();
  }, []);

  return (
    <>
      <ModalAddSchedule
        shouldShowForm={shouldShowForm}
        toggleForm={toggleForm}
      />
      <Alert
        variant="light"
        color="blue"
        title="Alert title"
        // icon={icon}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
        quae tempore necessitatibus placeat saepe.
      </Alert>
      <Button onClick={() => toggleForm()}>Buat skedul</Button>
      <Calendar
        getDayProps={(date) => ({
          selected: selected.some((s) => dayjs(date).isSame(s, "date")),
          onClick: () => handleSelect(date),
        })}
      />
    </>
  );
};
