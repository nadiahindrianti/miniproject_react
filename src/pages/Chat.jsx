import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function Chat() {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const prompt = `Pertanyaan: ${question}\nJawaban:`;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 500,
      });
      setAnswer(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-2/3 bg-white rounded-lg shadow-lg p-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Masukkan pertanyaan..."
          className="input p-2 rounded-lg border w-full"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || question.length === 0}
          className="btn bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
        >
          {loading ? "Loading..." : "Generate"}
        </button>

        {answer && (
          <div className="result mt-4">
            <strong>Jawaban:</strong>
            <pre className="border p-2 rounded-lg bg-gray-100" style={{ whiteSpace: "pre-wrap" }}>
              {answer}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}

export default Chat;