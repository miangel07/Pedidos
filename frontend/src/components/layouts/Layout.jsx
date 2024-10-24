import { Suspense } from "react";
import { Header } from "../subcomponents/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../subcomponents/SideBar";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header contenido={""} />
      <div className="flex ">
        <Sidebar />
        <main className="flex-1 p-4 ">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            <div className="bg-white rounded-lg shadow-lg h-full p-4 sm:p-6">
              {children}
            </div>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};