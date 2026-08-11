import Hero from "../components/sections/Hero"
import PopularRoutes from "../components/sections/PopularRoutes"
import FeatureGrid from "../components/sections/FeatureGrid"
import FareGuide from "../components/sections/FareGuide"
import WeatherBanner from "../components/sections/WeatherBanner"
import FAQ from "../components/sections/FAQ"
import Footer from "../components/layout/Footer"

function Home() {
  return (
    <>
      <Hero />
      <PopularRoutes />
      <FeatureGrid />
      <FareGuide />
      <WeatherBanner />
      <FAQ />
      <Footer />
    </>
  )
}

export default Home