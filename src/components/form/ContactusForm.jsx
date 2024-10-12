"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "../ui/button";

const ContactUsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendEmail = () => {
    setSuccess("");
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!message) {
      setError("Please enter your message.");
      return;
    }
    const templateParams = {
      from_name: email,
      to_name: "MarsFlixBD",
      message,
    };
    setError("");
    setIsLoading(true);
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_TEMPLATE_ID ?? "",
        templateParams,
        process.env.NEXT_PUBLIC_USER_ID
      )
      .then(
        function (response) {
          setEmail("");
          setName("");
          setMessage("");
          setIsLoading(false);
          setSuccess("Message sent successfully!");
        },
        function (error) {
          setError("Failed to send message. Please try again later.");
          console.log(error);
          setIsLoading(false);
        }
      );
  };

  return (
    <div className="">
      <h3 className="text-2xl font-medium mb-3">Write a message 📝</h3>
      <form className="flex flex-col">
        <label htmlFor="name" className="text-lg font-medium mb-1">
          Name
        </label>
        <input
          className="w-full border rounded-lg p-3 mb-2"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <label htmlFor="email" className="text-lg font-medium">
          Email
        </label>
        <input
          className="w-full border rounded-lg p-3 mb-2"
          type="email"
          id="email"
          name="user_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <label htmlFor="message" className="text-lg font-medium">
          Message
        </label>
        <textarea
          className="w-full border rounded-lg p-3 mb-3"
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message...."
          required
        />
        <div>
          <Button
            onClick={sendEmail}
            disabled={isLoading}
            className=""
            type="submit"
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-1">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
    </div>
  );
};

export default ContactUsForm;