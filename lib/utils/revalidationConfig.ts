export const REVALIDATE_SECONDS =
  process.env.NEXT_IS_PROD === 'true' ? undefined : 30

export const NOT_FOUND_FALLBACK =
  process.env.NEXT_IS_PROD === 'true' ? false : 'blocking'
