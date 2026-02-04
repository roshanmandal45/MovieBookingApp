import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">🎬 CineBook</h3>
            <p className="text-sm leading-relaxed">
              Your ultimate destination for booking movie tickets online. Experience cinema like never before.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Movies</a></li>
              <li><a href="#" className="hover:text-white transition">Theaters</a></li>
              <li><a href="#" className="hover:text-white transition">My Bookings</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@cinebook.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Cinema Lane, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Links */}
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition">
              <Linkedin size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-center md:text-right">
            &copy; 2024 CineBook. All rights reserved. | 
            <a href="#" className="ml-2 hover:text-white transition">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}