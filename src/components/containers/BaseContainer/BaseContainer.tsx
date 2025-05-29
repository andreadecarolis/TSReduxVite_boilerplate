import { useButton } from "@/hooks/useButton";
import { Button } from "@/components/common";
import { BaseContainerProps } from "./types/BaseContainer.types";
import "./BaseContainer.scss";

const BaseContainer: React.FC<BaseContainerProps> = () => {
  const { handleButtonClick } = useButton();

  return (
    <Button
      buttonClass="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-2 cursor-pointer"
      onClick={handleButtonClick}
    >
      Click
    </Button>
  );
};

export default BaseContainer;
