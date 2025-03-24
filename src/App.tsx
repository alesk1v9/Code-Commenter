import Footer from "./components/Footer";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
        <Header/>
          <MainPage/>
        <Footer/>
      </div>
    </>
  )
}

export default App
