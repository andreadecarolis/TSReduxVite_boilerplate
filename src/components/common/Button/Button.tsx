import { ButtonProps } from "./types/Button.types";
import "./Button.scss";

const Button: React.FC<ButtonProps> = ({ buttonClass, onClick, children }) => {
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
