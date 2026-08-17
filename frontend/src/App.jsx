import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"
import Footer from "./components/layout/Footer"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 bg-paper">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
