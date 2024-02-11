"use client";
import { APIResponse } from '@/types/general';

export async function clientFetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

    options = {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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

    const jsonData = await response.json() as T;
    return jsonData;
  } catch (error) {
    throw new Error(`Error fetching JSON data: ${error}. URL: ${process.env.NEXT_PUBLIC_API_URL}/${path}`);
  }
}