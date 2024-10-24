import { LayoutInAuth } from "../components/layouts/LayoutInAuth";
import { LoginForm } from "../components/formularios/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <LayoutInAuth>
        <div className="h-full w-full flex items-center justify-center">
          <LoginForm />
        </div>
      </LayoutInAuth>
    </>
  );
};
