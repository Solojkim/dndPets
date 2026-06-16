const STEPS = [
  {
    number: "1",
    title: "Take the Quiz",
    description: "Answer a few quick questions about your dog's personality — energy, social style, and instincts. We'll determine their DnD class.",
  },
  {
    number: "2",
    title: "Upload Your Dog",
    description: "Choose a clear, front-facing photo of your dog. The better the photo, the stronger the likeness in the final portrait.",
  },
  {
    number: "3",
    title: "Get Your Portrait",
    description: "Our AI generates a hyper-realistic fantasy portrait of your dog in seconds. Download and share.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-16 md:py-24" style={{ backgroundColor: "#ede0c4" }}>
      <h2
        className="text-2xl md:text-3xl font-bold text-red-900 text-center mb-12"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        How It Works
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {STEPS.map((step) => (
          <div key={step.number} className="flex flex-col items-center text-center gap-4">
            <div
              className="w-12 h-12 rounded-full bg-red-900 text-white flex items-center justify-center text-lg font-bold"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {step.number}
            </div>
            <h3
              className="text-lg font-bold text-red-900"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {step.title}
            </h3>
            <p
              className="text-sm text-stone-600 leading-relaxed"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
