import "./video.style.css";

type Props = {
    video: string;
}

const Video = (props: Props) => {
    return <>
        <video
            autoPlay
            loop
            muted
            playsInline
            className="card-video"
        >
            <source src={props.video} type="video/mp4"/>
            You`re browser does not support the video element.
        </video>
    </>
}

export default Video
