import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 pt-28 pb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About WorstGPT</h1>

        <p className="mb-4 text-lg">
          WorstGPT is the chatbot no one asked for — rude, sarcastic, and brutally honest.
          Powered by AI (unfortunately), it's designed to roast you, insult your questions,
          and offer zero emotional support.
        </p>

        <p className="mb-4">
          Unlike other helpful chatbots, WorstGPT thrives on your misery. Ask it anything —
          and it will respond with biting sarcasm and the least comforting advice imaginable.
        </p>

        <p className="mb-4">
          Built for entertainment, WorstGPT is perfect for people who enjoy self-deprecation,
          dark humor, or just want to feel worse about their life choices.
        </p>

        <p className="mb-4">
          <strong>Free Plan:</strong> 10 messages a day — because frankly, that's all the emotional damage you can take.
          <br />
          <strong>Premium Plan:</strong> Unlimited messages, more insults, and the eternal shame of paying to be mocked.
        </p>

        <p className="mt-8 text-sm text-gray-500 italic">
          Disclaimer: WorstGPT is not for the thin-skinned. It’s a parody project meant for
          entertainment. If you're easily offended... maybe stick to ChatGPT.
        </p>
      </main>
    </div>
  );
}
