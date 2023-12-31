import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const emojiState = atom({
  key: "emoji",
  default: "🙂",
  effects_UNSTABLE: [persistAtom], // external data after reloads
});
export default emojiState;
