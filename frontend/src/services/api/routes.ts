import api from "./client";
import { AnalyzeRouteRequest, AnalyzeRouteResponse } from '../../types/api';

// Original service object for the dashboard
export const routeService = {
  analyzeRoute: async (data: AnalyzeRouteRequest): Promise<AnalyzeRouteResponse> => {
    const response = await api.post<AnalyzeRouteResponse>('/api/routes/analyze', data);
    return response.data;
  },
  
  getSafetyScore: async (): Promise<{ score: number }> => {
    const response = await api.get('/api/routes/safety-score');
    return response.data;
  },

  getPrediction: async (): Promise<{ prediction: string }> => {
    const response = await api.get('/api/routes/prediction');
    return response.data;
  }
};

// Requested standalone function for the test page
export async function analyzeRoute() {
  const response = await api.post("/api/routes/analyze", {
    source: {
      lat: 20.2961,
      lng: 85.8245,
    },
    destination: {
      lat: 20.301,
      lng: 85.84,
    },
  });

  return response.data;
}
