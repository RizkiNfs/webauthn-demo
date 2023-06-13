import db from '@/utils/db'
import { cookies } from 'next/headers'

const placeholderData = [
  { email: 'lorem@mail.com', name: 'ipsum dolor', hobby: 'sit amet' },
  { email: 'consectetur@mail.com', name: 'adipiscing elit', hobby: 'sed do' },
  { email: 'eiusmod@mail.com', name: 'tempor incididunt ut', hobby: 'labore et dolore' },
  { email: 'magna@mail.com', name: 'aliqua', hobby: 'Ut enim ad' },
]

export default function Home() {
  const token = cookies().get('token')

  const renderTable = ({ className = '', data = placeholderData }: { className?: string, data?: typeof placeholderData  } = {}) => (
    <div className="rounded-lg border overflow-x-auto">
      <table className={` ${className} table-auto border-collapse w-full`}>
        <thead>
          <tr>
            <th className="p-4">Email</th>
            <th className="p-4">Nama</th>
            <th className="p-4">Hobi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td className="bg-slate-900 border-b p-4 text-center">{item.email}</td>
              <td className="bg-slate-900 border-b p-4 text-center">{item.name}</td>
              <td className="bg-slate-900 border-b p-4 text-center">{item.hobby}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )


  if(!token?.value) {
    return (
      <main className="max-w-screen-lg mx-auto">
        <h2 className="mb-6">Login Terlebih dahalu untuk melihat data</h2>
        {renderTable({ className: 'blur-sm select-none'})}
      </main>
    )
  }

  const email = cookies().get('email')
  const user = db.get('users', decodeURIComponent(email?.value || ''))

  const users = Object.values<typeof placeholderData[0]>(db.get('users')).map((item) => ({
    name: item.name,
    email: item.email,
    hobby: item.hobby,
  }))

  return (
    <main className="max-w-screen-lg mx-auto">
      <h2 className="mb-6">Selamat Datang {user?.name}</h2>
      {renderTable({ data: users })}
    </main>
  )
}
