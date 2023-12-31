import { Input } from "@nextui-org/react";
import { BsFillPersonFill } from "react-icons/bs";

import sendData from "utils/sendData";

const InputSave = ({ nickName, setNickName, userId }) => {
  const submitData = (e) => {
    e.preventDefault();
    const body = {
      id: userId,
      nickName: nickName,
    };
    sendData("PUT", "/api/users", body);
  };
  return (
    <>
      <Input
        autoComplete="on"
        size="xs"
        //@ts-ignore
        label={
          <>
            <BsFillPersonFill /> Nick Name
          </>
        }
        placeholder="Some Name"
        initialValue={nickName}
        onChange={(e) => setNickName(e.target.value)}
        onBlur={(e) => submitData(e)}
      />
    </>
  );
};
export default InputSave;
