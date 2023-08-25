export const apiConfig = {
  b2cScopes: process.env.NEXT_PUBLIC_B2C_API_SCOPE ? [process.env.NEXT_PUBLIC_B2C_API_SCOPE] : [],
  webApi: process.env.NEXT_PUBLIC_API,
}
