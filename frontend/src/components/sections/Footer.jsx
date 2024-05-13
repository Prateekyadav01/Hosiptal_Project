import React from 'react'

const Footer = () => {
  return (
    <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div class="mb-4 md:mb-0">
            <h3 class="text-xl font-bold">Contact Us</h3>
            <p class="mt-2">123 Hospital Ave, City, Country</p>
            <p>Phone: +123 456 7890</p>
            <p>Email: prateeky572@gmail.com</p>
        </div>
        <div class="mb-4 md:mb-0">
            <h3 class="text-xl font-bold">Quick Links</h3>
            <ul class="mt-2">
                <li><a href="#" class="hover:underline">Home</a></li>
                <li><a href="#" class="hover:underline">About Us</a></li>
                <li><a href="#" class="hover:underline">Services</a></li>
                <li><a href="#" class="hover:underline">Doctors</a></li>
                <li><a href="#" class="hover:underline">Contact</a></li>
            </ul>
        </div>
        <div>
            <h3 class="text-xl font-bold">Follow Us</h3>
            <div class="flex mt-2">
                <a href="#" class="mr-4"><i class="fab fa-facebook-square text-2xl"></i></a>
                <a href="#" class="mr-4"><i class="fab fa-twitter-square text-2xl"></i></a>
                <a href="#" class="mr-4"><i class="fab fa-linkedin text-2xl"></i></a>
                <a href="#" class="mr-4"><i class="fab fa-instagram-square text-2xl"></i></a>
            </div>
        </div>
    </div>
    <div class="mt-4 border-t border-gray-600 text-center">
        <p class="text-sm">&copy; 2024 Your Hospital. All rights reserved.</p>
    </div>
</footer>

  )
}

export default Footer
