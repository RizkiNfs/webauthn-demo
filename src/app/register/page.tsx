'use client'
import { FormEvent, useState } from 'react'

export default function Register(){

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    
    setLoading(true)
    e.preventDefault()

    try {


    } catch(err) {
      console.log('err: ', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
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