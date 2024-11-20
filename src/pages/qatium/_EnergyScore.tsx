import { motion } from 'motion/react';
import style from "./_EnergyScore.module.css";
import { useState } from 'react';

interface EnergyScoreProps {
  initialScore: number;
}

export const EnergyScore = ({ initialScore }: EnergyScoreProps) => {

  const [score, setScore] = useState(initialScore);
  const scoreToDegrees = (score: number) => {
    return (score / 100) * 180;
  }
  const randomValue = () => {
    setScore(Math.floor(Math.random() * 100));
  }

  return (
    <div className={style.dial} onClick={randomValue}>
      <div className={style.score}>{score}</div>
      <div className={style.dialBackground}>
        <svg width="228" height="114" viewBox="0 0 228 114">
          <path d="M222.3 114C225.448 114 228.015 111.446 227.858 108.302C226.45 80.1421 214.642 53.4221 194.61 33.3898C173.231 12.0107 144.235 2.28266e-06 114 0C83.7653 -2.28265e-06 54.769 12.0107 33.3898 33.3898C13.3575 53.4221 1.55048 80.1421 0.142342 108.302C-0.0148782 111.446 2.55198 114 5.7 114V114C8.84802 114 11.3835 111.445 11.5582 108.302C12.9551 83.1678 23.5569 59.3448 41.4509 41.4508C60.6921 22.2096 86.7888 11.4 114 11.4C141.211 11.4 167.308 22.2096 186.549 41.4508C204.443 59.3448 215.045 83.1678 216.442 108.302C216.617 111.445 219.152 114 222.3 114V114Z" fill="url(#dial_gradient)" />
          <defs>
            <linearGradient id="dial_gradient" x1="0" y1="114" x2="228" y2="114" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF0000" />
              <stop offset="0.5" stopColor="#FFCC00" />
              <stop offset="1" stopColor="#19FF00" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <motion.div
        className={style.triangle}
        initial={{ rotate: scoreToDegrees(score) }}
        animate={{ rotate: scoreToDegrees(score) }}
        transition={{
          type: "tween",
          ease: "anticipate",
          duration: 1
        }}
      >
        <svg width="18" height="20" viewBox="0 0 18 20">
          <path d="M4.2893 8.26795C2.95597 9.03775 2.95597 10.9623 4.28931 11.7321L11.7893 16.0622C13.1226 16.832 14.7893 15.8697 14.7893 14.3301L14.7893 5.66987C14.7893 4.13027 13.1226 3.16802 11.7893 3.93782L4.2893 8.26795Z" fill="white"></path>
        </svg>
      </motion.div>
      <div className={style.scoreSubtitle}>Your efficiency score</div>
    </div>
  )
}
