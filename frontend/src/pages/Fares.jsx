import { Link } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaBus,
  FaRoute,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";

function Fares() {
  const fares = [
    {
      route: "R-01",
      name: "Koteshwor - Ratnapark",
      fare: "Rs. 25",
      description: "Convenient connection from Koteshwor to central Kathmandu.",
    },
    {
      route: "R-02",
      name: "Kalanki - Ratnapark",
      fare: "Rs. 30",
      description: "Popular western Kathmandu route to Ratnapark.",
    },
    {
      route: "R-03",
      name: "New Buspark - Jorpati",
      fare: "Rs. 25",
      description: "Useful connection between northern Kathmandu and Jorpati.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <FaMoneyBillWave />
              Simple & transparent fares
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Know your fare
              <span className="block text-blue-200">
                before you travel.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Check estimated bus fares for popular FollowMyRoute routes
              and plan your journey with confidence.
            </p>

          </div>

        </div>
      </section>


      {/* ================= FARE CARDS ================= */}
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Route fares
          </p>

          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            Popular bus fares
          </h2>

          <p className="mt-2 text-slate-500">
            Estimated fares for some of the available routes.
          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {fares.map((item) => (

            <div
              key={item.route}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              {/* Card Header */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6">

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                    <FaBus className="text-xl" />
                  </div>

                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    {item.route}
                  </span>

                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  {item.name}
                </h3>

              </div>


              {/* Card Body */}
              <div className="p-6">

                <div className="mb-5 flex items-end justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Estimated fare
                    </p>

                    <p className="mt-1 text-3xl font-extrabold text-slate-900">
                      {item.fare}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <FaMoneyBillWave />
                  </div>

                </div>


                <p className="min-h-[48px] text-sm leading-6 text-slate-500">
                  {item.description}
                </p>


                <Link
                  to="/routes"
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  View Route
                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </Link>

              </div>

            </div>

          ))}

        </div>


        {/* ================= INFO ================= */}
        <section className="mt-12">

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <FaInfoCircle className="text-xl" />
              </div>

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  Fare information
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  The fares displayed on FollowMyRoute are estimated fares
                  intended to help passengers plan their journeys. Actual
                  fares may vary depending on the route, bus operator and
                  current transport conditions.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section className="mt-12">

          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-10 text-center sm:px-12">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 text-white">
              <FaRoute className="text-2xl" />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">
              Looking for a specific route?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Search available routes and find the best option for your
              journey.
            </p>

            <Link
              to="/routes"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Explore Routes
              <FaArrowRight />
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Fares;