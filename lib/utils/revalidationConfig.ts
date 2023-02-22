export const REVALIDATE_SECONDS =
  process.env.NEXT_IS_PROD === 'true' ? 30 : undefined

export const NOT_FOUND_FALLBACK =
  process.env.NEXT_IS_PROD === 'true' ? false : 'blocking'
