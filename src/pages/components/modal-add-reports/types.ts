export interface FormValues {
  date: Date | null;
  section: string;
  personnels: string[];
  outputReport: string;
  documentation: File | null;
  reportDetails: any;
}

export interface CreateReportRequest {
  date: Date | null;
  section: string;
  reportType: string;
  namaUpi?: string;
  ruangLingkup?: string;
  numberHACCP?: string;
  outputReport: string;
  documentation: File | null;
  personnel: string;
}

export interface CreateReportResponse {
  id: number;
  // Add other response fields as needed
}
