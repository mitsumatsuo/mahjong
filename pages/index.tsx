import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import usePlayers from "../hooks/usePlayers";
import { defaultUsers, Player, User } from "../lib/mahjong";
import { getToday } from "../lib/util";

const cn = (...classNames: string[]) => {
  return classNames.filter(Boolean).join(" ");
};

const Page: NextPage = () => {
  const { data, isError, isLoading } = usePlayers();
  const [users, setUsers] = useState(defaultUsers);

  useEffect(() => {
    if (!data) return;
    let newValue: User[] = [];

    defaultUsers.forEach((user) => {
      let player = data.find((item: Player) => item.name === user.name);
      if (player) {
        user.league = player.league;
        user.practice = player.practice;
        user.pageId = player.page.id;
      }
      newValue.push(user);
    });

    setUsers(newValue);
  }, [data, setUsers, defaultUsers]);

  const clearEventHandler = useCallback(() => {
    setUsers((user) => {
      return {
        ...user,
        league: false,
        practice: false,
      };
    });
    try {
      users.forEach(async (user) => {
        const r = await fetch(`/api/${user.pageId}/clear`);
        const d = await r.json();
      });
    } catch (error) {
      console.error(error);
    }
  }, [users, setUsers]);

  const leagueEventHandler = useCallback(
    async (e: User) => {
      e.league = !e.league;
      setUsers((old) => [
        ...old.filter((user) => user.id < e.id),
        e,
        ...old.filter((user) => user.id > e.id),
      ]);
      try {
        const r = await fetch(
          `/api/${e.pageId}/edit?league=${
            e.league ? "1" : "0"
          }&date=${getToday()}`
        );
        const d = await r.json();
      } catch (error) {
        console.error(error);
      }
    },
    [setUsers, getToday]
  );

  const practiceEventHandler = useCallback(
    async (e: User) => {
      e.practice = !e.practice;
      setUsers((old) => [
        ...old.filter((user) => user.id < e.id),
        e,
        ...old.filter((user) => user.id > e.id),
      ]);
      try {
        const r = await fetch(
          `/api/${e.pageId}/edit?practice=${
            e.practice ? "1" : "0"
          }&date=${getToday()}`
        );
        const d = await r.json();
      } catch (error) {
        console.error(error);
      }
    },
    [setUsers, getToday]
  );

  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className="select-none min-h-screen">
      <Head>
        <title>参加の可否</title>
        <meta name="description" content="参加の可否" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative">
        <div className="flex flex-col items-start p-2">
          {users.map((user, idx) => (
            <div key={idx} className="px-4">
              <div className="p-1 space-x-4 flex items-center">
                <span className="inline-block w-48 bg-white shadow-sm shadow-black text-center text-xl font-bold">
                  {user.name}
                </span>
                <span
                  className={cn(
                    "inline-block w-32 rounded-full bg-white shadow-sm shadow-black text-center text-xl font-bold duration-200",
                    user.league
                      ? "shadow-none translate-y-0 bg-[#01aaf2]"
                      : "hover:-translate-y-px active:shadow-none active:translate-y-0 active:bg-[#01aaf2]"
                  )}
                  onClick={(e) => leagueEventHandler(user)}
                >
                  公式
                </span>
                <span
                  className={cn(
                    "inline-block w-32 rounded-full bg-white shadow-sm shadow-black text-center text-xl font-bold duration-200",
                    user.practice
                      ? "shadow-none translate-y-0 bg-[#f1e23b]"
                      : "hover:-translate-y-px active:shadow-none active:translate-y-0 active:bg-[#c1b63d]"
                  )}
                  onClick={(e) => practiceEventHandler(user)}
                >
                  練習
                </span>
              </div>
            </div>
          ))}
          <div className="px-4">
            <div className="p-1 space-x-4 flex items-center">
              <span className="inline-block w-48 bg-blue-300 shadow-sm shadow-black text-center text-xl font-bold">
                {""}
              </span>
              <span
                className="inline-block w-[270px] rounded-full bg-white shadow-sm shadow-black text-center text-xl font-bold hover:-translate-y-px duration-200 active:shadow-none active:translate-y-0 active:bg-[#3dc14f]"
                onClick={(e) => {
                  clearEventHandler();
                }}
              >
                流局
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
