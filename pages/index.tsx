import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import usePlayers from "../hooks/usePlayers";
import useScores from "../hooks/useScores";
import { defaultUsers, Player, User, Score } from "../lib/mahjong";
import { getToday } from "../lib/util";

const cn = (...classNames: string[]) => {
  return classNames.filter(Boolean).join(" ");
};

const Page: NextPage = () => {
  const { data, isError, isLoading } = usePlayers();
  const {
    data: scores,
    isError: isErrorScore,
    isLoading: isLoadingScore,
  } = useScores();
  const [users, setUsers] = useState(defaultUsers);

  useEffect(() => {
    if (isLoading || isError) return;
    let newValue: User[] = [];

    defaultUsers.forEach((user) => {
      let player = data.find((item: Player) => item.name === user.name);
      if (player) {
        user.league = player.league;
        user.practice = player.practice;
        user.pageId = player.page.id;
        user.achievement = player.achievement ?? "";
        user.record = player.record ?? "";
      }
      newValue.push(user);
    });

    if (scores) {
      const opens = scores
        .filter((score: Score) => score.name === "オープン戦")
        .map((score: Score) => score.members)
        .flat();
      const leagues = scores
        .filter((score: Score) => score.name === "リーグ戦")
        .map((score: Score) => score.members)
        .flat();

      newValue.forEach((i) => {
        let tmp = opens.filter((j) => j.name === i.name).map((i) => i.number);
        let tmp2 = leagues
          .filter((j) => j.name === i.name)
          .map((i) => i.number);
        i.score = {
          open: {
            total: tmp.reduce((p, c) => p + c, 0),
            match: tmp.length,
          },
          league: {
            total: tmp2.reduce((p, c) => p + c, 0),
            match: tmp2.length,
          },
        };
      });
    }

    setUsers(newValue);
  }, [
    data,
    setUsers,
    defaultUsers,
    isLoading,
    isError,
    isErrorScore,
    isLoadingScore,
    scores,
  ]);

  const clearEventHandler = useCallback(() => {
    setUsers((s) => {
      return s.map((ss) => {
        return {
          ...ss,
          league: false,
          practice: false,
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
  if (isLoadingScore) return null;
  if (isErrorScore) return null;

  return (
    <div className="select-none min-h-screen">
      <Head>
        <title>参加の可否</title>
        <meta name="description" content="参加の可否" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative font-fdx">
        <div className="h-10 flex items-center px-6">
          <h1 className="p-1 w-full bg-[#fbecdd] text-2xl">参加可否</h1>
        </div>
        <div className="flex flex-col items-start p-2">
          {users.map((user: User, idx) => (
            <div key={idx} className="px-4 ">
              <div className="p-1 space-x-4 flex items-center">
                <span
                  className="inline-block w-32 bg-white shadow-sm shadow-black text-center text-xl font-bold relative"
                  onClick={(e) => console.log(user)}
                >
                  {user.name}
                  <div className="absolute right-0 bottom-1/2 inset-y-0">
                    {user.achievement ? (
                      <div className="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[orange]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        <div className="absolute hidden group-hover:block -top-8 -left-2 text-sm truncate z-10 bg-white border border-black py-1 px-4">
                          {user.achievement}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="absolute left-1 top-1">
                    {user.record ? (
                      <div className="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[orange]"
                          fill="orange"
                          aria-hidden="true"
                          role="img"
                          width="1em"
                          height="1em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                            d="M176 464h160m-80 0V336m128-112c0-50.64-.08-134.63-.12-160a16 16 0 0 0-16-16l-223.79.26a16 16 0 0 0-16 15.95c0 30.58-.13 129.17-.13 159.79c0 64.28 83 112 128 112S384 288.28 384 224Z"
                          />
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                            d="M128 96H48v16c0 55.22 33.55 112 80 112M384 96h80v16c0 55.22-33.55 112-80 112"
                          />
                        </svg>
                        <div className="absolute hidden group-hover:block -top-8 -left-2 text-sm truncate z-10 bg-white border border-black py-1 px-4">
                          {user.record}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
                <ScoreSpan user={user} />
              </div>
            </div>
          ))}
          <div className="px-4">
            <div className="p-1 space-x-4 flex items-center">
              <span className="inline-block w-32 bg-blue-300 shadow-sm shadow-black text-center text-xl font-bold">
                {""}
              </span>
              {users.some((user) => user.practice || user.league) ? (
                <span
                  className="inline-block w-[270px] rounded-full bg-white shadow-sm shadow-black text-center text-xl font-bold hover:-translate-y-px duration-200 active:shadow-none active:translate-y-0 active:bg-[#3dc14f]"
                  onClick={(e) => {
                    clearEventHandler();
                  }}
                >
                  流局
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ScoreSpan = ({ user }: { user: User }) => {
  const [type, setType] = useState(0);
  const open =
    type === 0
      ? user.score.open.match > 0
        ? Math.round((user.score.open.total / user.score.open.match) * 10) / 10
        : "-"
      : type === 1
      ? user.score.open.total
      : type === 2
      ? user.score.open.match
      : "-";
  const league =
    type === 0
      ? user.score.league.match > 0
        ? Math.round((user.score.league.total / user.score.league.match) * 10) /
          10
        : "-"
      : type === 1
      ? user.score.league.total
      : type === 2
      ? user.score.league.match
      : "-";
  const label = () =>
    type === 0 ? "平均" : type === 1 ? "合計" : type === 2 ? "参加" : "-";
  return (
    <>
      <span className="w-16">オープン</span>
      <span className="w-10 font-sans text-right">{open}</span>
      <span className="w-12">リーグ</span>
      <span className="w-10 font-sans text-right">{league}</span>
      <span
        className="border text-xs py-px px-2 rounded"
        onClick={(e) => setType((s) => (s + 1) % 3)}
      >
        {label()}
      </span>
    </>
  );
};

export default Page;
