import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import queryClient from 'query-client';

import { ApiError, Feedback, UpdateVacancyParams } from 'types';

export type VacancyType = {
  _id: string;
  company: string;
  position: string;
  status: string;
  salaryRange: string;
  note?: string;
};

export const useGet = () =>
  useQuery<Array<VacancyType>>({
    queryKey: ['vacancies'],
    queryFn: async () => {
      const res = (await apiService.get('/vacancy')) as { vacancies: { results: VacancyType[] } };
      return res.vacancies.results;
    },
  });

export const useUpdate = () =>
  useMutation<Feedback, ApiError, { id: string; data: UpdateVacancyParams }>({
    mutationFn: ({ id, data }) => apiService.put(`/vacancy/${id}`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['vacancies'],
      });
    },
  });

export const useCreate = <T>() =>
  useMutation<Feedback, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/vacancy', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['vacancies'], data);
    },
  });

export const useRemove = () =>
  useMutation<Feedback, ApiError, string>({
    mutationFn: (id: string) => apiService.delete(`/vacancy/${id}`),
    onSuccess: (data) => {
      queryClient.setQueryData(['vacancies'], data);
    },
  });
