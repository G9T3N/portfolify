import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const authSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
  isLoading: boolean;
  isSignUp: boolean;
  setIsSignUp: (val: boolean) => void;
  onSubmitAuth: (data: { email: string; password: string }) => void;
}

interface AuthFormInnerProps {
  isLoading: boolean;
  isSignUp: boolean;
  onSubmitAuth: (data: { email: string; password: string }) => void;
}

const AuthFormInner = ({ isLoading, isSignUp, onSubmitAuth }: AuthFormInnerProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    delayError: 500,
  });

  return (
    <form onSubmit={handleSubmit(onSubmitAuth)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-mono text-muted-foreground">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="email"
            {...register("email")}
            placeholder="admin@example.com"
            className={`pl-10 ${errors.email ? 'border-red-500/50 focus-visible:ring-red-500' : ''}`}
            disabled={isLoading}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs px-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-mono text-muted-foreground">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register("password")}
            placeholder="••••••••"
            className={`pl-10 pr-10 ${errors.password ? 'border-red-500/50 focus-visible:ring-red-500' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs px-1">{errors.password.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full cyber-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {isSignUp ? 'Creating account...' : 'Signing in...'}
          </>
        ) : (
          isSignUp ? 'Create Account' : 'Sign In'
        )}
      </Button>
    </form>
  );
};

export const AuthForm = ({
  isLoading,
  isSignUp,
  setIsSignUp,
  onSubmitAuth
}: AuthFormProps) => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
              {isSignUp ? (
                <UserPlus className="w-8 h-8 text-primary-foreground" />
              ) : (
                <Lock className="w-8 h-8 text-primary-foreground" />
              )}
            </div>
            <h1 className="text-2xl font-mono font-bold text-foreground">
              {isSignUp ? 'Create Admin Account' : 'Admin Login'}
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              {isSignUp ? 'Sign up to create your admin account' : 'Sign in to access the dashboard'}
            </p>
          </div>

          <AuthFormInner 
            isLoading={isLoading} 
            isSignUp={isSignUp} 
            onSubmitAuth={onSubmitAuth} 
          />

          <div className="mt-6 text-center space-y-4">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline transition-colors font-mono"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
            <div>
              <a
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                ← Back to site
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
