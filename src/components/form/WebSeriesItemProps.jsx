import React, { useState } from "react";
import ChevronUp from "../ChevronUp";
import ChevronDown from "../ChevronDown";
import Trash from "../Trash";
import { Button } from "../ui/button";

const WebSeriesItemProps = ({ name, props, setProps, addLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  function addProps() {
    setProps((prevEpisodes) => {
      return [
        ...prevEpisodes,
        {
          serial: 0,
          episodeLink: "",
        },
      ];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevEpisodes) => {
      const newEpisodes = [...prevEpisodes];
      newEpisodes[index][prop] = newValue;
      return newEpisodes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="mb-2 rounded-md bg-gray-300 p-2">
      <button onClick={() => setIsOpen((prev) => !prev)} type="button" className="flex justify-center gap-2 dark:text-black w-full">
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        {name}
        <span className="ml-1">{props.length}</span>
      </button>
      <div className={isOpen ? "block mt-2" : "hidden"}>
        {props.length > 0 &&
          props.map((episode, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:gap-4 py-2 rounded-md"
            >
              <div className="flex flex-col">
                <label className="dark:text-black">Serial:</label>
                <input
                  type="number"
                  id=""
                  name=""
                  placeholder="Serial Number"
                  value={episode.serial}
                  onChange={(ev) => editProp(ev, index, "serial")}
                  className="p-2 border rounded-md md:w-16"
                />
              </div>
              <div className="mt-2 md:mt-0 flex flex-col">
                <label className="dark:text-black">Episode Link:</label>
                <input
                  type="text"
                  id=""
                  name=""
                  placeholder="Video Link"
                  value={episode.episodeLink}
                  onChange={(ev) => editProp(ev, index, "episodeLink")}
                  className="p-2 border rounded-md"
                />
              </div>
              <div>
                <button
                  onClick={() => removeProp(index)}
                  type="button"
                  className="mt-4 px-2 dark:text-black"
                >
                  <Trash/>
                </button>
              </div>
            </div>
          ))}
        <Button onClick={addProps} type="button" className="mt-2 w-full">
          <span>{addLabel}</span>
        </Button>
      </div>
    </div>
  );
};

export default WebSeriesItemProps;