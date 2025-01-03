import { useApi } from '~~/server/utils/api';

export default defineEventHandler(async (event) => {
  return useApi(event, 'auth/user/', 'GET');
});
