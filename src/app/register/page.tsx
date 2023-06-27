'use client'
import { FormEvent, useState } from 'react'
import { startRegistration } from '@simplewebauthn/browser';

export default function Register(){

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    
    setLoading(true)
    e.preventDefault()

    try {

      const formData = new FormData(e.target as HTMLFormElement)
      const email = formData.get('email')
      const name = formData.get('name')
      const hobby = formData.get('hobby')

      const { data: registrationOpts } = await (await fetch(
        '/api/pre-register', 
        { 
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email }) 
        })
      ).json()

      const credential = await startRegistration(registrationOpts)

      await (await fetch(
        '/api/register', 
        { 
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ credential, email, name, hobby }) 
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
        <div className="flex flex-col gap-y-2">
          <label> Nama </label>
          <input 
            className="h-10 rounded-md" 
            name="name"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label> Hobi </label>
          <input 
            className="h-10 rounded-md" 
            name="hobby"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '...Loading' : 'Daftar'}
        </button>
      </form>
    </div>
  )
}