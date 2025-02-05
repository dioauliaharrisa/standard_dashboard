import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Calendar } from "@mantine/dates";
import { Alert, Button, Text } from "@mantine/core";
import { ModalAddSchedule } from "../components/modal-add-schedule";
import { Schedules } from "./types";
import { TableTeknis } from "./components/table-teknis";
import { TableDukman } from "./components/table-dukman";

const API_BASE_URL = "http://localhost:3000";

export const Dashboard = () => {
  const [selected, setSelected] = useState<Date[]>([]);
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const toggleForm = () => {
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
      console.log("🦆 ~ fetchTodaySchedule ~ data:", data);
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
        {schedules?.schedules?.map((each) => (
          <Text>{each.details}</Text>
        ))}
      </Alert>
      <Button onClick={() => toggleForm()}>Buat skedul</Button>
      <Calendar
        getDayProps={(date) => ({
          selected: selected.some((s) => dayjs(date).isSame(s, "date")),
          onClick: () => handleSelect(date),
        })}
      />
      <TableTeknis data={schedules.totalReportsTeknis ?? null} />
      <TableDukman data={schedules.totalReportsDukman ?? null} />
    </>
  );
};
