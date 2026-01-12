import {useState, useEffect, useRef} from "react";
import './letter.style.css';
import paper from '../../assets/audio/cut-paper.mp3'
import wedding from '../../assets/audio/wedding.mp3'
import stampila from '../../assets/imges/stampila.png'
import Card from "../card/card.tsx";
import Video from "../video/video.tsx";
import video from "../../assets/video/video.mp4";
import road from "../../assets/video/road.mp4"
import Map from "../map/map.tsx"
import ParallaxCard from "../card/paralax.tsx";
import time from "../../assets/video/time.mp4";
import cheers from "../../assets/video/cheers.mp4"

const Letter = () => {
    const [isExpanded, setExpanded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioRef2 = useRef<HTMLAudioElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null); //

    useEffect(() => {
        audioRef.current = new Audio(paper);
        audioRef.current.preload = "auto";

        audioRef2.current = new Audio(wedding);
        audioRef2.current.preload = "auto";
    }, []);

    const playSoundsAndToggle = () => {
        const paperAudio = audioRef.current;
        const weddingAudio = audioRef2.current;

        if (paperAudio && weddingAudio) {
            paperAudio.currentTime = 0;
            weddingAudio.currentTime = 0;

            paperAudio.play().catch(() => {
            });
            weddingAudio.play().catch(() => {
            });
        }

        setExpanded(prev => !prev);
    };

    const toggleExpanded = () => {
        setExpanded(prev => !prev);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let startY: number | null = null;

        const handleTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (startY !== null) {
                e.preventDefault(); // 🔥 oprește pull-to-refresh
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (startY === null) return;

            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;

            if (diff > 40 && !isExpanded) toggleExpanded();
            else if (diff < -40 && isExpanded) toggleExpanded();

            startY = null;
        };

        container.addEventListener("touchstart", handleTouchStart);
        container.addEventListener("touchmove", handleTouchMove, {passive: false});
        container.addEventListener("touchend", handleTouchEnd);

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isExpanded]);

    return (
        <div className="invitation-container">
            {/* Top */}

            <div className={`letter-top-container ${isExpanded ? 'expanded-top-container' : ''}`}></div>
            {/* Middle content */}
            <div className={`middle-container ${isExpanded ? 'expanded-middle-container' : ''}`}>
                <img onClick={playSoundsAndToggle}
                     onTouchStart={playSoundsAndToggle} src={stampila} className="open-button" alt={"logo"}/>
            </div>

            {/* Bottom */}
            <div className={`letter-bottom-container ${isExpanded ? 'expanded-bottom-container' : ''}`}></div>
            {isExpanded && (
                <div>
                    <ParallaxCard><Card><Video video={video}/></Card></ParallaxCard>
                    <ParallaxCard><Card style={{color: "black", textAlign: "center"}}>
                        <div className="text-content">
                            <span className="wedding-names">Cristina și Iura</span>
                        </div>
                    </Card></ParallaxCard>

                    <ParallaxCard><Card>
                        <div className="text-content">
                            <h1>
                                Împreună este locul nostru preferat. <br/>
                            </h1>
                            <h2>De aceea, <br/></h2>
                            <h2>cu bucurie și recunoștință, <br/></h2>
                            <h2>vă invităm să ne fiți martori <br/></h2>
                            <h2>la începutul unei noi povești. <br/></h2>

                        </div>

                    </Card></ParallaxCard>
                    <ParallaxCard><Card>
                        <Video video={time}/>
                    </Card></ParallaxCard>
                    <ParallaxCard><Card>
                        <div className="text-content">
                            <h2>Avem onoarea să vă invităm pe data de</h2> <h1>25 mai 2026</h1>
                        </div>
                    </Card></ParallaxCard>
                    <ParallaxCard><Card><Video video={road}/></Card></ParallaxCard>
                    <ParallaxCard><Card><Map/></Card></ParallaxCard>
                    <ParallaxCard><Card>
                        <div className="text-content">
                            <h1>Vă așteptăm cu mare drag!</h1>
                        </div>
                    </Card></ParallaxCard>
                    <ParallaxCard><Card>
                        <Video video={cheers}/>
                    </Card></ParallaxCard>

                </div>
            )}


        </div>
    );
};

export default Letter;
