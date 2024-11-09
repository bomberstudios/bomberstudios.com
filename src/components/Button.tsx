import styles from './button.module.css';

import type { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const handleClick = () => {
  console.log('Yo from the component!');
};

const Button = ({ children, onClick }: ButtonProps) => {
  return <button className={styles.button} onClick={onClick ? onClick : handleClick}>{children}</button>;
}

export default Button;