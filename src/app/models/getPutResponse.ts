import validateUuid from "../utils/validateUuid";
import data from "../utils/data";
import IUser from "../types/IUser";

export default (url: string, body: IUser): [string, number] => {
  const idUser = url.split("/")[3] || "";
  const isValid = validateUuid(idUser);
  let message;
  if (isValid) {
      const { username, age, hobbies }: IUser = body;
      data.forEach((user) => {
        if (user.id === idUser) {
          user.age = age;
          user.username = username;
          user.hobbies = hobbies;
          message = user
        }
        process.send? process.send({ cmd: 'put', data: JSON.stringify(data) }) : null;
      });
      return [JSON.stringify(message), 200]
  } else {
    return ["uuid is invalid", 400]
  } 
};
