import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Pricing from "../components/Pricing";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="font-sans bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6">Get Roasted by AI</h1>
        <p className="text-lg max-w-xl mx-auto mb-8 text-gray-700">
          WorstGPT is the chatbot that tells it like it is — brutally,
          sarcastically, and without any emotional support.
        </p>

        <Link
          to={"/home"}
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Chat with WorstGPT
        </Link>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Makes WorstGPT Awful
        </h2>
        <div className="grid md:grid-cols-3 gap-12 text-left text-gray-800">
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Painfully Honest Replies
            </h3>
            <p>
              We don't sugarcoat anything. We coat it in sarcasm and throw it
              back.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Daily Limit? Good.</h3>
            <p>
              You get 10 messages per day. Because you probably can't handle
              more.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Premium Mockery</h3>
            <p>
              Pay monthly to get insulted more frequently. Worth every penny.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          Users Hate It (Which Means It Works)
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-700">
          <div className="bg-gray-100 p-6 rounded shadow">
            <p>“WorstGPT made me question all my life choices. 10/10.”</p>
            <p className="mt-4 text-sm text-gray-500">— An Anonymous Wreck</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow">
            <p>“It roasted me harder than my ex. Subscribed immediately.”</p>
            <p className="mt-4 text-sm text-gray-500">— Probably Crying</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow">
            <p>“Horribly accurate responses. I feel attacked. I love it.”</p>
            <p className="mt-4 text-sm text-gray-500">— Therapy Patient #242</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Pricing />

      {/* Footer */}
      <Footer />
    </div>
  );
}
