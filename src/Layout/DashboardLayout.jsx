import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar/Sidebar'
import DashboardNavbar from '../Pages/Dashboard/navabar/DashboardNavbar'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex'>
      {/* Sidebar Component */}
      <Sidebar />
      <div className='flex-1 md:ml-72'>
        <div className='p-5'>
          <DashboardNavbar />
          {/* Outlet for dynamic contents */}
          <Outlet />


        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
