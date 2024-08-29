import { createError, eventHandler, getRequestHeader, H3Event } from "h3"

const TOKEN_TYPE = "Bearer"

const extractToken = (authHeaderValue: string) => {
  // const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} ${TOKEN_TYPE} `)
  console.log(token)

  return token
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

  const extractedToken = extractToken(authHeaderValue)
  console.log(extractedToken)

  try {
    // const user = await $fetch(`${useRuntimeConfig().public.API_URL}/me`, {
    const user = await $fetch("http://localhost:8000/api/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + extractedToken,
      },
    })

    return user
  } catch (error) {
    console.log(error)

    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    })
  }
}

export default eventHandler(async (event) => {
  const user = await ensureAuth(event)

  return user
})
