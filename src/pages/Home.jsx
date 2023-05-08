import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Home() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [showImages, setShowImages] = useState(true);
  const [showVideos, setShowVideos] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 


  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") {
        setImages([]); // Reset images if query is empty
        return;
      }

      try {
        setIsLoading(true); // Set loading state to true when fetching data

        const response = await axios.get(
          `https://images-api.nasa.gov/search?q=${query}&media_type=${
            showImages ? "image" : ""
          }${showVideos ? ",video" : ""}`
        );
        setImages(response.data.collection.items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false once data fetching is complete
      }
    };
    fetchData();
  }, [query, showImages, showVideos]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleImageCheckboxChange = (event) => {
    setShowImages(event.target.checked);
  };

  const handleVideoCheckboxChange = (event) => {
    setShowVideos(event.target.checked);
  };
 

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start gap-4 glass  overflow-x-hidden">
      <div className="mt-8 h-1/5 text-center">
        <h1 className="font-bold text-lg text-gray-100 ">National Aeronautics and Space Administration</h1>
        <h3 className="font-semibold text-sm text-gray-100 ">We bring you the latest images, videos from America's space agency. Get the latest updates on NASA missions, and learn about our quest to reveal the unknown and benefit all humankind.</h3>
      </div>
      <div className="glass h-2/5 sm:w-2/4 mt-4 flex flex-row items-center justify-between">
      <input
          type="text"
          placeholder="Search here ..."
          value={query}
          onChange={handleQueryChange}
          className="p-1 w-full"
        />
      </div>

      <div className="flex items-center justify-center gap-1 mt-2 text-gray-100">
        <input
          type="checkbox"
          checked={showImages}
          onChange={handleImageCheckboxChange}
          className="h-4 w-4"
        />
        <label htmlFor="image">image</label>
        <input
          type="checkbox"
          checked={showVideos}
          onChange={handleVideoCheckboxChange}
          className="h-4 w-4 ml-6"
        />
        <label htmlFor="video">video</label>
      </div>

      <div className="flex flex-col items-center justify center w-screen h-3/4 overflow-x-scroll text-gray-900 text-base">
      {isLoading ? (
          <div className="loader"><div></div><div></div><div></div><div></div></div>
        ) : (
          <div className="sm:grid sm:gap-4 sm:grid-cols-2 sm:grid-rows-3 md:grid-cols-3 gap-3 flex flex-col pl-8 pr-5 items-start justify-center">
            {images.map((image, index) => {
            
            const id = image.data[0].nasa_id;
          return (
            <Link
              key={index}
              to={`/asset/${id}`}>
            <div
              className="image-card glass flex flex-col items-center justify-center p-1 cursor-pointer"
            >
              <div className="flex items-center justify-center">
              {image.data[0].media_type === "image" && showImages && (
                <img
                  src={image.links[0].href}
                  alt={image.data[0].title}
                  className="image"
                />
              )}
              {image.data[0].media_type === "video" && showVideos && (
                <img controls className="image" 
                src={image.links[0].href}
                alt={image.data[0].title}  >
                </img>
              )}
              </div>
            <div className=" flex flex-col items-center justify-center w-64 sm:w-52">
              <h2>{image.data[0].title}</h2>
              <h4>type: {image.data[0].media_type}</h4>
              
            </div>
            </div>
            </Link>
          )  
            
          })}
        </div>
        )}</div>
    </div>
  );
}

export default Home;
