import { getCookie } from 'h3';
import type { HTTPMethod, H3Event } from 'h3';

const requestCache = new Map();

export async function useApi(
  event: H3Event,
  endpoint: string,
  method: HTTPMethod = 'GET',
  body?: any,
  requiresAuth: boolean = true,
) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBaseUrl}${endpoint}`;
  const cacheKey = `${method}:${url}`;

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      headers.Authorization = `Bearer ${getCookie(event, 'access_token')}`;
    }

    const promise = fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw createError({
          statusCode: res.status,
          data: errorData,
          message: errorData || `HTTP Error ${res.status}`,
        });
      }
      return res.json();
    });

    requestCache.set(cacheKey, promise);
    const response = await promise;
    requestCache.delete(cacheKey);

    return response;
  } catch (error: any) {
    requestCache.delete(cacheKey);
    throw createError({ ...error });
  }
}
