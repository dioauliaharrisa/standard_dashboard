export type Report = {
  id: string;
  date: string; // ISO string format (e.g., "2024-01-29T12:00:00.000Z")
  section: string;
  reportType: string;
  personnels: string[]; // Array of personnel names
  outputReport: string;
  documentation?: string | null; // URL or file path (nullable)
};
