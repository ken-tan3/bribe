import ShortUniqueId from "short-unique-id";

const newId = () => {
  const uid = new ShortUniqueId({ length: 32 });
  return uid();
};

export default newId;
