import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import GoalImageIcon from "../components/GoalImageIcon";
import useGoals from "../hooks/useGoals";

const Home: NextPage = () => {
  const { data: goals, isLoading, isError } = useGoals();
  const [index, setIndex] = useState(Math.floor(Math.random() * goals.length));

  if (isLoading) return null;
  if (isError) return null;

  const goal = goals[index];

  return (
    <div className="bg-gradient-to-br from-green-800/90 via-green-800/90 to-green-800/90 select-none min-h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative">
        <div className="pt-10 flex space-x-3 pl-3 pb-3 justify-center w-[350px]">
          <button
            onClick={() =>
              setIndex((s) => (s === 0 ? goals.length - 1 : s - 1))
            }
            className="bg-white rounded px-1 shadow-sm shadow-black text-[purple] font-serif"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => setIndex(Math.floor(Math.random() * goals.length))}
            className="bg-white rounded px-1 shadow-sm shadow-black text-[purple] font-serif"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setIndex((s) => (s === goals.length - 1 ? 0 : s + 1))
            }
            className="bg-white rounded px-1 shadow-sm shadow-black text-[purple] font-serif"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <GoalImageIcon {...goal} />
      </main>
    </div>
  );
};

export default Home;
