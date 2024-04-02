<<<<<<< HEAD

import { useNavigate } from 'react-router-dom'
import Button from '../../Button copy/Button'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-primary-bg '>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <p className='p-3 text-sm font-medium text-primary-color rounded-full bg-blue-50 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
          </p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
            Something Went Wrong!
          </h1>
          <p className='mt-4 text-gray-500 '>Here are some helpful links:</p>

          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
            <button
              onClick={() => navigate(-1)}
              className='flex h-12 items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-hover-bg hover:text-hover-text'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180  hover:text-hover-text'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>

              <div className='w-24 block'>Go back</div>
            </button>

            <Button label={'Take Me Home'} onClick={() => navigate('/')} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
=======
import { Link } from "react-router-dom";
import home from '../../../assets/img/home.gif'
import search from '../../../assets/img/search.gif'

const Page404 = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex flex-col  items-center">
        <h1 className="text-[120px] font-extrabold text-gray-700">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-6">
          Page Not Found
        </p>
            <Link to='/' className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out flex items-center btn h-full bg-bgBabyBlue">
          <img className="w-9 md:w-11" src={home} alt="" /><span className="text-2xl ">Go home</span></Link>
      </div>
      <img className="absolute md:w-6/12 md:top-0 right-6 md:right-[295px] -z-10" src={search} alt="" />
    </div>
  );
};

export default Page404;
>>>>>>> 1b1f3d8f7a228243baf398500d2ae620539a889d
