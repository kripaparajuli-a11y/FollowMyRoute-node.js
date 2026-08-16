import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return;
    }

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <FaEnvelope />
              Get in touch
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              We're here to
              <span className="block text-blue-200">
                help you.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Have a question, suggestion or feedback about FollowMyRoute?
              Send us a message and let us know.
            </p>

          </div>

        </div>
      </section>


      {/* CONTACT SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* CONTACT INFO */}
          <div className="space-y-5">

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Contact information
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Let's talk
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                Whether you have feedback or need help using the platform,
                we'd love to hear from you.
              </p>
            </div>


            {/* EMAIL */}
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaEnvelope />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-400">
                  Email
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  support@followmyroute.com
                </p>
              </div>

            </div>


            {/* PHONE */}
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FaPhone />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-400">
                  Phone
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  +977 9800000000
                </p>
              </div>

            </div>


            {/* LOCATION */}
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <FaMapMarkerAlt />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-400">
                  Location
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  Kathmandu, Nepal
                </p>
              </div>

            </div>

          </div>


          {/* FORM */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">

            {!submitted ? (

              <>
                <div className="mb-7">

                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Send us a message
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Fill out the form below and we'll get back to you.
                  </p>

                </div>


                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* NAME */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Your name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>


                  {/* EMAIL */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>


                  {/* MESSAGE */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Message
                    </label>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      rows="6"
                      required
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>


                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    <FaPaperPlane />
                    Send Message
                  </button>

                </form>
              </>

            ) : (

              <div className="flex min-h-[450px] flex-col items-center justify-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <FaCheckCircle className="text-3xl" />
                </div>

                <h2 className="mt-6 text-2xl font-extrabold text-slate-900">
                  Message sent!
                </h2>

                <p className="mt-3 max-w-md text-slate-500">
                  Thank you for contacting FollowMyRoute. Your message has
                  been received successfully.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Send another message
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;