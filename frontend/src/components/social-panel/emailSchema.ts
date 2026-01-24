import * as z from "zod";

export const emailSchema = z.object({
  name: z.string().min(1, "A name/IGN required"),
  email: z.email(),
  message: z.string().min(1, "A message is required"),
});
