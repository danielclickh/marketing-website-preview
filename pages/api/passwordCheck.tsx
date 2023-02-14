import { passwordCheckHandler } from 'next-password-protect'

// @ts-ignore
export default passwordCheckHandler(process.env.STAGING_PASSWORD, {
  cookieName: 'authorization'
})
