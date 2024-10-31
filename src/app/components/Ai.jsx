"use client";

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function Home() {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");

  async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "HELLO" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello there! How can I assist you today?" }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    setData(response.text());
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const prompt = inputValue || "";
    await runChat(prompt);
    setInputValue("");
  };

  return (
    <div className="flex min-h-[500px] w-96 flex-col justify-between px-5 items-center py-5 border-2 border-purple-600 rounded-xl bg-purple-200">
      <h2 className="text-2xl font-medium text-purple-800">
        Hi this is Ai Assistan
      </h2>
      <div>
        {data && (
          <div>
            <div dangerouslySetInnerHTML={{ __html: data }} />
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className=" flex w-full justify-between items-center rounded-sm"
      >
        <Input
          key="secondary"
          type="text"
          color="none"
          placeholder="Enter your prompt here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border-none outline-none bg-none text-black w-full "
          endContent={
            <button
              type="submit"
              className="border-none outline-none p-4 rounded-lg text-black font-bold uppercase "
            >
              <IoIosSend />
            </button>
          }
        />
      </form>
    </div>
  );
}
