import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'} transition-colors duration-200`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Jogoteca
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDark 
                ? 'text-yellow-400 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            {isDark ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
          <button
            type="button"
            className={`lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${
              isDark ? 'text-gray-400' : 'text-gray-700'
            }`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link 
            to="/" 
            className={`text-sm font-semibold leading-6 ${
              isDark 
                ? 'text-white hover:text-blue-400' 
                : 'text-gray-900 hover:text-blue-600'
            }`}
          >
            Games
          </Link>
          <Link 
            to="/add" 
            className={`text-sm font-semibold leading-6 ${
              isDark 
                ? 'text-white hover:text-blue-400' 
                : 'text-gray-900 hover:text-blue-600'
            }`}
          >
            Add Game
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link 
            to="/login" 
            className={`text-sm font-semibold leading-6 ${
              isDark 
                ? 'text-white hover:text-blue-400' 
                : 'text-gray-900 hover:text-blue-600'
            }`}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}>
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Jogoteca
              </span>
            </Link>
            <button
              type="button"
              className={`-m-2.5 rounded-md p-2.5 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    isDark 
                      ? 'text-white hover:bg-gray-700' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Games
                </Link>
                <Link
                  to="/add"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    isDark 
                      ? 'text-white hover:bg-gray-700' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Game
                </Link>
              </div>
              <div className="py-6">
                <Link
                  to="/login"
                  className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 ${
                    isDark 
                      ? 'text-white hover:bg-gray-700' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}