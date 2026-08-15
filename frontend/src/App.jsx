import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <AppRoutes />
      </main>
    </>
  )
}

export default App