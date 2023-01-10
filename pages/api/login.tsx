import { loginHandler } from 'next-password-protect'
import environment from '../../environment'

// @ts-ignore
export default loginHandler(environment.password, {
  cookieName: 'authorization'
})
