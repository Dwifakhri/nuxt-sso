import {
  createError,
  eventHandler,
  getRequestHeader,
  H3Event,
  getQuery,
} from "h3"

// const TOKEN_TYPE = "Bearer"

const extractToken = (authHeaderValue: string) => {
  return authHeaderValue
}

const ensureAuth = async (event: H3Event) => {
  const authHeaderValue = getRequestHeader(event, "authorization")
  if (typeof authHeaderValue === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    })
  }
  // const query = getQuery(event)
  // console.log(query, "query")

  const extractedToken = extractToken(authHeaderValue)
  // console.log(extractedToken)
  // console.log(useNuxtApp()._route)

  try {
    const user = await $fetch(useRuntimeConfig().public.API_URL + "me", {
      method: "GET",
      headers: {
        Authorization: extractedToken,
      },
    })
    // const user = await $fetch("http://localhost:8000/api/" + "me")

    return user
  } catch (error: any) {
    console.log(error)

    throw createError({
      statusCode: error.response.status,
      statusMessage: error.response.statusText,
    })
  }
}

export default eventHandler(async (event) => {
  // console.log(event)
  const user = await ensureAuth(event)
  return user
})
