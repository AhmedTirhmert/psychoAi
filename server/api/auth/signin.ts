import { useApi } from '~~/utils/api';

export default defineEventHandler(async (event) => {
  return useApi(event, 'auth/user/', 'GET');
});
