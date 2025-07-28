import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import pokeBall from "../../assets/pokeball.png";

export default function PokeballAnimation({ isCatching }) {
  const controls = useAnimation();

  useEffect(() => {
    if (isCatching) {
      const randomX = Math.random() * 40 - 20;
      controls.start({
        opacity: [1, 1, 0.8, 1],
        y: [200, -80, 0, -10, 20],
        x: [-200, randomX, 10],
        scale: [0.8, 1.2, 1, 1.05, 1],
        rotate: [0, 180, 360, 540, 720],
        transition: { duration: 2.2, ease: "easeOut" },
      });
    }
  }, [isCatching, controls]);

  return (
    <motion.img
      src={pokeBall}
      alt="Pokeball"
      className="absolute w-5 z-50 right-[50%]"
      initial={{ opacity: 0, y: 0, scale: 0.8 }}
      animate={controls}
    />
  );
}
