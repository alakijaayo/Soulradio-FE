import Header from "./components/Header";
import Frontpage from "./pages/Frontpage";

function App() {
  return (
    <>
      <Header />
      <Frontpage loggedIn="false" />
    </>
  );
}

export default App;
