interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string | undefined[];
  [index: string]: string | number | (undefined | string)[];
}
export default IUser;
