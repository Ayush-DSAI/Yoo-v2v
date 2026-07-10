import { apiClient } from './client';
import { Report, CreateReportRequest } from '../../types/api';

export const reportService = {
  getReports: async (): Promise<Report[]> => {
    const response = await apiClient.get<Report[]>('/api/reports');
    return response.data;
  },
  
  createReport: async (data: CreateReportRequest): Promise<Report> => {
    // Note: The prompt instructed to use multipart/form-data for image uploads via this endpoint.
    // However, if we just want a standard JSON createReport, it would look like this.
    // If the data includes an image, we should use uploadImage.
    const response = await apiClient.post<Report>('/api/reports', data);
    return response.data;
  },

  uploadImage: async (formData: FormData): Promise<Report> => {
    const response = await apiClient.post<Report>('/api/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
