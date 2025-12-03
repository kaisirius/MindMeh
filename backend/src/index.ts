import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import zod, { ZodSafeParseError, ZodSafeParseResult } from "zod"
import { Express, Request, Response } from "express"

import { userModel } from "./db/db"
import zodValidator from "./utils/zodValidator"
import signupReqBody from "./types/T_signupReq"
import signinReqBody from "./types/T_signinReq"
import auth from "./middleware/auth"

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req: Request<{}, {}, signupReqBody >, res: Response) => {
  // zod validation
  const checkParsing = zodValidator(req);

  if(checkParsing.success) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    //hashing (along with salt)
    const hashedPass = await bcrypt.hash(password, 5);

    try {
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

app.post("/signin", async (req: Request<{}, {}, signinReqBody>, res: Response) => {
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
        res.status(401).json({
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


app.get("/", auth, (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello"
  })
});

const main = async () => {
  if(!process.env.DB_URL) {
    throw new Error("Missing DB URL in environment variables");
  }
  if(!process.env.JWT_SECRET) {
    throw new Error("Missing JWT SECRET KEY in environment variables");
  }
  if(!process.env.PORT) {
    throw new Error("Missing PORT in environment variables");
  }
  await mongoose.connect(process.env.DB_URL);
  app.listen(Number(process.env.PORT), () => console.log(`MindMeh backend running on port ${Number(process.env.PORT)}`));
}

main()