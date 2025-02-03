import { Button, Group, Pagination, Paper, Table, Text } from "@mantine/core";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { ModalAddReport } from "../components/modal-add-reports";
import { Report } from "./types";

const API_BASE_URL = "http://localhost:3000";

export const DailyReport = () => {
  const [shouldShowForm, setShouldShowForm] = useState(false);

  const toggleForm = () => {
    setShouldShowForm(!shouldShowForm);
  };

  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/get-all/1`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("🦆 ~ fetchReports ~ data:", data);
      setReports(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  function getMimeTypeFromMagicNumber(buffer) {
    const uint = new Uint8Array(buffer).subarray(0, 4);
    const header = uint.reduce(
      (str, byte) => str + byte.toString(16).padStart(2, "0"),
      ""
    );

    const signatures = {
      "89504e47": "image/png", // PNG
      ffd8ffe0: "image/jpeg", // JPEG
      ffd8ffe1: "image/jpeg", // JPEG
      ffd8ffe2: "image/jpeg", // JPEG
      ffd8ffe3: "image/jpeg", // JPEG
      ffd8ffe8: "image/jpeg", // JPEG
      "47494638": "image/gif", // GIF
      "49492a00": "image/tiff", // TIFF (little endian)
      "4d4d002a": "image/tiff", // TIFF (big endian)
      "52494646": "image/webp", // WebP
      d0cf11e0a1b11ae1: "application/vnd.ms-excel", // XLS (Binary)
      "504b0304": "application/zip", // XLSX (needs further checking)
    };

    return signatures[header] || "application/octet-stream";
  }

  const rows = reports.map((report) => {
    const bufferData = new Uint8Array(report.documentation);
    const mimeType = getMimeTypeFromMagicNumber(bufferData);
    const blob = new Blob([bufferData], { type: "application/zip" });
    const file = new File([blob], "your-file-name.zip", {
      type: "application/zip",
    });
    console.log("🦆 ~ rows ~ file:", file);
    return (
      <Table.Tr key={report.id}>
        <Table.Td>
          {new Date(report.date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Table.Td>
        <Table.Td>{report.section}</Table.Td>
        <Table.Td>{report.report.type ?? "-"}</Table.Td>
        <Table.Td>{report.personnels}</Table.Td>
        <Table.Td>{report.report.outputReport}</Table.Td>
        <Table.Td>{report.documentation ? "file" : "No"}</Table.Td>
      </Table.Tr>
    );
  });

  const [value, setValue] = useState<Date | null>(null);
  return (
    <>
      <ModalAddReport
        shouldShowForm={shouldShowForm}
        toggleForm={toggleForm}
        setValue={setValue}
        value={value}
        fetchReports={fetchReports}
      />
      <Paper className={styles.content}>
        <Group justify="space-between">
          <Text className={styles.title}>Laporan Harian</Text>
          <Button onClick={() => toggleForm()}>Buat laporan</Button>
        </Group>
        <Table className={styles.table}>
          <Table.Thead className={styles.table_head}>
            <Table.Tr>
              <Table.Th>Tanggal</Table.Th>
              <Table.Th>Bagian</Table.Th>
              <Table.Th>Jenis Laporan</Table.Th>
              <Table.Th>Personil</Table.Th>
              <Table.Th>Laporan Output</Table.Th>
              <Table.Th>Dokumentasi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className={styles.pagination_bar}>
          <Pagination
            className={styles.pagination}
            total={reports.length}
            siblings={1}
            boundaries={1}
          />
        </div>
      </Paper>
    </>
  );
};
