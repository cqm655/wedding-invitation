import {useState, useEffect, useRef} from "react";
import './letter.style.css';
import paper from '../../assets/audio/cut-paper.mp3'
import wedding from '../../assets/audio/wedding.mp3'
import stampila from '../../assets/imges/stampila.png'
import Card from "../card/card.tsx";
import Video from "../video/video.tsx";

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
                <p className="invite-date">25 Mai 2026</p>
                <img onClick={toggleExpanded} src={stampila} className="open-button" alt={"logo"}/>
            </div>

            {/* Bottom */}
            <div className={`letter-bottom-container ${isExpanded ? 'expanded-bottom-container' : ''}`}></div>
            {isExpanded && (
                <div>
                    <Card><Video/></Card>
                    <Card style={{color: "black", textAlign: "center", padding: "0"}}>
                        <div className="text-content">
                            <h1>Iurie și Cristina</h1>
                        </div>
                    </Card>

                    <Card>
                        <div className="text-content">
                            <h4>
                                Împreună este locul nostru preferat. <br/>
                            </h4>
                            <h5>De aceea, <br/></h5>
                            <h5>cu bucurie și recunoștință, <br/></h5>
                            <h5>vă invităm să ne fiți martori <br/></h5>
                            <h5>la începutul unei noi povești. <br/></h5>

                        </div>

                    </Card>
                </div>
            )}


        </div>
    );
};

export default Letter;
