import React from 'react'

const Footer = () => {
  return (
    // <div>Footer</div>

    <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 left-0 w-full">
  <p>&copy; 2023 Your Company. All rights reserved.</p>
  <ul className="flex justify-center space-x-4 mt-2">
    <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
    <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
  </ul>
</footer>
  )
}

export default Footer