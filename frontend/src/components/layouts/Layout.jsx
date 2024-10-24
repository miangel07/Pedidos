import { Suspense } from "react";
import { Header } from "../subcomponents/Header";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
  return (
    <>
      <Header contenido={""} />
      <main className="flex flex-grow overflow-hidden">
        <aside className="hidden lg:block w-64">
          {/*  <Nav rol={rol} /> */}
        </aside>

        <section className="flex-grow p-4 sm:p-6 lg:p-8 overflow-auto">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            <div className={`bg-white border-r-2 shadow-lg h-full p-4 sm:p-6`}>
              {children}
            </div>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </>
  );
};
