export type Report = {
  id: string;
  date: string; // ISO string format (e.g., "2024-01-29T12:00:00.000Z")
  section: "Teknis" | "Dukman" | "Piket Pelayanan" | "Monitoring Kebersihan";
  personnels: string[]; // Array of personnel names
  report: { type: string; outputReport: string };
  documentation?: ArrayBuffer | { data: number[] } | null; // URL or file path (nullable)
  documentation_details: { name: string; mimetype: string };
  outputReport: string;
};
