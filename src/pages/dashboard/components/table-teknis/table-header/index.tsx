import { Table } from "@mantine/core";
import styles from "./index.module.css";
import { mapSectionReportType } from "../../../../components/modal-add-reports/map-section-report-type";

export const TableHeader = () => {
  return (
    <Table.Thead className={styles.table_head}>
      <Table.Tr>
        {mapSectionReportType["Teknis"].map((each) => (
          <Table.Th>{each}</Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
};
