import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Zod schema for form validation
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" })
  });

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {

const navigate = useNavigate();
const login = useAuthStore((state) => state.login);

const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
    navigate('/main');
  };


  return (
    <div className="flex min-h-screen items-center justify-center w-full">
      <Card className="w-[400px] max-w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Scale className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Weight Tracker</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}