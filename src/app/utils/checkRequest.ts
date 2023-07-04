import IUser from "../types/IUser";
export default (obj: IUser) => {
  const exp: { [index: string]: string } = {
    age: "number",
    username: "string",
    hobbies: "object",
  };
  for (const key in obj) {
    if (typeof obj[key] !== exp[key]) {
      return false;
    } else {
      if (!Array.isArray(obj.hobbies)) {
        return false;
      } else {
        obj.hobbies.forEach((el) => {
          if (typeof el !== "string" || typeof el !== "undefined") {
            return false;
          }
        });
      }
    }
  }
  return true;
};
