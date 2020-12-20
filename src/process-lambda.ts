/**
 * Represents a lambda handler responsible for receiving events from
 * step function and making an HTTP request.
 */

import { InputData } from './types';
import axios, { AxiosResponse } from 'axios';

/**
 * Main lambda handler.
 */
export async function handler(event: InputData) {
  let response: AxiosResponse<any> = null!;
  try {
    response = await axios.request({
      url: event.url,
      method: event.method,
      headers: event.headers,
      data: event.payload,
    });
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(event, e);
    throw new Error(`${event.id} failed to invoke URL ${event.url}`);
  }
  if (response.status < 200 || response.status >= 300) {
    // tslint:disable-next-line:no-console
    console.error(event, response);
    throw new Error(`${event.id} returned ${response.status} code.`);
  }
}
