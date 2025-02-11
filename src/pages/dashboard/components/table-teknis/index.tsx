import { Table } from "@mantine/core";
import { TableHeader } from "./table-header";
import styles from "./index.module.css";
import { mapSectionReportType } from "../../../components/modal-add-reports/map-section-report-type";

export const TableTeknis = ({ data }) => {
  if (!data) return null;

  const rows = mapSectionReportType["Teknis"].map((each) => {
    return <Table.Td>{data[each] ?? 0}</Table.Td>;
  });
  return (
    <Table className={styles.table}>
      <TableHeader />
      <Table.Tbody>
        <Table.Tr>{rows}</Table.Tr>
      </Table.Tbody>
    </Table>
  );
};
