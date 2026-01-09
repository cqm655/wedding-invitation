import video from "../../assets/video/video.mp4";
import "./video.style.css";

const Video = () => {
    return <>
        <video
            autoPlay
            loop
            muted
            playsInline
            className="card-video"
        >
            <source src={video} type="video/mp4"/>
            You`re browser does not support the video element.
        </video>
    </>
}

export default Video
