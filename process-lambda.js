/**
 * Represents a lambda handler responsible for receiving events from
 * step function and making an HTTP request.
 */

import axios from 'axios'

/**
 * Main lambda handler.
 */
export async function handler (event) {
  let response = null
  try {
    response = await axios.request({
      url: process.env.LAMBDA_URL,
      method: event.method,
      headers: {
        'content-type': 'application/json'
      },
      data: event.payload
    })
  } catch (e) {
    console.error(event, e)
    throw new Error(`${event.id} failed to invoke URL`)
  }
  if (response.status < 200 || response.status >= 300) {
    console.error(event, response)
    throw new Error(`${event.id} returned ${response.status} code.`)
  }
}
