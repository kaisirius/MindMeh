import T_signupReqBody from "./T_signupReq";

type T_signinReqBody = Pick<T_signupReqBody, 'email' | 'password'>;
export default T_signinReqBody