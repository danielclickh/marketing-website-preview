'use client'
import { withPasswordProtect } from 'next-password-protect'
import React, { ReactNode } from 'react'
import environment from '../environment'

function Template({ children }: { children: ReactNode }) {
  return children
}

export default environment.password
  ? withPasswordProtect(Template, {})
  : Template
