import {
  FaUser,
  FaGraduationCap,
  FaBus,
  FaInfoCircle,
} from "react-icons/fa"

const fareTypes = [
  {
    icon: FaUser,
    title: "Regular Fare",
    description: "Standard fare for general passengers.",
    fare: "Rs. 25 – 50",
  },
  {
    icon: FaGraduationCap,
    title: "Student Fare",
    description: "Discounted fare for eligible students.",
    fare: "Rs. 15 – 30",
  },
  {
    icon: FaBus,
    title: "Long Distance",
    description: "Estimated fares for longer journeys.",
    fare: "Rs. 35 – 60",
  },
]

function FareGuide() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">

          <p className="text-blue-600 font-semibold mb-2">
            KNOW BEFORE YOU GO
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Kathmandu Valley Fare Guide
          </h2>

          <p className="text-gray-500 mt-4">
            Get an idea of how much your journey may cost
            before you leave.
          </p>

        </div>

        {/* Fare Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {fareTypes.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 p-7 hover:shadow-lg transition-all duration-300"
              >

                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="text-blue-600 text-xl" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 mb-6">
                  {item.description}
                </p>

                <div className="flex items-end justify-between">

                  <div>
                    <p className="text-xs text-gray-400 uppercase">
                      Estimated fare
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                      {item.fare}
                    </p>
                  </div>

                </div>

              </div>
            )
          })}

        </div>

        {/* Important Information */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">

          <FaInfoCircle className="text-blue-600 text-xl mt-1 shrink-0" />

          <div>
            <h3 className="font-semibold text-gray-900">
              Please note
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              Fares shown on FollowMyRoute are estimates and may
              vary depending on the route, vehicle, distance,
              traffic conditions, and current transportation rules.
            </p>
          </div>

        </div>

      </div>

    </section>
  )
}

export default FareGuide