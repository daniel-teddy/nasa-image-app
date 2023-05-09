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
    <div className="bg-gray-800 text-gray-200 h-screen w-screen">
    <div className="flex flex-col items-center justify-start h-screen w-screen overflow-x-hidden p-1">
        
        <div className="w-screen h-1/6 flex flex-col sm:h-[8rem] items-center justify-center sm:justify-between m-2 ">
            <h1 className='font-bold text-lg'>Nasa Image & Video Search Portal</h1>
            <input type="text" name="searchquerry" placeholder="Search here ..."
          value={query}
          onChange={handleQueryChange} id="" className="w-3/4 p-1 text-gray-800 rounded border border-gray-800 mt-4" />
            <div className="sm:ml-4 sm:w-1/4 flex flex-row items-center justify-around gap-4 mt-2">
               
                
                <div className="flex flex-row items-center justify-around gap-2 font-semibold">
                    <input type="checkbox" checked={showImages}
          onChange={handleImageCheckboxChange} />
                    <label HtmlFor="image" className="">Image</label>
                </div>
                
                
                <div className="flex flex-row items-center justify-around gap-2 font-semibold">
                    <input type="checkbox" checked={showVideos}
          onChange={handleVideoCheckboxChange} />
                    <label HtmlFor="video" className="">Videos</label>
                </div>
            </div>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-3/4">
            <div className="loader"><div></div><div></div><div></div><div></div></div>
          </div>
        ) : (
        <div className="w-screen h-5/6 flex flex-col items-center justify-between pl-8 pr-5 sm:grid sm:gap-4 sm:grid-cols-2 sm:grid-rows md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  sm:p-1 overflow-x-auto">
            
            {images.map((image, index) => {
            
            const id = image.data[0].nasa_id;
            return (
                <Link key={index}
                to={`/asset/${id}`}>
                    <div className="h-[24rem] w-80 sm:h-[16rem] sm:w-[14rem] sm:mt-3 cursor-pointer flex flex-col items-center justify-start bg-gray-300 text-gray-800 font-semibold text-sm p-1 rounded">
                        <div className=" rounded">
                        {image.data[0].media_type === "image" && showImages && (
                            <img src={image.links[0].href} alt={image.data[0].title} className="h-[19rem] sm:h-[13rem] sm:w-[13rem] w-[19rem] rounded" />
                        )}
                        {image.data[0].media_type === "video" && showVideos && (
                            <img src={image.links[0].href} alt={image.data[0].title} className="h-[19rem] sm:h-[13rem] sm:w-[13rem] w-[19rem] rounded" />
                        )}
                        </div>
                        <div className="w-full pl-2 flex flex-col items-start justify-center h-[6rem]">
                            <span className="title">{image.data[0].title}</span>
                            <span className="type">type: {image.data[0].media_type}</span>
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
