import {
  createError,
  eventHandler,
  getRequestHeader,
  H3Event,
  getQuery,
} from "h3"
// import { useNuxtApp } from "nuxt/app"

const TOKEN_TYPE = "Bearer"

const extractToken = (authHeaderValue: string) => {
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
  // const [, token] = authHeaderValue.split(`${TOKEN_TYPE} ${TOKEN_TYPE} `)
  // console.log(token)

  return token
}

const ensureAuth = async (event: H3Event) => {
  // console.log(event)

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
    // console.log("me")

    // console.log(data)
    // const encData = btoa(data)
    // const user = await $fetch(`${useRuntimeConfig().public.API_URL}/me`, {
    const user = await $fetch(useRuntimeConfig().public.API_URL + "me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + extractedToken,
      },
    })
    // const user = await $fetch("http://localhost:8000/api/" + "me")

    return user
  } catch (error: any) {
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
