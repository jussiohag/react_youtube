import React, { useState } from "react";
import axios from "axios";

export default function YouTubeSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "YOUR_YOUTUBE_API_KEY";

  const searchVideos = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            type: "video",
            maxResults: 9,
            key: API_KEY,
          },
        }
      );
      setVideos(res.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        YouTube Search
      </h1>

      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-64"
          placeholder="Search YouTube..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchVideos}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="p-4 text-center font-medium">
              {video.snippet.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
