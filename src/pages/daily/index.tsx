import { Button, Group, Pagination, Paper, Table, Text } from "@mantine/core";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { ModalAddReport } from "../components/modal-add-reports";
import { Report } from "./types";

const API_BASE_URL = "http://localhost:3000";

export const DailyReport = () => {
  const ITEMS_PER_PAGE = 5;

  const [reports, setReports] = useState<Report[]>([]);
  const [shouldShowForm, setShouldShowForm] = useState(false);

  const [pagination, setPagination] = useState<number>(1);

  const totalPaginationNumber = Math.ceil(reports.length / ITEMS_PER_PAGE) || 1;

  const toggleForm = () => {
    setShouldShowForm(!shouldShowForm);
  };

  const paginatedReports = reports.slice(
    (pagination - 1) * ITEMS_PER_PAGE,
    pagination * ITEMS_PER_PAGE
  );

  const fetchReports = async () => {
    try {
      const storedAuth = localStorage.getItem("auth");
      const auth = storedAuth ? JSON.parse(storedAuth) : null;
      const userId = auth?.id || "";
      const role = auth?.role || "PEGAWAI";

      const response = await fetch(`${API_BASE_URL}/report/get-all`, {
        method: "POST", // Change to POST to send a request body
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, role: role }), // Modify as needed
      });
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

  const bufferToBase64 = (buffer: ArrayBuffer | { data: number[] }): string => {
    // Ensure the buffer is an array of bytes
    const uint8Array =
      buffer instanceof ArrayBuffer
        ? new Uint8Array(buffer)
        : new Uint8Array(buffer.data);

    // Convert the Uint8Array to a binary string
    let binaryString = "";
    uint8Array.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });

    // Convert the binary string to base64
    return `data:image/jpeg;base64,${btoa(binaryString)}`;
  };

  const bufferToBlobUrl = (
    buffer: ArrayBuffer | { data: number[] },
    mimeType: string
  ): string => {
    // Ensure the buffer is correctly converted to Uint8Array
    const uint8Array =
      buffer instanceof ArrayBuffer
        ? new Uint8Array(buffer)
        : new Uint8Array(buffer.data);

    // Create a Blob from the buffer and generate an object URL
    const blob = new Blob([uint8Array], { type: mimeType });
    return URL.createObjectURL(blob);
  };

  const handleShowFile = (
    buffer: ArrayBuffer | { data: number[] },
    details: { mimetype: string; name: string }
  ) => {
    if (!buffer) return "No file available";
    const imageUrl = bufferToBase64(buffer);

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

  const rows = paginatedReports.map((report) => {
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
            : "No file"}
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
            value={pagination}
            onChange={setPagination}
            className={styles.pagination}
            total={totalPaginationNumber}
            siblings={1}
            boundaries={1}
          />
        </div>
      </Paper>
    </>
  );
};
