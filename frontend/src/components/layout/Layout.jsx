import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = () => {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-16 ml-0 lg:ml-64 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout