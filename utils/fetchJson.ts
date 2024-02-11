import { API_URL } from '@/constants';
import { APIErrorResponse } from '@/types/general';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  return _fetchJson<T>(path, options, cookies().toString());
}

export async function _fetchJson<T>(path: string, options?: RequestInit, cookies?: string): Promise<T> {
  let statusCode: number = 0;
  try {
    const url = `${API_URL}/${path}`;

    options = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(cookies ? { 'Cookie': cookies } : {}),
      }
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = `Request failed with status: ${response.status}`;
      statusCode = response.status;

      try {
        const errorData = await response.json() as APIErrorResponse<T>;
        if (errorData && errorData.message) {
          errorMessage += `, Error: ${errorData.message}`;
        }
      } catch (error) {
        throw new Error(errorMessage + `. Error parsing JSON data: ${error}`);
      }

      throw new Error(errorMessage);
    }

    const jsonData = await response.json() as T;
    return jsonData;
  } catch (error) {
    if (statusCode === 403) {
      console.log(`Error fetching JSON data: ${error}. URL: ${API_URL}/${path}`);
      console.error('User is not authenticated, redirecting to login page');
      redirect('/login');
    }
    throw new Error(`Error fetching JSON data: ${error}. URL: ${API_URL}/${path}`);
  }
}
