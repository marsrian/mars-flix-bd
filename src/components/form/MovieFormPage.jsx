"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const MovieFormPage = ({ onSubmit, movieItem }) => {
  const [movieName, setMovieName] = useState(movieItem?.movieName || "");
  const [moviePoster, setMoviePoster] = useState(movieItem?.moviePoster || "");
  const [duration, setDuration] = useState(movieItem?.duration || "");
  const [IMDBRating, setIMDBRating] = useState(movieItem?.IMDBRating || "");
  const [cast, setCast] = useState(movieItem?.totalEpisode || "");
  const [language, setLanguage] = useState(movieItem?.language || "");
  const [quality, setQuality] = useState(movieItem?.quality || "");
  const [resolution, setResolution] = useState(movieItem?.resolution || "");
  const [size, setSize] = useState(movieItem?.size || "");
  const [releaseDate, setReleaseDate] = useState(movieItem?.releaseDate || "");
  const [trailerLink, setTrailerLink] = useState(movieItem?.trailerLink || "");
  const [movieLink, setMovieLink] = useState(movieItem?.season || "");
  const [genre, setGenre] = useState(movieItem?.genre || "");
  const [description, setDescription] = useState(movieItem?.description || "");
  const [director, setDirector] = useState(movieItem?.director || "");
  const [subtitle, setSubtitle] = useState(movieItem?.subtitle || "");
  const [category, setCategory] = useState(movieItem?.category || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (movieItem) {
      setMovieName(movieItem.movieName || "");
      setMoviePoster(movieItem.moviePoster || "");
      setDuration(movieItem.duration || "");
      setIMDBRating(movieItem.IMDBRating || "");
      setLanguage(movieItem.language || "");
      setQuality(movieItem.quality || "");
      setResolution(movieItem.resolution || "");
      setSize(movieItem.size || "");
      setReleaseDate(movieItem.releaseDate || "");
      setTrailerLink(movieItem.trailerLink || "");
      setGenre(movieItem.genre || "");
      setDirector(movieItem.director || "");
      setCast(movieItem.cast || []);
      setDescription(movieItem.description || "");
      setSubtitle(movieItem.subtitle || "");
      setCategory(movieItem.category || "");
      setMovieLink(movieItem.movieLink || "");
    }
  }, [movieItem]);

  useEffect(() => {
    fetch("/api/movie-categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);
  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          movieName,
          moviePoster,
          duration,
          IMDBRating,
          director,
          language,
          quality,
          resolution,
          size,
          releaseDate,
          trailerLink,
          genre,
          description,
          category,
          cast,
          movieLink,
          subtitle,
        })
      }
      className="my-4"
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
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="">Movie Name</label>
          <input
            type="text"
            id=""
            name=""
            value={movieName}
            onChange={(ev) => setMovieName(ev.target.value)}
            placeholder="Movie Name"
            className="p-2 border rounded mb-2"
            required
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
          <label className="">Description</label>
          <input
            type="text"
            id=""
            name=""
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Movie Description"
            required
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
            required
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
            required
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
            required
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
            required
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
          <label className="">Movie Link</label>
          <input
            type="text"
            id=""
            name=""
            value={movieLink}
            onChange={(ev) => setMovieLink(ev.target.value)}
            placeholder="Movie Link"
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
          <label className="">Director</label>
          <input
            type="text"
            id=""
            name=""
            value={director}
            onChange={(ev) => setDirector(ev.target.value)}
            placeholder="Director name"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Cast</label>
          <input
            type="text"
            id=""
            name=""
            value={cast}
            onChange={(ev) => setCast(ev.target.value)}
            placeholder="Cast"
            className="p-2 border rounded mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Subtitle Link</label>
          <input
            type="text"
            id=""
            name=""
            value={subtitle}
            onChange={(ev) => setSubtitle(ev.target.value)}
            placeholder="Subtitle Link"
            className="p-2 border rounded mb-2"
          />
        </div>
      </div>
        <Button type="submit" className="w-full mt-2">Save</Button>
    </form>
  );
};

export default MovieFormPage;
