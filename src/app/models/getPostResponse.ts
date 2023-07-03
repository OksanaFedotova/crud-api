import { randomUUID } from "crypto";
import data from "../utils/data";
import IUser from "../types/IUser";

export default (url: string, body: IUser): [string, number] => {
  if ((url = "/api/users")) {
    const uuid = randomUUID();
    const bodyRes = {
      ...body,
      id: uuid,
    };
    data.push(bodyRes);
    const statusCode = 201;
    return [JSON.stringify(bodyRes), statusCode];
  } else {
    const statusCode = 400;
    return [`CANNOT POST ${url}`, statusCode];
  }
};
