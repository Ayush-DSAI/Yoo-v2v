import { useMutation } from '@tanstack/react-query';
import { routeService } from '../../services/api';
import { AnalyzeRouteRequest, AnalyzeRouteResponse } from '../../types/api';

export const useAnalyzeRoute = () => {
  return useMutation<AnalyzeRouteResponse, Error, AnalyzeRouteRequest>({
    mutationFn: (data: AnalyzeRouteRequest) => routeService.analyzeRoute(data),
  });
};
