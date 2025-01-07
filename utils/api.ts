import type { H3Event, HTTPMethod } from 'h3';

const requestCache = new Map();
const AUTH_COOKIE = 'access_token';
export async function useApi(
  endpoint: string,
  method: HTTPMethod = 'GET',
  body?: any,
  requiresAuth: boolean = true,
  h3Event?: H3Event,
) {
  const access_token = useCookie('access_token');
  const config = useRuntimeConfig();
  const url = `${config.public.apiBaseUrl}${endpoint}`;
  const cacheKey = `${method}:${url}`;
  const isServer = import.meta.server;

  try {
    let headers: Record<string, string> = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let accessToken: string | undefined;

    // Adding access token on bot server side and client side
    if (isServer) {
      const event = h3Event
        ? h3Event
        : typeof useEvent === 'function'
        ? useEvent()
        : null;

      if (event) {
        const cookies = parseCookies(event);
        accessToken = cookies[AUTH_COOKIE];
      }
    } else {
      accessToken = useCookie(AUTH_COOKIE).value || '';
    }

    if (requiresAuth && accessToken) {
      headers.Authorization = `Token ${accessToken}`;
    }

    // Add cookies on the server-side
    if (isServer) {
      const cookieString = h3Event?.req.headers.cookie;
      if (cookieString) {
        headers.cookie = removeAccessToken(cookieString!);
      }
    }

    // Configure request options
    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const promise = fetch(url, options).then(async (res) => {
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

function removeAccessToken(cookies: string) {
  return cookies
    .split(';')
    .filter((part) => !part.trim().startsWith('access_token='))
    .join(';');
}
