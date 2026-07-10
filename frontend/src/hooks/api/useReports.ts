import { useQuery } from '@tanstack/react-query';
import { reportService } from '../../services/api';
import { Report } from '../../types/api';

export const useReports = () => {
  return useQuery<Report[], Error>({
    queryKey: ['reports'],
    queryFn: () => reportService.getReports(),
  });
};
