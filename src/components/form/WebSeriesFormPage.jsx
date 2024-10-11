"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import WebSeriesItemProps from "./WebSeriesItemProps";

const WebSeriesFormPage = ({ onSubmit, webSeriesItem }) => {
  const [seriesName, setSeriesName] = useState(webSeriesItem?.name || "");
  const [moviePoster, setMoviePoster] = useState(
    webSeriesItem?.moviePoster || ""
  );
  const [duration, setDuration] = useState(webSeriesItem?.duration || "");
  const [IMDBRating, setIMDBRating] = useState(webSeriesItem?.IMDBRating || "");
  const [season, setSeason] = useState(webSeriesItem?.season || "");
  const [totalEpisode, setTotalEpisode] = useState(
    webSeriesItem?.totalEpisode || ""
  );
  const [language, setLanguage] = useState(webSeriesItem?.language || "");
  const [quality, setQuality] = useState(webSeriesItem?.quality || "");
  const [resolution, setResolution] = useState(webSeriesItem?.resolution || "");
  const [size, setSize] = useState(webSeriesItem?.size || "");
  const [releaseDate, setReleaseDate] = useState(
    webSeriesItem?.releaseDate || ""
  );
  const [trailerLink, setTrailerLink] = useState(
    webSeriesItem?.trailerLink || ""
  );
  const [genre, setGenre] = useState(webSeriesItem?.genre || "");
  const [description, setDescription] = useState(
    webSeriesItem?.description || ""
  );

  const [episodes, setEpisodes] = useState(webSeriesItem?.episodes || "");
  const [category, setCategory] = useState(webSeriesItem?.category || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (webSeriesItem) {
      setSeriesName(webSeriesItem.seriesName || "");
      setMoviePoster(webSeriesItem.moviePoster || "");
      setDuration(webSeriesItem.duration || "");
      setIMDBRating(webSeriesItem.IMDBRating || "");
      setSeason(webSeriesItem.season || "");
      setTotalEpisode(webSeriesItem.totalEpisode || "");
      setLanguage(webSeriesItem.language || "");
      setQuality(webSeriesItem.quality || "");
      setResolution(webSeriesItem.resolution || "");
      setSize(webSeriesItem.size || "");
      setReleaseDate(webSeriesItem.releaseDate || "");
      setTrailerLink(webSeriesItem.trailerLink || "");
      setGenre(webSeriesItem.genre || "");
      setDescription(webSeriesItem.description || "");
      setEpisodes(webSeriesItem.episodes || []);
      setCategory(webSeriesItem.category || "");
    }
  }, [webSeriesItem]);

  useEffect(() => {
    fetch("/api/web-categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);
  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          seriesName,
          moviePoster,
          duration,
          IMDBRating,
          season,
          totalEpisode,
          language,
          quality,
          resolution,
          size,
          releaseDate,
          trailerLink,
          genre,
          description,
          category,
          episodes,
        })
      }
      className={"my-4"}
    >
      <div className="grid grid-cols-2 gap-2 md:gap-6">
        <div className="flex flex-col">
          <label className="">Image</label>
          <input
            type="text"
            id=""
            name=""
            value={moviePoster}
            onChange={(ev) => setMoviePoster(ev.target.value)}
            placeholder="Image Link"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Series Name</label>
          <input
            type="text"
            id=""
            name=""
            value={seriesName}
            onChange={(ev) => setSeriesName(ev.target.value)}
            placeholder="Series Name"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Description</label>
          <input
            type="text"
            id=""
            name=""
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Series Description"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Duration</label>
          <input
            type="text"
            id=""
            name=""
            value={duration}
            onChange={(ev) => setDuration(ev.target.value)}
            placeholder="Series Duration"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">IMDB Rating</label>
          <input
            type="text"
            id=""
            name=""
            value={IMDBRating}
            onChange={(ev) => setIMDBRating(ev.target.value)}
            placeholder="IMDB Rating"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Season</label>
          <input
            type="text"
            id=""
            name=""
            value={season}
            onChange={(ev) => setSeason(ev.target.value)}
            placeholder="Season"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Total Episode</label>
          <input
            type="text"
            id=""
            name=""
            value={totalEpisode}
            onChange={(ev) => setTotalEpisode(ev.target.value)}
            placeholder="Total Episode"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Language</label>
          <input
            type="text"
            id=""
            name=""
            value={language}
            onChange={(ev) => setLanguage(ev.target.value)}
            placeholder="Language"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Quality</label>
          <input
            type="text"
            id=""
            name=""
            value={quality}
            onChange={(ev) => setQuality(ev.target.value)}
            placeholder="Quality"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Resolution</label>
          <input
            type="text"
            id=""
            name=""
            value={resolution}
            onChange={(ev) => setResolution(ev.target.value)}
            placeholder="Resolution"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Size</label>
          <input
            type="text"
            id=""
            name=""
            value={size}
            onChange={(ev) => setSize(ev.target.value)}
            placeholder="Size"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Release Date</label>
          <input
            type="text"
            id=""
            name=""
            value={releaseDate}
            onChange={(ev) => setReleaseDate(ev.target.value)}
            placeholder="Release Date"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Trailer Link</label>
          <input
            type="text"
            id=""
            name=""
            value={trailerLink}
            onChange={(ev) => setTrailerLink(ev.target.value)}
            placeholder="Trailer Link"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Genre</label>
          <input
            type="text"
            id=""
            name=""
            value={genre}
            onChange={(ev) => setGenre(ev.target.value)}
            placeholder="Genre"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
            className="border p-2 rounded mb-2"
          >
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="">Add Episodes:</label>
          <WebSeriesItemProps
            name="Episodes"
            props={episodes}
            setProps={setEpisodes}
            addLabel={"Add Episode"}
          />
        </div>
        <Button type="submit" className="w-full">Save</Button>
      </div>
    </form>
  );
};

export default WebSeriesFormPage;
