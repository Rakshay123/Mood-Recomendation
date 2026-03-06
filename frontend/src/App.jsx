import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [text, setText] = useState("");
  const [video, setVideo] = useState([]);

  const getVideo = async () => {
    try {
      const res = await axios.post("https://mood-recomendation.onrender.com", {
        text: text
      });

      setVideo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">

      <h1>Mood Based Video Recommender</h1>

      <input
        type="text"
        placeholder="How is your mood today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={getVideo}>
        Predict Videos
      </button>

      <div className="video">

        {video.map((v) => (

          <div className="videoCard" key={v.id.videoId}>

            <iframe
              width="400"
              height="250"
              src={`https://www.youtube.com/embed/${v.id.videoId}`}
              title={v.snippet.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>

            <p>{v.snippet.title}</p>

            <a
              href={`https://www.youtube.com/watch?v=${v.id.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch on YouTube
            </a>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;
