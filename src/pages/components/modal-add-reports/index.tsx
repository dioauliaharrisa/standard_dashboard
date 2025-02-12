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

import { FormValues, Personnel } from "./types";
import { listNameUPIs } from "./list-name-upis";
import { listScopeOfWork } from "./list-scope-of-work";
import { mapSectionReportType } from "./map-section-report-type";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:3000";
export type ModalAddReportProps = {
  shouldShowForm: boolean;
  toggleForm: () => void;
  fetchReports: () => Promise<void>;
  setValue?: React.Dispatch<React.SetStateAction<Date | null>>;
  value?: Date | null;
};

export const ModalAddReport = (props: ModalAddReportProps) => {
  const form = useForm({
    initialValues: {
      date: new Date(),
      section: "",
      personnels: [],
      documentation: null,
      reportDetails: {
        type: "",
        upiName: "",
        scopeOfWork: "",
        numberHACCP: "",
        outputReport: "",
      },
    },

    validate: {},
  });

  const [personnels, setPersonnels] = useState<Personnel[]>([]);

  const fetchPersonnels = async () => {
    try {
      const storedAuth = localStorage.getItem("auth");
      const auth = storedAuth ? JSON.parse(storedAuth) : null;
      console.log("🦆 ~ fetchPersonnels ~ auth:", auth);
      const userId = auth?.id || "";
      const role = auth?.role || "PEGAWAI";

      const response = await fetch(`${API_BASE_URL}/report/get-personnels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setPersonnels(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPersonnels();
  }, []);

  const handleSubmit = async (values: FormValues) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add all form fields to FormData
      formData.append("date", values.date ? values.date.toISOString() : "");
      formData.append("section", values.section);
      formData.append("personnels", values.personnels.join(",")) ?? "";
      formData.append("reportDetails", JSON.stringify(values.reportDetails));
      if (values.documentation) {
        formData.append("documentation", values.documentation);
      }

      // return console.log(form.values);

      // Make API request
      const response = await fetch(`${API_BASE_URL}/report/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      props.fetchReports();

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
            "Piket Pelayanan",
            "Monitoring Kebersihan",
          ]}
          {...form.getInputProps("section")}
        />
        {["Teknis", "Dukman"].includes(section) && (
          <Select
            key={form.key("reportDetails.type")}
            label="Jenis Laporan"
            placeholder="Pilih jenih laporan"
            data={mapSectionReportType?.[section]}
            {...form.getInputProps("reportDetails.type")}
          />
        )}
        {section === "Teknis" && (
          <Select
            key={form.key("reportDetails.upiName")}
            label="Nama upi"
            placeholder="Pilih jenih laporan"
            data={listNameUPIs}
            {...form.getInputProps("reportDetails.upiName")}
          />
        )}
        {section === "Teknis" && (
          <Select
            key={form.key("reportDetails.scopeOfWork")}
            label="Ruang lingkup"
            placeholder="Pilih jenih laporan"
            data={listScopeOfWork}
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
          {...form.getInputProps("reportDetails.outputReport")}
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
