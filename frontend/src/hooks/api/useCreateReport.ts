import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from '../../services/api';
import { Report } from '../../types/api';

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation<Report, Error, FormData>({
    mutationFn: (formData: FormData) => reportService.uploadImage(formData),
    onSuccess: () => {
      // Invalidate and refetch reports query to show the new report
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};
