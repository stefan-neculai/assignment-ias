import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-blue-900 text-white">
            <div className="flex items-center">
                <Link href="/boards">
                    <button className="mr-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white">My Boards</button>
                </Link>
            </div>
            <div className="flex-grow text-center font-semibold text-xl">
                <h1 className="m-0">Trello</h1>
            </div>
            <div className="flex items-center">
                <div className="px-3 py-1 bg-green-600 rounded text-center cursor-pointer">Profile</div>
            </div>
        </nav>
    );
};

export default Navbar;
