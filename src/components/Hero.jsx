import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const Hero = () => {
  const movieItems = [
    {
      img: "/movie-poster/Debi.jpg",
      title: "DEBI",
      desc: "A story following the life of Ranu (Joya Ahsan) and her paranormal powers. She goes to psychiatrist Misir Ali (Chanchal Chowdhury) to find an answer to all her questions.",
    },
    {
      img: "/movie-poster/jawan.jpg",
      title: "Jawan",
      desc: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.",
    },
    {
      img: "/movie-poster/Oppenheimer.jpg",
      title: "Oppenheimer",
      desc: "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
    },
    {
      img: "/movie-poster/GEN_V_poster.jpg",
      title: "GEN V",
      desc: "From the world of 'The Boys' comes 'Gen V,' which explores the first generation of superheroes to know that their super powers are from Compound V. These heroes put their physical and moral boundaries to the test competing for the school's top ranking.",
    },
    {
      img: "/movie-poster/panchayat_s3.jpg",
      title: "Panchayat: S-03",
      desc: "Finally, Pradhan rallies the whole Phulera behind him to fight one last battle for glory. Abhishek finds himself too deep into the murky waters of village politics and loses his objectivity.",
    },
  ];
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {movieItems.map((movieItem) => (
          <CarouselItem key={movieItem.title}>
            <div
              style={{
                backgroundImage: `linear-gradient(45deg,rgba(21,21,21,1),rgba(0,0,0,0.3)), url(${movieItem.img})`,
              }}
              className="relative w-full h-[93vh] bg-no-repeat bg-cover bg-center flex items-center"
            >
              <div className="flex flex-col p-4 md:pl-36">
                <h1 className="font-bold text-5xl md:text-6xl text-white leading-[75px]">
                  {movieItem.title}
                </h1>
                <p className="md:w-[522px] text-lg text-white my-8">
                  {movieItem.desc}
                </p>
                <div className="flex space-x-3">
                  <button className="font-semibold text-lg px-3 py-2 bg-[#ff3811] text-white rounded-[5px]">
                    See More
                  </button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
