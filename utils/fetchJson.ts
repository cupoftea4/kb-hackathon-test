import { API_URL } from '@/constants';
import { APIResponse } from '@/types/general';
import { cookies } from 'next/headers';

export async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_URL}/${path}`;

    options = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies().toString()
      }
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = `Request failed with status: ${response.status}`;

      try {
        const errorData = await response.json() as APIResponse<T>;
        if (errorData && errorData.error) {
          errorMessage += `, Error: ${errorData.error}`;
        }
      } catch (error) {
        throw new Error(errorMessage + `. Error parsing JSON data: ${error}`);
      }

      throw new Error(errorMessage);
    }

    const jsonData = await response.json() as APIResponse<T>;
    return jsonData.data;
  } catch (error) {
    throw new Error(`Error fetching JSON data: ${error}. URL: ${API_URL}/${path}`);
  }
}
