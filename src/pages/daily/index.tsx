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

  console.log("🦆 ~ DailyReport ~ reports:", reports);
  const fetchReports = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/get-all/1`);
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

  const rows = reports.map((report) => (
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
      <Table.Td>{report.documentation ? "Yes" : "No"}</Table.Td>
    </Table.Tr>
  ));

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
          <Button onClick={() => toggleForm()}>Tombol</Button>
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
