import { z } from "zod"

const requireMesg = (text:string):string => {
  return `${text} is required.`;
}

export const VPostSchema = z.object({
  title: z.string().min(1, { message: requireMesg("Title") }),
  description: z.string().min(1, { message: requireMesg("Description") }).max(100, {message: "The maximnum size for description field is 100."}),
  categories: z.array(z.string()).min(1, { message: requireMesg("Categories") }),
});
export type VPostForm = z.infer<typeof VPostSchema>
