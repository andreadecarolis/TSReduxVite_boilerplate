export const useButton = () => {
  const handleButtonClick = () => {
    console.log("Button clicked");
  };

  return { handleButtonClick };
};
