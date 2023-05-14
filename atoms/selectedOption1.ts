import optionsForDropdown from "../interfaces/Options";
import Option from "../interfaces/Option";
import { atom } from "recoil";

const selectedOptionState1 = atom<Option>({
  key: "selectedOption1",
  default: optionsForDropdown[0] as Option,
});

export default selectedOptionState1;
    