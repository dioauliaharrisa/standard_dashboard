import { Button, Divider, Group, Modal, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { FormAddSchedule } from "./types";

const API_BASE_URL = "http://localhost:3000";

export const ModalAddSchedule = (props: {
  shouldShowForm: boolean;
  toggleForm: () => void;
}) => {
  const form = useForm({
    initialValues: {
      date: new Date(),
      details: "",
    },
    validate: {},
  });

  const handleSubmit = async (values: FormAddSchedule) => {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <Modal
      opened={props.shouldShowForm}
      onClose={props.toggleForm}
      title="Form"
      centered
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <DatePickerInput
          key={form.key("date")}
          label="Tanggal"
          placeholder="Pick date"
          {...form.getInputProps("date")}
        />
        <Textarea
          key={form.key("details")}
          label="Input label"
          placeholder="Input placeholder"
          {...form.getInputProps("details")}
        />
        <Divider my="md" />
        <Group justify="flex-end">
          <Button type="submit">Buat</Button>
        </Group>
      </form>
    </Modal>
  );
};
