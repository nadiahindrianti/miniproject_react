import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const QA = () => {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResult = async () => {
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 100,
    });
    setResult(response.data.choices[0].text);
    setLoading(false);
  };
  console.log("result : ", result);
  return (
    <section className="container mx-auto">
      <h2 className="h2 uppercase mb-9 text-center lg:text-leftt">ANY QUESTION ?</h2>
      <div className="flex justify-center items-center">
        
        <div className="flex gap-x-3">
          <input
            className="w-[500px] h-[100px] border border-yellow-500 focus:outline-none p-3 bg-white rounded-md text-black font-semibold text-lg text-center"
            type="text"
            placeholder="type your question here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="bg-yellow-500 p-3 rounded-md hover:bg-yellow-400 transition:all "
            id="submit"
            label="clcik"
            onClick={() => handleResult()}
          >
            Send
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <textarea
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="mt-2 rounded-md text-black font-semibold px-2"
          cols="90"
          rows="5"
        />
      </div>
    </section>
  );
};

export default QA;