import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="group w-16 hover:w-60 h-full bg-gray-900 text-white transition-all duration-300 overflow-hidden whitespace-nowrap flex flex-col shadow-xl z-20">
            <div className="p-4 flex items-center h-16 border-b border-gray-800">
                <svg className="w-8 h-8 flex-shrink-0 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>

            <ul className="p-2 space-y-2 mt-4">
                <li>
                    <Link to="/dashboard" className="flex items-center hover:bg-gray-800 p-2 rounded">
                        <span className="w-8 flex justify-center text-xl">📊</span>
                        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/create-project" className="flex items-center hover:bg-gray-800 p-2 rounded">
                        <span className="w-8 flex justify-center text-xl">➕</span>
                        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Create Project</span>
                    </Link>
                </li>
                <li>
                    <Link to="/projects" className="flex items-center hover:bg-gray-800 p-2 rounded">
                        <span className="w-8 flex justify-center text-xl">📁</span>
                        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Projects</span>
                    </Link>
                </li>
                <li>
                    <Link to="/files" className="flex items-center hover:bg-gray-800 p-2 rounded">
                        <span className="w-8 flex justify-center text-xl">📄</span>
                        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Files</span>
                    </Link>
                </li>
                <li>
                    <Link to="/activity" className="flex items-center hover:bg-gray-800 p-2 rounded">
                        <span className="w-8 flex justify-center text-xl">📈</span>
                        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Activity</span>
                    </Link>
                </li>
                <li>
                    <Link to="/analytics" className="flex items-center hover:bg-gray-800 p-2 rounded">
                        <span className="w-8 flex justify-center text-xl">📉</span>
                        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Analytics</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;