import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useDualApproval = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { applicationId: string; discordUserId?: string }) => {
      const response = await axios.post('/api/admin/approve-member', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membership-applications'] });
    }
  });
};