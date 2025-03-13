"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const path = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Playground", path: "/playground" },
    { label: "Practice", path: "/generateQuiz" },
    { label: "How It Works", path: "/dashboard/how" },
  ];

  return (
    <header className="bg-gradient-to-r from-black to-gray-900 shadow-xl">
      <div className="max-w-9xl mx-auto px-7 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="mr-4">
                      <Image
                        src="/logo.png"
                        width={160}
                        height={90}
                        alt="AuraLMS"
                        className="hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                      />
                    </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">

            {/* Navigation Items */}
            {menuItems
                          .filter((item) =>
                            item.label.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((item) => (
                            <a
                              key={item.path}
                              onClick={() => router.push(item.path)}
                              className={`text-lg font-medium cursor-pointer transition-all duration-300 hover:scale-105 ${
                                path === item.path
                                  ? "text-white border-b-2 border-blue-500"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              {item.label}
                            </a>
                          ))}

            {/* Get Started Button */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {menuItems
                              .filter((item) =>
                                item.label.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((item) => (
                                <a
                                  key={item.path}
                                  onClick={() => {
                                    router.push(item.path);
                                    setIsMenuOpen(false);
                                  }}
                                  className={`text-lg font-medium cursor-pointer transition-colors duration-300 ${
                                    path === item.path
                                      ? "text-white border-l-4 border-blue-500 pl-4"
                                      : "text-gray-400 hover:text-white pl-4"
                                  }`}
                                >
                                  {item.label}
                                </a>
                              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;