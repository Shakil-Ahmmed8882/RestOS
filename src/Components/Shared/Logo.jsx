import { Link } from 'react-router-dom'
const Logo = () => {
  return (
    <Link className='w-9 h-9 rounded-lg bg-black flex justify-center items-center' to='/'>
      <div className='h-3 w-3 bg-white rounded-full'></div>
    </Link>
  )
}

export default Logo
