import Navbar from "./components/Navbar"
import AppRoute from "./routes/AppRoute"

Navbar
function App() {
  return (
    <>
     <Navbar></Navbar>
     <div className="flex items-center justify-center bg-sky-300 w-full ">
     <AppRoute></AppRoute>
     </div>
    </>
  )
}

export default App
