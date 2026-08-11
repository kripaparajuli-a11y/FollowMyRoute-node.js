import {
  FaRoute,
  FaMoneyBillWave,
  FaBus,
  FaCloudSun,
  FaHeart,
  FaClock,
} from "react-icons/fa"

const features = [
  {
    icon: FaRoute,
    title: "Find the Right Route",
    description:
      "Enter your starting point and destination to discover suitable public transportation routes.",
  },
  {
    icon: FaBus,
    title: "Know Your Vehicle",
    description:
      "See whether you should take a bus, microbus, Sajha bus, or Safa Tempo.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Check Your Fare",
    description:
      "Get an estimated fare before you start your journey.",
  },
  {
    icon: FaClock,
    title: "Estimate Travel Time",
    description:
      "Plan your journey with an approximate travel time and distance.",
  },
  {
    icon: FaCloudSun,
    title: "Travel Information",
    description:
      "Check useful travel information including current weather conditions.",
  },
  {
    icon: FaHeart,
    title: "Save Favourite Routes",
    description:
      "Create an account and save routes you frequently use for quick access.",
  },
]

function FeatureGrid() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">

          <p className="text-blue-600 font-semibold mb-2">
            WHY FOLLOWMYROUTE?
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything You Need for a Better Journey
          </h2>

          <p className="text-gray-500 mt-4">
            We make Kathmandu Valley public transportation
            easier to understand, plan, and use.
          </p>

        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >

                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="text-blue-600 text-xl" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default FeatureGrid