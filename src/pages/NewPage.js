import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {HiHome} from 'react-icons/hi'
function ItemPage() {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [asset, setAsset] = useState("");
  const [data_video, setData_video] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const nasa_id = id
  var donee = []
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/search?nasa_id=${nasa_id}`
        );
        // eslint-disable-next-line
        donee = response.data.collection.items[0].data[0]
        console.log(response.data.collection.items[0]);
        const item_name = donee.title;

        setName(item_name);
        const created_at = donee.date_created;
        setTime(created_at);
        const text = donee.description;
        setDescription(text);
        const media_type = donee.media_type;
        setType(media_type);

        const imageData = (response.data.collection.items[0].links[0].href)
        setAsset(imageData);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();


  }, [nasa_id]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const image_link = 'https://images-assets.nasa.gov/video/' + nasa_id + '/collection.json'
        const response = await axios.get(
          image_link
        );

        const data_video = response.data.filter((data) => data.endsWith(".mp4"));
        console.log(data_video[1]);
        const video_file = data_video[1];
        const replacedData = video_file.replace(/ /g, '%20');
        setData_video(replacedData);
        setIsVideoLoaded(true);
        
      } catch (error) {
        console.log(error)
      }
    };
    fetchVideo();
  })

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen w-screen overflow-x-none">
      <div className="loader"><div></div><div></div><div></div><div></div></div>
    </div>
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-x-none">
      <div className="flex flex-col items-start justify-start h-screen w-screen p-4 gap-6 overflow-x-auto">
        <Link className=" text-gray-100 underline w-40 flex flex-row items-center justify-center text-lg font-bold" to={`/`} >
          <HiHome />
          <h1>Home</h1>
        </Link>

        <div className="flex flex-col items-center justify-center font-semibold gap-6 text-gray-100">
          <h1 className="mt-6 font-bold text-lg text-center">{name}</h1>
          <div>
          <div className="sm:flex sm:flex-row sm:items-center sm:justify-evenly sm:gap-4">
          {type === 'image' &&
            <img
              src={asset}
              alt={asset}
              className="image w-80"
            />
          }
          {type === 'video' && isVideoLoaded &&
            <video className="image w-80" controls>
              <source src={data_video} type="video/mp4" />
            </video>
          }
          <div className="flex flex-col items-start justify-center">
            <h1>Created at: {time}</h1>
            <h1>Media Type: {type}</h1>
          </div>
          </div>
          </div>
          <div className="flex flex-col items-start justify-center ">
            <h1>Description: {description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
