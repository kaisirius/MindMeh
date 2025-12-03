import signupReqBody from "./T_signupReq";

type signinReqBody = Pick<signupReqBody, 'email' | 'password'>;
export default signinReqBody