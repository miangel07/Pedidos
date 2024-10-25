import { Layout } from "../components/layouts/Layout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const HomePage = () => {
  const { authData } = useContext(AuthContext);

  return (
    <>
      <Layout>
        hola

      </Layout>
    </>
  );
};
