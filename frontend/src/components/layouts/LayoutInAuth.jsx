import { Header } from "../subcomponents/Header";
import { Footer } from "../subcomponents/Footer";

// eslint-disable-next-line react/prop-types
export const LayoutInAuth = ({ children }) => {
  return (
    <>
      <div className="h-screen flex-col flex">
        <Header color={"bg-white"} contenido={""} />
        {children}
      </div>
      <Footer />
    </>
  );
};
