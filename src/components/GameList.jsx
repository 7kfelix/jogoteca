import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function GameList() {
  const [games, setGames] = useState([]);
  const [hoveredGame, setHoveredGame] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    // TODO: Replace with actual API call
    setGames([
      { 
        id: 1, 
        nome: 'The Legend of Zelda', 
        categoria: 'Adventure', 
        console: 'Nintendo Switch',
        capa: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg'
      },
      { 
        id: 2, 
        nome: 'God of War', 
        categoria: 'Action', 
        console: 'PS5',
        capa: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg'
      },
    ]);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Games Library
          </h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            A list of all games in your collection including their name, category, and console.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/add"
            className="block rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:from-blue-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Add game
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className={`overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <table className="min-w-full divide-y divide-gray-700">
                <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
                  <tr>
                    <th scope="col" className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    } sm:pl-6`}>
                      Name
                    </th>
                    <th scope="col" className={`px-3 py-3.5 text-left text-sm font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Category
                    </th>
                    <th scope="col" className={`px-3 py-3.5 text-left text-sm font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Console
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {games.map((game) => (
                    <tr 
                      key={game.id}
                      className={`relative group ${
                        isDark 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-50'
                      } transition-colors duration-200`}
                      onMouseEnter={() => setHoveredGame(game.id)}
                      onMouseLeave={() => setHoveredGame(null)}
                    >
                      <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      } sm:pl-6`}>
                        {game.nome}
                        {hoveredGame === game.id && (
                          <div className="absolute z-10 left-full ml-4 top-1/2 transform -translate-y-1/2">
                            <div className={`${
                              isDark ? 'bg-gray-900' : 'bg-white'
                            } rounded-lg shadow-xl p-2`}>
                              <img 
                                src={game.capa} 
                                alt={game.nome}
                                className="w-48 h-32 object-cover rounded-lg"
                              />
                            </div>
                          </div>
                        )}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {game.categoria}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {game.console}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/edit/${game.id}`}
                          className="text-blue-400 hover:text-blue-300 mr-4 transition-colors duration-200"
                        >
                          <PencilIcon className="h-5 w-5 inline" />
                        </Link>
                        <button
                          onClick={() => {/* TODO: Implement delete */}}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <TrashIcon className="h-5 w-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}