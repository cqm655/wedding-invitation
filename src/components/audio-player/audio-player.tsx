import jingle from "../../assets/audio/jingle.mp3";
import {useRef} from "react";
import './audio-player.style.css'

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const playMusic = () => {
        audioRef.current?.play();
    };

    return (
        <div className="container">
            <audio autoPlay={true} ref={audioRef} src={jingle} loop/>
            <button
                onClick={playMusic}
                className="fixed bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow"
            >
                🎵 Deschide
            </button>
        </div>
    );
}

export default AudioPlayer;