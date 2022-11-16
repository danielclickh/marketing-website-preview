import { loginHandler } from '@storyofams/next-password-protect'

// @ts-ignore
export default loginHandler(process.env.STAGING_PASSWORD, {
  cookieName: 'authorization'
})
