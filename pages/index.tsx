import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import usePlayers from "../hooks/usePlayers";
import {
  countAvailableMemberCount,
  defaultUsers,
  matches,
  Player,
  title,
  User,
} from "../lib/mahjong";
import { getToday } from "../lib/util";
import Yaku from "./yaku";

const Home: NextPage = () => {
  const { data, isError, isLoading } = usePlayers();
  const [users, setUsers] = useState(defaultUsers);
  const [filteredMatches, setFilteredMatches] = useState(matches);

  useEffect(() => {
    if (!data) return;
    let newValue: User[] = [];

    defaultUsers.forEach((user) => {
      let player = data.find((item: Player) => item.name === user.name);
      if (player) {
        user.checked = player.canPlay;
        user.pageId = player.page.id;
      }
      newValue.push(user);
    });

    setUsers(newValue);
  }, [data]);

  const clickClearEventHandler = useCallback(() => {
    setUsers((s) => {
      return s.map((ss) => {
        return {
          ...ss,
          checked: false,
        };
      });
    });
    try {
      users.forEach(async (user) => {
        const r = await fetch(`/api/${user.pageId}/clear`);
        const d = await r.json();
      });
    } catch (error) {
      console.error(error);
    }
  }, [users]);

  const clickEventHandler = useCallback(async (e: User) => {
    e.checked = !e.checked;
    setUsers((old) => [
      ...old.filter((user) => user.id < e.id),
      e,
      ...old.filter((user) => user.id > e.id),
    ]);
    try {
      const r = await fetch(
        `/api/${e.pageId}/edit?canPlay=${
          e.checked ? "1" : "0"
        }&date=${getToday()}`
      );
      const d = await r.json();
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className="bg-gradient-to-br from-green-800/90 via-green-800/90 to-green-800/90 select-none min-h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative">
        <div className="flex justify-between bg-gradient-to-r from-rose-500 via-rose-400 to-rose-300 text-white p-1">
          <h1 className="font-bold text-2xl ">{title}</h1>
        </div>

        <div className="p-2">
          <div className="md:p-2">
            <div className="mb-4">
              <span className="font-bold text-white text-base">メンバー</span>
            </div>
            <div className="flex flex-col space-y-4 xl:space-y-0 xl:flex-row">
              <div className="flex space-x-1 sm:space-x-2 md:space-x-3 xl:space-x-4 items-center font-serif font-bold">
                {users.map((user) => {
                  return user.name.length > 2 ? (
                    user.checked ? (
                      <div
                        key={user.id}
                        className="common color-one size-one janpai"
                        onClick={() => clickEventHandler(user)}
                      >
                        {user.name}
                      </div>
                    ) : (
                      <div
                        key={user.id}
                        className="common color-two size-one janpai"
                        onClick={() => clickEventHandler(user)}
                      >
                        {user.name}
                      </div>
                    )
                  ) : user.checked ? (
                    <div
                      key={user.id}
                      className="common color-one size-two"
                      onClick={() => clickEventHandler(user)}
                    >
                      <div className="absolute inset-0 rounded-md bg-white"></div>
                      <div className="z-10 drop-shadow-xl">{user.name}</div>
                    </div>
                  ) : (
                    <div
                      key={user.id}
                      className="common color-two size-two"
                      onClick={() => clickEventHandler(user)}
                    >
                      <div className="absolute inset-0 rounded-md bg-white"></div>
                      <div className="z-10 drop-shadow-xl">{user.name}</div>
                    </div>
                  );
                })}
                {users.some((user) => user.checked) ? (
                  <div
                    className="bg-yellow-500 text-yellow-50 text-center whitespace-nowrap px-4 rounded border border-yellow-500 select-none cursor-pointer shadow shadow-yellow-500 uppercase"
                    onClick={() => clickClearEventHandler()}
                  >
                    流局
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <hr className="my-3" />
          <div className="block md:flex gap-2">
            <div className="md:p-2 shrink-0">
              <div className="font-bold text-white text-base">
                マッチング状況
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-flow-row gap-4 max-w-4xl">
                {filteredMatches.map(
                  ({ id, name, users: matchUsers, done }) => {
                    const numOfAvailable = countAvailableMemberCount(
                      users,
                      matchUsers
                    );
                    return (
                      <div
                        key={id}
                        className={`w-[180px] h-[180px] rounded-lg border-2 border-green-900 bg-[green] ${
                          done ? "order-1" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center m-1 font-serif">
                          <span className="text-3xl">{name}</span>
                          {done === true ? (
                            <span className="text-lg px-2 py-px rounded-md bg-rose-500 text-white">
                              対局済
                            </span>
                          ) : numOfAvailable === 4 ? (
                            <span className="text-lg px-2 py-px rounded-md bg-[blue] text-white">
                              聴牌
                            </span>
                          ) : numOfAvailable === 3 ? (
                            <span className="text-lg px-2 py-px rounded-md bg-[orange] text-white">
                              一向聴
                            </span>
                          ) : numOfAvailable === 2 ? (
                            <span className="text-lg px-2 py-px rounded-md bg-rose-500 text-white">
                              二向聴
                            </span>
                          ) : numOfAvailable === 1 ? (
                            <span className="text-lg px-2 py-px rounded-md bg-[brown] text-white">
                              三向聴
                            </span>
                          ) : (
                            <span className="text-lg px-2 py-px rounded-md bg-[purple] text-white">
                              四向聴
                            </span>
                          )}
                        </div>
                        <div className="mt-4 flex justify-between text-center m-2 items-center font-serif tracking-wide">
                          {matchUsers.map(({ name, score }, index) => {
                            let y = users.filter(
                              (user) => user.checked && user.name === name
                            );
                            return y && y.length > 0 && !done ? (
                              <div
                                key={index}
                                className="text-2xl w-16 h-20 text-[orange]"
                              >
                                {name}
                                {done ? (
                                  <>
                                    <br />
                                    <span
                                      className={`font-mono font-bold text-lg ${
                                        score > 0
                                          ? "text-[blue]"
                                          : "text-red-50"
                                      }`}
                                    >
                                      {score > 0 ? "+" : ""}
                                      {score}
                                    </span>
                                  </>
                                ) : null}
                              </div>
                            ) : (
                              <div
                                key={index}
                                className="text-2xl w-16 h-20 text-slate-400"
                              >
                                {name}
                                {done ? (
                                  <>
                                    <br />
                                    <span
                                      className={`font-mono font-bold text-lg ${
                                        score > 0
                                          ? "text-[blue]"
                                          : "text-red-50"
                                      }`}
                                    >
                                      {score > 0 ? "+" : ""}
                                      {score}
                                    </span>
                                  </>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="hidden md:block p-2">
              <div className="font-bold text-white text-base">役</div>
              <Yaku />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
