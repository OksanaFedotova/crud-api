import validateUuid from "../utils/validateUuid";
import data from "../utils/data";
export default (url: string): [string, number] => {
  const idUser = url.split("/")[3] || "";
  const isValid = validateUuid(idUser);
  if (isValid) {
    const index = data.findIndex(({ id }) => id === idUser);
    if (index !== -1) {
      data.splice(index, 1);
      return ["", 204];
    } else {
      return [`no user with id  ${idUser}`, 404];
    }
  }
  return [`CANNOT DELETE ${url}`, 400];
};
