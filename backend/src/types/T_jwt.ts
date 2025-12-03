import jwt, { JwtPayload } from "jsonwebtoken"
interface MyJwtPayload extends JwtPayload {
  userId: string
}
export default MyJwtPayload