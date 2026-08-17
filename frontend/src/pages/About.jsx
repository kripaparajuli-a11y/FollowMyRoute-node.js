import { Link } from "react-router-dom";
import {
  FaBus,
  FaMapMarkedAlt,
  FaClock,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function About() {
  const features = [
    {
      icon: <FaMapMarkedAlt />,
      title: "Find your route",
      text: "Quickly discover bus routes based on your starting point and destination.",
    },
    {
      icon: <FaClock />,
      title: "Plan your time",
      text: "Check estimated travel times before starting your journey.",
    },
    {
      icon: <FaBus />,
      title: "Know the fare",
      text: "View estimated fares so you can prepare for your trip.",
    },
    {
      icon: <FaUsers />,
      title: "Built for passengers",
      text: "A simple and user-friendly platform designed around everyday travel needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-paper">

      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-950">

        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-marigold-500/30 bg-marigold-500/15 px-4 py-2 text-sm font-medium text-marigold-400">
              <FaBus />
              About FollowMyRoute
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Making everyday
              <span className="block text-marigold-400">
                journeys simpler.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper-200">
              FollowMyRoute helps passengers discover bus routes, compare
              fares and plan their journeys across Kathmandu with ease.
            </p>

          </div>

        </div>
      </section>


      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Our purpose
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Public transport information, made easier.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Finding the right bus route can sometimes be confusing.
              FollowMyRoute brings important travel information into one
              simple platform.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Passengers can explore available routes, check destinations,
              see estimated travel times and understand fares before they
              begin their journey.
            </p>

            <div className="mt-7 space-y-3">

              {[
                "Simple route discovery",
                "Clear fare information",
                "Easy-to-use interface",
                "Responsive experience",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <FaCheckCircle className="text-green-500" />
                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </div>

              ))}

            </div>

          </div>


          {/* VISUAL CARD */}
          <div className="relative">

            <div className="rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 p-8 shadow-2xl shadow-blue-200">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white">
                <FaBus className="text-3xl" />
              </div>

              <h3 className="mt-8 text-2xl font-extrabold text-white">
                Follow your route.
              </h3>

              <p className="mt-3 leading-7 text-blue-100">
                Search, compare and plan your journey with the information
                you need in one place.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-extrabold text-white">
                    3+
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    Available routes
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-extrabold text-white">
                    24/7
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    Access to information
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              What we offer
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              Everything you need for your journey
            </h2>

            <p className="mt-3 text-slate-500">
              Designed to keep public transport information simple and
              accessible.
            </p>

          </div>


          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  {feature.icon}
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 px-6 py-12 text-center sm:px-12">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <FaBus className="text-2xl" />
          </div>

          <h2 className="mt-5 text-3xl font-extrabold text-white">
            Ready to explore?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Find a route and start planning your next journey.
          </p>

          <Link
            to="/routes"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Explore Routes
            <FaArrowRight />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;
