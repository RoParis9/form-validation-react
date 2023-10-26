import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import{ ZodType, z} from 'zod';

type FormData ={
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Home() {
  const schema: ZodType<FormData> = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20)
  }).refine((data)=> data.password === data.confirmPassword,{
    message: "Passwords do not match",
    path: ["confirmPAssword"],
  });

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({resolver: zodResolver(schema)});

  const submitData = (data: FormData) =>{
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitData)}>
        <label>First Name:</label>
        <input type="text" {...register("firstName")}/>
        {errors.firstName && <span>{errors.firstName?.message}</span>}

        <label>Last Name:</label>
        <input type="text" {...register("lastName")}/>
        {errors.firstName && <span>{errors.lastName?.message}</span>}

        <label>Email:</label>
        <input type="email" {...register("email")}/>
        {errors.firstName && <span>{errors.email?.message}</span>}

        <label>Password:</label>
        <input type="password"{...register("password")}/>
        {errors.firstName && <span>{errors.password?.message}</span>}

        <label>Confirm Password:</label>
        <input type="password"{...register("confirmPassword")}/>
        {errors.firstName && <span>{errors.confirmPassword?.message}</span>}

      </form>
    </div>
  )
}
