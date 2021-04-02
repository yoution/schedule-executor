/**
 * Configurations file.
 */

/**
 * Get Auth0 URL.
 */
export function getAuth0Url () {
  if (!process.env.AUTH0_URL) {
    throw new Error('AUTH0_URL is not defined')
  }
  return process.env.AUTH0_URL
}

/**
 * Get Auth0 audience.
 */
export function getAuth0Audience () {
  if (!process.env.AUTH0_AUDIENCE) {
    throw new Error('AUTH0_AUDIENCE is not defined')
  }
  return process.env.AUTH0_AUDIENCE
}

/**
 * Get Auth0 cache time.
 */
export function getTokenCacheTime () {
  if (!process.env.TOKEN_CACHE_TIME) {
    throw new Error('TOKEN_CACHE_TIME is not defined')
  }
  return process.env.TOKEN_CACHE_TIME
}

/**
 * Get Auth0 client ID.
 */
export function getAuth0ClientId () {
  if (!process.env.AUTH0_CLIENT_ID) {
    throw new Error('AUTH0_CLIENT_ID is not defined')
  }
  return process.env.AUTH0_CLIENT_ID
}

/**
 * Get Auth0 client secret.
 */
export function getAuth0ClientSecret () {
  if (!process.env.AUTH0_CLIENT_SECRET) {
    throw new Error('AUTH0_CLIENT_SECRET is not defined')
  }
  return process.env.AUTH0_CLIENT_SECRET
}
