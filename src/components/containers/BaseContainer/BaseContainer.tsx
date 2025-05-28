import { BaseContainerProps } from "./types/BaseContainer.types";
import "./BaseContainer.css";
import { Button } from "@/components/common";

const BaseContainer: React.FC<BaseContainerProps> = () => {
  return (
    <Button
      buttonClass="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-2 cursor-pointer"
      onClick={() => {
        console.log("click");
      }}
    >
      Click
    </Button>
  );
};

export default BaseContainer;
