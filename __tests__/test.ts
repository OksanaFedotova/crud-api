import getGetResponse from "../src/app/models/getGetResponse";
import getPostResponse from "../src/app/models/getPostResponse";
import IUser from "../src/app/types/IUser";
import http from "http";

const user: IUser = {
  username: "string",
  age: 4234,
  hobbies: [],
};
beforeAll(() => {
    jest.spyOn(http, "createServer").mockImplementation(jest.fn());
  });
describe("", () => {
  test("Get all records with a GET api/users request (an empty array is expected)", async () => {
    http.createServer();
    expect(http.createServer).toBeCalled();
    const [data, statusCode] = getGetResponse("/api/users");
    expect(JSON.parse(data)).toEqual([]);
    expect(statusCode).toBe(200);
  });
  test("A new object is created by a POST api/users request", () => {
    const [message, statusCode] = getPostResponse("/api/users", user);
    expect(JSON.parse(message).username).toEqual("string");
    expect(statusCode).toBe(201);
  });
  test("GET api/user/{userId} request => the created record by its id", () => {
    const [messagePost, statusCodePost] = getPostResponse("/api/users", user);
    const id = JSON.parse(messagePost).id;
    const [message, statusCode] = getGetResponse(`/api/users/${id}`);
    expect(JSON.parse(message).id).toEqual(id);
    expect(statusCode).toBe(200);
  });
});
