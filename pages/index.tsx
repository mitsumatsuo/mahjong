import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import UserName from "../components/Label/UserName";
import ActionSpan from "../components/Spans/ActionSpan";
import ClearSpan from "../components/Spans/ClearSpan";
import ScoreSpan from "../components/Spans/ScoreSpan";
import usePlayers from "../hooks/usePlayers";
import useScores from "../hooks/useScores";
import { defaultUsers, Player, ObjectKey, User, Score } from "../lib/mahjong";
import { getToday } from "../lib/util";

const setRank = (scores: Score[], newValue: User[]) => {
  scores
    .filter(
      (score) =>
        score.name === "リーグ戦" ||
        score.name === "オープン戦" ||
        score.name === "１回戦"
    )
    .forEach((score) => {
      const ranks = score.members.map((m) => m.number).flat();
      ranks.sort((a, b) => (a < b ? 1 : -1));
      score.members.forEach((member) => {
        const m = newValue.find((user) => user.name === member.name);
        if (!m) {
          return;
        }
        const rank = ranks.indexOf(member.number) + 1;
        if (rank === 1) {
          m.rank.first++;
        } else if (rank === 2) {
          m.rank.second++;
        } else if (rank === 3) {
          m.rank.third++;
        } else {
          m.rank.fourth++;
        }
      });
    });
};

const Page: NextPage = () => {
  const { data, isError, isLoading } = usePlayers();
  const {
    data: scores,
    isError: isErrorScore,
    isLoading: isLoadingScore,
  } = useScores();
  const [users, setUsers] = useState(defaultUsers);
  const [type, setType] = useState(0);

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
        user.penalty = player.penalty;
      }
      newValue.push(user);
    });

    if (scores) {
      const opens = scores
        .filter((score: Score) => score.name === "オープン戦")
        .map((score: Score) => score.members)
        .flat();
      const leagues = scores
        .filter(
          (score: Score) => score.name === "リーグ戦" || score.name === "１回戦"
        )
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
            negative: tmp.filter((t) => t < -30).length,
            match: tmp.length,
          },
          league: {
            total: tmp2.reduce((p, c) => p + c, 0),
            negative: tmp2.filter((t) => t < -30).length,
            match: tmp2.length,
          },
        };
        i.rank = {
          first: 0,
          second: 0,
          third: 0,
          fourth: 0,
        };
      });

      // 順位
      setRank(scores, newValue);
    }

    setUsers(newValue);
  }, [
    data,
    setUsers,
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

  const toggleEventHandler = useCallback(
    async (pageId: string, userId: number, property: ObjectKey) => {
      const u = users.find((user) => user.id === userId);
      if (!u) {
        return;
      }
      u[`${property}`] = !u[`${property}`];
      setUsers((old) => [
        ...old.filter((user) => user.id < userId),
        u,
        ...old.filter((user) => user.id > userId),
      ]);
      try {
        const r = await fetch(
          `/api/${pageId}/edit?${property}=${
            u[`${property}`] ? "1" : "0"
          }&date=${getToday()}`
        );
        const d = await r.json();
      } catch (error) {
        console.error(error);
      }
    },
    [setUsers, users]
  );

  const Clear = useCallback(
    () =>
      users.some((user) => user.practice || user.league) ? (
        <ClearSpan labelText="流局" action={() => clearEventHandler()} />
      ) : (
        <></>
      ),
    [users, clearEventHandler]
  );

  const UserRecord = ({
    user,
    type,
    setType,
    showType,
  }: {
    user: User;
    type: number;
    setType: (type: number) => void;
    showType: boolean;
  }) => (
    <div className="px-4">
      <div className="p-1 space-x-4 flex items-center">
        <div className="inline-block w-32 bg-white shadow-sm shadow-black text-center text-xl font-bold relative">
          <UserName user={user} />
        </div>
        <ActionSpan
          labelText="公式"
          themeColor="1"
          value={user.league}
          action={() => toggleEventHandler(user.pageId, user.id, "league")}
        />
        <ActionSpan
          labelText="練習"
          themeColor="2"
          value={user.practice}
          action={() => toggleEventHandler(user.pageId, user.id, "practice")}
        />
        <ScoreSpan
          user={user}
          type={type}
          setType={setType}
          showType={showType}
        />
      </div>
    </div>
  );

  const ClearRecord = () => (
    <div className="px-4">
      <div className="p-1 space-x-4 flex items-center">
        <span className="inline-block w-32 bg-blue-300 shadow-sm shadow-black text-center text-xl font-bold">
          {""}
        </span>
        <Clear />
      </div>
    </div>
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
          <h1 className="p-1 bg-[#fbecdd] text-2xl w-[420px] mr-4 shrink-0">
            参加可否
          </h1>
          <h1 className="p-1 bg-[#e6fbdd] text-2xl w-full min-w-[720px] max-w-[720px]">
            記録
          </h1>
        </div>
        <div className="flex flex-col items-start p-2">
          {users.map((user: User, idx) => (
            <UserRecord
              key={idx}
              user={user}
              type={type}
              setType={setType}
              showType={idx === 0}
            />
          ))}
          <ClearRecord />
        </div>
      </main>
    </div>
  );
};

export default Page;
