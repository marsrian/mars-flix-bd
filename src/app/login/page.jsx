import React from 'react'
import LoginForm from '@/components/form/LoginForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import SocialLogin from '@/components/form/SocialLogin'

export const metadata = {
  title: "Login | MarsFlixBD",
  openGraph: {
    title: "Login | MarsFlixBD",
    description: 'Anime, Movie, Series huge collection see in MarsFlixBD website.',
  },
}

const Login = async () => {
  const session = await getServerSession(authOptions)

  if(session) redirect("/")
  return (
    <div>
      <LoginForm />
      <p className="text-center my-4">Or SignIn with </p>
      <SocialLogin />
    </div>
  )
}

export default Login
