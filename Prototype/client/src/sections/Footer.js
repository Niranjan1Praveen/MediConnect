'use client'

import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-500 rounded-full w-6 h-6" /> {/* Placeholder for logo */}
            <h1 className="text-xl font-bold">MediConnect</h1>
          </div>
          <p className="text-sm text-gray-400 max-w-xs">
            Identify and fix slow code—in minutes, not months.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" aria-label="Discord"><span className="text-sm">💬</span></a>
            <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" aria-label="GitHub"><Github size={16} /></a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 justify-between gap-10 text-sm">
          <div>
            <h2 className="text-white font-semibold mb-2">Community</h2>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#">Discord</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Email</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-2">Legal</h2>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Code Policy</a></li>
            </ul>
          </div>
        </div>
      </div>


      <div className="text-center text-xs text-gray-500">
        Copyright © 2025 Million Software, Inc. All Rights Reserved.
      </div>
    </footer>
  )
}