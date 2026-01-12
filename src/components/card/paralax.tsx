import {motion, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";

const ParallaxCard = ({children}: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <motion.div ref={ref} style={{y}}>
            {children}
        </motion.div>
    );
};

export default ParallaxCard;
