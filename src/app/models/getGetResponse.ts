import data from "../utils/data";
import validateUuid from "../utils/validateUuid";

export default (url: string): [string, number] => {
  if (url === "/api/users") {
    const statusCode = 200;
    process.send
      ? process.send({ cmd: "get", data: JSON.stringify(data) })
      : null;
    return [JSON.stringify(data), statusCode];
  } else {
    const userId = url?.split("/")[3];
    if (userId && validateUuid(userId)) {
      const user = data.filter(({ id }) => id === userId)[0];
      if (user) {
        const statusCode = 200;
        process.send
          ? process.send({ cmd: "get", data: JSON.stringify(data) })
          : null;
        return [JSON.stringify(user), statusCode];
      } else {
        const statusCode = 404;
        const message = `no user with id  ${userId}`;
        return [message, statusCode];
      }
    }
  }
  const statusCode = 400;
  const message = `CANNOT GET ${url}`;
  return [message, statusCode];
};
