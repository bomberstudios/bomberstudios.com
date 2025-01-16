import { motion } from 'motion/react';
import { useState } from 'react';
import style from './_Toggle.module.css';

export const Toggle = ({ enabled = true }) => {
  const [isOn, setIsOn] = useState(enabled);

  return (
    <motion.button
      onClick={() => setIsOn(!isOn)}
      className={style.toggle + ' ' + (isOn ? style.toggleOn : style.toggleOff)}
      animate={{
        backgroundColor: isOn ? '#62c357' : '#cccccc',
      }}
    >
      <motion.div
        className={style.handle}
        animate={{ y: isOn ? 0 : 15 }}
      />
    </motion.button>
  )
}
