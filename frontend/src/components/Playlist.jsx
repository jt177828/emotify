import { useNavigate } from "react-router-dom";

function Playlist() {
    const mood = "";

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
      };
    
    return (
        <div>
            <h1>Mood: {}</h1>

            <button 
            className='text-white'
            onClick={handleNavigate}
            >Again</button>
        </div>
    );
}

export default Playlist;