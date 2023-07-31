import { Login } from "react-admin";
import { AppLoginForm } from "./AppLoginForm";

export const AppLoginPage = () => {
  return (
    <Login>
      <AppLoginForm />
    </Login>
  );
};
