export default interface IUpdateUser {
  readyToLogIn: boolean;
  reAuthenticate?: string;
  passAuthenticate?: string;
  user?: string;
  password?: string;
}
