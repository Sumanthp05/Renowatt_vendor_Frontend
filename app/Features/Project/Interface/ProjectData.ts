// Interface for project creation data
export interface ProjectData {
  title: string;
  plantCapacity: string;
  estimatedCost: number;
  duration: string;
  status: string;
  invertorBrand: string;
  panelBrand: string;
  subsidyAmount: string;
  invertorId: number;
  authId: number;
  plantHealthStatus: string;
  location: string;
  serviceTypes: string[];
  vendor_id: number;
}
