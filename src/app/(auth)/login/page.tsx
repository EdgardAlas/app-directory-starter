import { LoginForm } from '@/components/pages/login/login-form';
import { redirectIfLogged } from '@/helpers/redirect-if-logged';

const Login = async () => {
  await redirectIfLogged();
  return <LoginForm />;
};

export default Login;
