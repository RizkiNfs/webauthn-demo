'use client'
import { FormEvent, useState } from 'react'
import { startAuthentication } from '@simplewebauthn/browser';

export default function Login(){

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
   
    setLoading(true)
    e.preventDefault()
    
    try {

      const formData = new FormData(e.target as HTMLFormElement)
      const email = formData.get('email')

      const { data: loginOpts } = await (await fetch(
        '/api/pre-login', 
        { 
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email }) 
        })
      ).json()

      const credential = await startAuthentication(loginOpts)

      await (await fetch(
        '/api/login', 
        { 
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ credential, email }) 
        })
      ).json()


      location.href = '/'

    } catch(err) {
      console.log('err: ', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <form autoComplete="off" className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-2">
          <label> Email </label>
          <input 
            className="h-10 rounded-md"
            name="email"
          />
        </div>
        <button type="submit" disabled={loading}>
        {loading ? '...Loading' : 'Masuk'}
        </button>
      </form>
    </div>
  )
}