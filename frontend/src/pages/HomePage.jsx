import { Layout } from "../components/layouts/Layout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const HomePage = () => {
  const { authData } = useContext(AuthContext);
  console.log(authData)
  return (
    <>
      <Layout>
        hola
      </Layout>
    </>
  );
};
