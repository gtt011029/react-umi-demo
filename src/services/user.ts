import request from '@/utils/request';

export const currentUserApi = () => {
  return request('/api/user', {
    method: 'GET',
  });
};
