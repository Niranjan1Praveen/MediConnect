"use client";
import logo from "@/assets/images/logo.png";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Github, Twitter, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Image src={logo} alt="footer-logo" className="h-auto w-20" />
            <p className="text-2xl font-bold text-white/20 md:inline-flex hidden">
              <AuroraText colors={["#4ade80", "#30f6d5", "#5EF7BA", "#06b6d4"]}>
                MediConnect
              </AuroraText>
            </p>
          </div>
          <p className="text-sm text-gray-400 max-w-xs">
            Bridging the Healthcare Gap with CSR, NGOs and Doctors
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" aria-label="Discord">
              <span className="text-lg">💬</span>
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 justify-between gap-10 text-sm">
          <div>
            <h2 className="text-white font-semibold mb-2">Community</h2>
            <ul className="space-y-1 text-gray-400">
              <li>
                <a href="#">Discord</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Email</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-2">Legal</h2>
            <ul className="space-y-1 text-gray-400">
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Code Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500">
        Copyright © 2025 Million Software, Inc. All Rights Reserved.
      </div>
    </footer>
  );
}
