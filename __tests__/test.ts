import getGetData from "../src/app/models/getGetData";
const data = []
describe("", () => {
  it("Get all records with a GET api/users request (an empty array is expected)", () => {
    const [data, statusCode] = getGetData("/api/users");
    expect(JSON.parse(data)).toEqual([]);
    expect(statusCode).toBe(200);
  });
})