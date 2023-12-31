import { atom } from "recoil";

import newId from "utils/newId";

const newBribeIdState = atom({
  key: "newBribeId",
  default: newId(),
});

export default newBribeIdState;
