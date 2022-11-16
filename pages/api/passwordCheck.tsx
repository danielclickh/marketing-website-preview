import { passwordCheckHandler } from '@storyofams/next-password-protect'

// @ts-ignore
export default passwordCheckHandler(process.env.STAGING_PASSWORD, {
  cookieName: 'authorization'
})
