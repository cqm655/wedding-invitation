import {useState, useEffect, useRef} from "react";
import './letter.style.css';
import paper from '../../assets/audio/cut-paper.mp3'
import wedding from '../../assets/audio/wedding.mp3'
import stampila from '../../assets/imges/stampila.png'

const Letter = () => {
    const [isExpanded, setExpanded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioRef2 = useRef<HTMLAudioElement | null>(null);

    // Inițializare audio
    useEffect(() => {
        audioRef.current = new Audio(paper);
        audioRef.current.volume = 0.5;

        audioRef2.current = new Audio(wedding);
        audioRef2.current.volume = 0.5;
    }, []);

    const toggleExpanded = () => {
        const paperAudio = audioRef.current;
        const weddingAudio = audioRef2.current;

        if (paperAudio && weddingAudio) {
            paperAudio.currentTime = 0;
            paperAudio.play();

            setTimeout(() => {
                weddingAudio.currentTime = 0;
                weddingAudio.play();
            }, 100); // NU pornește audio exact în același frame
        }

        setExpanded(prev => !prev);
    };


    // Swipe simplu: touch pentru mobile
    useEffect(() => {
        let startY: number | null = null;

        const handleTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!startY) return;
            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;
            // Swipe up = deschide, swipe down = închide
            if (diff > 30 && !isExpanded) toggleExpanded();
            else if (diff < -30 && isExpanded) toggleExpanded();
            startY = null;
        };

        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isExpanded]);

    return (
        <div className="invitation-container">
            {/* Top */}
            <div className={`letter-top-container ${isExpanded ? 'expanded-top-container' : ''}`}></div>

            {/* Middle content */}
            <div className={`middle-container ${isExpanded ? 'expanded-middle-container' : ''}`}>
                <h1 className="invite-title">Vă invităm la nunta noastră</h1>
                <p className="invite-date">08 Ianuarie 2026</p>
                <img onClick={toggleExpanded} src={stampila} className="open-button" alt={"logo"}/>
            </div>

            {/* Bottom */}
            <div className={`letter-bottom-container ${isExpanded ? 'expanded-bottom-container' : ''}`}></div>

        </div>
    );
};

export default Letter;
