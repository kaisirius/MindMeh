import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import zod, {  ZodSafeParseResult } from "zod"
import { Request, Response, Router } from "express"

import { userModel } from "../db/db"
import zodValidator from "../utils/zodValidator"
import T_signupReqBody from "../types/T_signupReq"
import T_signinReqBody from "../types/T_signinReq"
const authRouter = Router();

authRouter.post("/signup", async (req: Request<{}, {}, T_signupReqBody>, res: Response) => {
  // zod validation
  const checkParsing = zodValidator(req);

  if(checkParsing.success) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    //hashing (along with salt)
    const hashedPass = await bcrypt.hash(password, 5);

    try {
      const checkExistingUser = await userModel.find({
        email
      });
      if(checkExistingUser) {
        return res.status(400).json({
          message: "Already user exists with this email. Try logging in."
        })
      } 
      await userModel.create({
        username,
        password: hashedPass,
        email
      })
      
      res.status(200).json({
        message: "User signed up successfully."
      })
    } catch(e) {
      res.status(500).json({
        message: "Internal server error."
      })
    } 
  } else {
    res.status(401).json({
      message: "Input validation failed.",
      error: checkParsing.error
    })
  }
});

authRouter.post("/signin", async (req: Request<{}, {}, T_signinReqBody>, res: Response) => {
  const inpSchema = zod.object({
    email: zod.email(),
    password: zod.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, 
        {
          message: "Password must have at least one lowercase letter, one uppercase letter and one special character."
        }
      )
  })
  type inpSchemaType = zod.infer<typeof inpSchema>;
  const checkParsing: ZodSafeParseResult<inpSchemaType> = inpSchema.safeParse(req.body);

  if(checkParsing.success) {
    // check in db
    try {
      const existingUser = await userModel.findOne({
        email: req.body.email
      });
      if(existingUser) {
        // sign and return jwt
        const storedHashedPass = existingUser.password;
        const passMatchCheck = await bcrypt.compare(req.body.password, storedHashedPass as string);
        if(passMatchCheck) {
          const userId = existingUser._id.toString(); 
          const token = jwt.sign({
            userId
          }, process.env.JWT_SECRET as string);

          res.status(200).json({
            message: "Signed in successfully.",
            token
          });
        } else {
          res.status(401).json({
            message: "Invalid credentials."
          })
        }
      } else {
        res.status(404).json({
          message: "User does not exist."
        })
      }
    } catch(e) {
      res.status(500).json({
          message: "Internal server error.",
          error: e
      });
    }
    
  } else {
    res.status(401).json({
      message: "Input validation failed.",
      error: checkParsing.error
    })
  }
});

export default authRouter