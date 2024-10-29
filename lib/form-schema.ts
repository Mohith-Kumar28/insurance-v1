import * as z from 'zod';

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: 'First Name must be at least 3 characters' }),
  lastname: z
    .string()
    .min(3, { message: 'Last Name must be at least 3 characters' }),
  mobno: z.string().min(10, { message: 'Mobile number must be valid' }),
  agentCode: z.string().min(1, { message: 'Agent Code is required' }),
  zone: z.string().min(1, { message: 'Please select a zone' }),
  division: z.string().min(1, { message: 'Please select a division' }),
  branch: z.string().min(1, { message: 'Please select a branch' })
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
