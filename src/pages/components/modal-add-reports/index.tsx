import {
  Button,
  Divider,
  FileInput,
  Group,
  Modal,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

import { FormValues } from "./types";
import { personnels } from "./list-personnel-names";

const API_BASE_URL = "http://localhost:3000";

export const ModalAddReport = (props: {
  shouldShowForm: boolean;
  toggleForm: () => void;
  setValue: React.Dispatch<React.SetStateAction<Date | null>>;
  value: Date | null;
}) => {
  const form = useForm({
    initialValues: {
      date: new Date(),
      section: "",
      personnels: [],
      outputReport: "",
      documentation: null,
      reportDetails: {
        type: "",
        upiName: "",
        scopeOfWork: "",
        numberHACCP: "",
      },
    },

    validate: {},
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add all form fields to FormData
      formData.append("date", values.date ? values.date.toISOString() : "");
      formData.append("section", values.section);
      formData.append("personnels", values.personnels.join(",")) ?? "";
      formData.append("outputReport", values.outputReport);
      formData.append("reportDetails", JSON.stringify(values.reportDetails));
      if (values.documentation) {
        formData.append("documentation", values.documentation);
      }

      return console.log(form.values);

      // Make API request
      const response = await fetch(`${API_BASE_URL}/report/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const data: CreateReportResponse = await response.json();

      // Close the modal
      // props.toggleForm();

      // Optionally reset the form
      // form.reset();
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };
  const section = form.values.section;

  const mapSectionReportType = {
    Teknis: [
      "Inspeksi HACCP",
      "Suveillance HACCP",
      "Inspeksi SKP",
      "CPIB",
      "CPIB Kapal",
      "CPOIB",
      "CDOIB",
      "CPPIB",
      "CBIB",
      "SKP",
      "SPDI",
    ],
    Dukman: ["TU Kepegawaian", "Keuangan", "RTP"],
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
        <Select
          key={form.key("section")}
          label="Bagian"
          placeholder="Pilih bagian"
          data={[
            "Teknis",
            "Dukman",
            "Tiket Pelayanan",
            "Monitoring Kebersihan",
          ]}
          {...form.getInputProps("section")}
        />
        {["Teknis", "Dukman"].includes(section) && (
          <Select
            key={form.key("reportDetails.type")}
            label="Jenis Laporan"
            placeholder="Pilih jenih laporan"
            data={mapSectionReportType[section]}
            {...form.getInputProps("reportDetails.type")}
          />
        )}
        {section === "Teknis" && (
          <Select
            key={form.key("reportDetails.upiName")}
            label="Nama upi"
            placeholder="Pilih jenih laporan"
            data={["A", "B", "C", "D"]}
            {...form.getInputProps("reportDetails.upiName")}
          />
        )}
        {section === "Teknis" && (
          <Select
            key={form.key("reportDetails.scopeOfWork")}
            label="Ruang lingkup"
            placeholder="Pilih jenih laporan"
            data={["A", "B", "C", "D"]}
            {...form.getInputProps("reportDetails.scopeOfWork")}
          />
        )}
        {section === "Teknis" && (
          <TextInput
            key={form.key("numberHACCP")}
            label="No HACCP"
            placeholder="Pilih jenih laporan"
            {...form.getInputProps("reportDetails.numberHACCP")}
          />
        )}
        <MultiSelect
          label="Personil"
          placeholder="Search value"
          data={personnels}
          nothingFoundMessage="Nothing found..."
          {...form.getInputProps("personnels")}
        />

        <TextInput
          key={form.key("outputReport")}
          label="Laporan Output"
          placeholder="Input placeholder"
          {...form.getInputProps("outputReport")}
        />
        <FileInput
          key={form.key("documentation")}
          label="Dokumentasi"
          placeholder="Unggah dokumentasi"
          {...form.getInputProps("documentation")}
        />
        <Divider my="md" />
        <Group justify="flex-end">
          <Button
          // onClick={() => toggleForm()}
          >
            Batalkan
          </Button>
          <Button type="submit">Buat</Button>
        </Group>
      </form>
    </Modal>
  );
};
