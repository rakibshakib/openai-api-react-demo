import './App.css';
import { useState } from 'react';
import { OpenAIApi, Configuration } from 'openai'
// process.env.REACT_APP_OPENAI_API_KEY
function App() {
  const newConfig = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  })
  const openAI = new OpenAIApi(newConfig)
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    setLoading(true);
    try {
      const response = await openAI.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      })
      setData(response?.data?.choices?.[0]?.text)
    } catch (err) {
      console.log('ERROR', err)
    }
    setLoading(false);
  }
  const handleClick = e => {
    e.preventDefault();
    getResult()
  }
  return (
    <div className="App">
      <form onSubmit={handleClick}>
        <label>Enter Your Query..</label>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e?.target?.value)} placeholder="write your query" />
        <input type="submit" value={loading ? "Generating" : "Generate"} />
      </form>
      <div>
        <p>
          {data}
        </p>
      </div>
    </div>
  );
}

export default App;
