import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Playlist() {
    const mood = "";
    const [playlist, setPlaylist] = useState(null)

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
      };
    
    return (
        <div>
            <h1>Mood: {}</h1>

            <button 
            className="px-3 py-3 border border-gray-200 text-white font-medium rounded-2xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all duration-200 ease-in-out"
            onClick={handleNavigate}
            >Again</button>
        </div>
    );
}

export default Playlist;