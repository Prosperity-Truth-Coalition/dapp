import optionsForDropdown from "../interfaces/Options";
import Option from "../interfaces/Option";
import { atom } from "recoil";

const selectedOptionState2 = atom<Option>({
  key: "selectedOption2",
  default: optionsForDropdown[0],
});

export default selectedOptionState2;