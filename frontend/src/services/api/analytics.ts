import { apiClient } from './client';
import { AnalyticsResponse } from '../../types/api';

export const analyticsService = {
  getAnalytics: async (): Promise<AnalyticsResponse> => {
    const response = await apiClient.get<AnalyticsResponse>('/api/analytics');
    return response.data;
  }
};
