/**
 * Represents a lambda handler responsible for receiving events from
 * step function and making an HTTP request.
 */

import { InputData } from './types';
import axios, { AxiosResponse } from 'axios';
import { getAuth0Audience, getAuth0ClientId, getAuth0ClientSecret, getAuth0Url, getTokenCacheTime } from './config';
import tcCoreLib from 'tc-core-library-js'

const m2mAuth = tcCoreLib.auth.m2m;
const m2m = m2mAuth({
  AUTH0_URL: getAuth0Url(),
  AUTH0_AUDIENCE: getAuth0Audience(),
  TOKEN_CACHE_TIME: getTokenCacheTime()
});

console.log(getAuth0Url());

/**
 * Get M2M token.
 * @returns {Promise<String>} the M2M token
 */
async function getM2MToken () {
  return m2m.getMachineToken(getAuth0ClientId(), getAuth0ClientSecret())
}

/**
 * Main lambda handler.
 */
export async function handler(event: InputData) {
  let response: AxiosResponse<any> = null!;
  const token:string = await getM2MToken();
  try {
    response = await axios.request({
      url: event.url,
      method: event.method,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
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
