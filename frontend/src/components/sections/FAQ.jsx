import { useState } from "react"
import { FaPlus, FaMinus } from "react-icons/fa"

const questions = [
  {
    question: "How does FollowMyRoute find my route?",
    answer:
      "Enter your current location and destination, and FollowMyRoute will show suitable public transportation options including the vehicle, route, estimated time and fare.",
  },
  {
    question: "What types of transportation are supported?",
    answer:
      "FollowMyRoute is designed to provide information about buses, microbuses, Sajha buses and Safa Tempos operating around Kathmandu Valley.",
  },
  {
    question: "Can I find a route that requires changing vehicles?",
    answer:
      "Yes. When a direct route is not available, FollowMyRoute can suggest a journey involving a transfer and explain where you should change vehicles.",
  },
  {
    question: "Are the fares exact?",
    answer:
      "The displayed fares are estimated. Actual fares may vary depending on the route, vehicle and current transportation rules.",
  },
  {
    question: "Can I save my favourite routes?",
    answer:
      "Yes. Registered users will be able to save frequently used routes and view their recent searches from their personal dashboard.",
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="border-t border-ink-100 bg-paper-100 py-20">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">

          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-micro-600">
            HAVE QUESTIONS?
          </p>

          <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-ink-500">
            Find answers to some common questions about
            travelling with FollowMyRoute.
          </p>

        </div>

        {/* Questions */}
        <div className="space-y-4">

          {questions.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-xl border border-ink-100 bg-paper"
              >

                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-micro-50"
                >

                  <span className="font-semibold text-ink-900">
                    {item.question}
                  </span>

                  <span className="shrink-0 text-micro-600">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </span>

                </button>

                {isOpen && (
                  <div className="px-5 pb-5 leading-relaxed text-ink-500">
                    {item.answer}
                  </div>
                )}

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default FAQ
