import icon from "../utils/icon";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <icon.HiOutlineSun /> : <icon.HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
