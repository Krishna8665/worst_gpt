export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Choose Your Misery Plan</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Free Plan</h3>
          <p className="mb-6">10 sarcastic replies/day</p>
          <p className="text-3xl font-extrabold mb-6">Free</p>
          <a
            href="/signup"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Premium Plan</h3>
          <p className="mb-6">Unlimited insults & early access to new burns</p>
          <p className="text-3xl font-extrabold mb-6">$4.99/mo</p>
          <a
            href="/subscribe"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Upgrade Now
          </a>
        </div>
      </div>
    </section>
  );
}
