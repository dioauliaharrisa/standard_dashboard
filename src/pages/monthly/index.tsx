import { Pagination, Paper, Table, Text } from "@mantine/core";
import styles from "./index.module.css";

export const MonthlyReport = () => {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Tanggal" },
    { position: 7, mass: 14.007, symbol: "N", name: "Bagian" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Jenis Laporan" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Personil" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Laporan Output" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Dokumentasi" },
  ];
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Paper className={styles.content}>
        <Text className={styles.title}>Laporan Bulanan</Text>
        <Table className={styles.table}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Bulan</Table.Th>
              <Table.Th>Bagian</Table.Th>
              <Table.Th>Jenis Laporan</Table.Th>
              <Table.Th>Laporan Output</Table.Th>
              <Table.Th>Dokumentasi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Pagination total={10} />
      </Paper>
    </>
  );
};
