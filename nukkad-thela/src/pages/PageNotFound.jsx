import { Button } from '@/components/ui/button.jsx';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
    <div className='bg-gray-900 text-white text-center items-center flex flex-row justify-center h-[100vh] w-[100vw]' >PageNotFound
    <div >

        <Button variant='secondary' onClick={()=> navigate('/login')}>Login</Button>
        
    </div>
    </div>
  )
}

export default PageNotFound