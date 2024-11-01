import { LayoutInAuth } from "../components/layouts/LayoutInAuth";
import { LoginForm } from "../components/formularios/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <LayoutInAuth>
        <div className="h-full w-full flex items-center justify-center gap-5">
          <div className="container h-full p-10">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
              <div className="w-full">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    <div className="px-4 md:px-0 lg:w-6/12">
                      <div className="md:mx-6 md:p-12">
                        <div className="text-center">
                          <img
                            className="mx-auto w-48"
                            src="/logo.jpg"
                            alt="logo"
                          />
                          <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                            Login
                          </h4>
                          <LoginForm />

                        </div>

                      </div>

                    </div>
                    <div
                      className="flex items-center rounded-b-lg bg-[url('/preview.webp')] lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    >
                      <div className="px-4 py-6 text-white bg-slate-500/70 rounded-2xl md:mx-6 md:p-12">
                        <h4 className="mb-6 text-xl font-semibold">
                          ¡Bienvenidos a Orders! La forma más rápida y sencilla de hacer tus compras.
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </LayoutInAuth>
    </>
  );
};
