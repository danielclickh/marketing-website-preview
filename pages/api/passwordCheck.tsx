import { passwordCheckHandler } from '@storyofams/next-password-protect'
import environment from '../../environment'

// @ts-ignore
export default passwordCheckHandler(environment.password, {
  cookieName: 'authorization'
})
