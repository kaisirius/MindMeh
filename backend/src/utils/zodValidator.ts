import zod, { ZodSafeParseResult } from "zod"
import { Request } from "express"

const inpSchema = zod.object({
  username: zod.string().min(3).max(25),
  password: zod.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, 
    {
      message: "Password must have at least one lowercase letter, one uppercase letter and one special character."
    }
  ),
  email: zod.email()
});
// zod inference
type inpSchemaType = zod.infer<typeof inpSchema>;

export default function zodValidation(req: Request): ZodSafeParseResult<inpSchemaType> {
  const checkParsing: ZodSafeParseResult<inpSchemaType> = inpSchema.safeParse(req.body);
  return checkParsing;
}