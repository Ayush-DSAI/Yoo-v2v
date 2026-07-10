import { apiClient } from './client';
import { SOSResponse } from '../../types/api';

export const sosService = {
  triggerSOS: async (location: { lat: number; lng: number }): Promise<SOSResponse> => {
    const response = await apiClient.post<SOSResponse>('/api/sos', location);
    return response.data;
  }
};
