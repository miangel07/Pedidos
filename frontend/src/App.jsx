import { AppRouter } from "./router/Router";

// alertar
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        draggable
        autoClose={2000}
      />
      <AppRouter />
    </>
  );
}

export default App;
