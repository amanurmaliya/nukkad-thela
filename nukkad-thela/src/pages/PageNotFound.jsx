import { Button } from '@/components/ui/button.jsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import lazyPanda from '../assets/images/Lazy Sleeping Panda.webp'

const PageNotFound = () => {
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem('token')); // Assuming token is stored in localStorage

    return (
        <div className="bg-gray-900 text-white flex flex-col items-center justify-center h-screen w-screen">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-lg mb-6">Oops! The page you are looking for does not exist.</p>
            <img src={lazyPanda} alt="Lazy Panda"  className='h-96 w-96 rounded-lg border-[5px] mb-10'/>
            <Button 
                variant="secondary" 
                onClick={() => navigate(isLoggedIn ? '/' : '/login')}
                className="px-6 py-2 text-lg"
            >
                {isLoggedIn ? 'Go to Dashboard' : 'Login'}
            </Button>
        </div>
    );
};

export default PageNotFound;
