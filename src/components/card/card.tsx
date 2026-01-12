import "./card.style.css";
import type {CSSProperties, ReactNode} from "react";
import {motion} from "framer-motion";
import {easeOut} from "framer-motion";

type Props = {
    children: ReactNode;
    style?: CSSProperties;
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.97,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1,
            ease: easeOut,
        },
    },
};

const Card = ({children, style}: Props) => {
    return (
        <motion.div
            className="container-card"
            style={style}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: false, amount: 0.5}}
        >
            {children}
        </motion.div>
    );
};

export default Card;
