import "./card.style.css";
import type {CSSProperties, ReactNode} from "react";

type Props = {
    children: ReactNode;
    style?: CSSProperties;
}

const Card = (props: Props) => {
    return <div className="container-card" style={props.style}>
        {props.children}
    </div>
}

export default Card;

