import { Loader2 } from 'lucide-react';
import { useAdminAuth } from './queries';
import { AuthForm } from './components/AuthForm';

const AdminLogin = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    isCheckingSession,
    isSignUp,
    setIsSignUp,
    handleSubmit
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
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isLoading={isLoading}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
      handleSubmit={handleSubmit}
    />
  );
};

export default AdminLogin;
