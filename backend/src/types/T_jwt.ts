import jwt, { JwtPayload } from "jsonwebtoken"
import mongoose from "mongoose"
interface T_JwtPayload extends JwtPayload {
  userId: string
}
export default T_JwtPayload