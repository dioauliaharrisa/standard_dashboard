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
      const response = await fetch(`${API_BASE_URL}/report/get-all`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setReports(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const bufferToBase64 = (buffer) => {
    // Ensure the buffer is an array of bytes
    const uint8Array = new Uint8Array(buffer.data);

    // Convert the Uint8Array to a binary string
    let binaryString = "";
    uint8Array.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });

    // Convert the binary string to base64
    return `data:image/jpeg;base64,${btoa(binaryString)}`;
  };

  const bufferToBlobUrl = (buffer, mimeType) => {
    const blob = new Blob([new Uint8Array(buffer.data)], { type: mimeType });
    return URL.createObjectURL(blob);
  };

  const handleShowFile = (buffer, details) => {
    console.log("🦆 ~ handleShowFile ~ buffer, details:", buffer);

    const imageUrl = bufferToBase64(buffer);
    console.log("🦆 ~ handleShowFile ~ imageUrl:", imageUrl);

    if (details.mimetype.startsWith("image/")) {
      return (
        <img
          src={imageUrl}
          alt="Preview"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      );
    }
    const blobUrl = bufferToBlobUrl(buffer, details.mimetype);
    return (
      <a href={blobUrl} download={details.name}>
        Download {details.name}
      </a>
    );
  };

  const rows = reports.map((report) => {
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
        <Table.Td>
          {report.documentation
            ? handleShowFile(report.documentation, report.documentation_details)
            : "No"}
        </Table.Td>
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
