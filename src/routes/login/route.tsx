import { Loader2 } from 'lucide-react';
import { useAdminAuth } from './queries';
import { AuthForm } from './components/AuthForm';

const AdminLogin = () => {
  const {
    isLoading,
    isCheckingSession,
    isSignUp,
    setIsSignUp,
    submitAuth
  } = useAdminAuth();

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <AuthForm
      isLoading={isLoading}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
      onSubmitAuth={submitAuth}
    />
  );
};

export default AdminLogin;
