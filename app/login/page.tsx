'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginPage() {
  const supabase = createClientComponentClient()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-zinc-800 bg-zinc-900 p-10 shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">SMARTER.POKER</h2>
          <p className="mt-2 text-sm text-zinc-400">Secure Access Node</p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#f97316',
                  brandButtonText: 'white',
                  inputBackground: '#18181b',
                  inputText: 'white',
                },
              },
            },
          }}
          theme="dark"
          providers={['google', 'facebook']}
          redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
        />
      </div>
    </div>
  )
}
