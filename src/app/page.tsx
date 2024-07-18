'use client'

import { useUserInfoMutation, useUserInfoQuery } from '@/api'

export default function Home() {
  const { data } = useUserInfoQuery()
  // const userInfoMutation = useUserInfoMutation({
  //   name: 'string',
  //   phone: 'string',
  //   requiredTermsAgree: true,
  //   marketingEmailOptIn: false,
  // })

  if (data == null) {
    return <div>DATA ERROR</div>
  }

  return (
    <main>
      <h1 className="text-h1">name: {data.result.name}</h1>
      <h1 className="text-h1">email: {data.result.email}</h1>
      <div
        // disable={userInfoMutation.isPending}
        role="presentation"
        onClick={() => {
          // userInfoMutation.mutate()
        }}
      ></div>
    </main>
  )
}
