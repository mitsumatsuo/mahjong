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

const goals = [
  "🀢🀣🀤🀥(花牌)",
  "🀦🀧🀨🀩(季節牌)",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　リーチ(立直) 1翻 門前のみ 出現率:43%",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　イッパツ(一発) 1翻 門前のみ 出現率:10%",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　メンゼンチンツモ(門前清自摸和) 1翻 門前のみ 出現率:18%",
  "🀅🀅🀅🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　ヤクハイ(役牌) 1翻 鳴きOK 出現率:40%",
  "🀈🀈🀉🀊🀋🀔🀔🀔🀛🀛🀛🀞🀟🀠　タンヤオ(断么九) 1翻 鳴きOK 出現率:21%",
  "🀇🀇🀇🀈🀉🀊🀋🀋🀌🀍🀎🀏🀏🀏　ピンフ(平和) 1翻 門前のみ 出現率:20%",
  "🀉🀊🀋🀉🀊🀋🀫🀫🀫🀫🀫🀫🀫🀫　イーペーコー(一盃口) 1翻 門前のみ 出現率:4.5%",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　ハイテイ(海底撈月) 1翻 鳴きOK 出現率:0.5%",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　ホウテイ(河底撈月) 1翻 鳴きOK 出現率:0.75%",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　リンシャンカイホウ(嶺上開花) 1翻 鳴きOK 出現率:0.25%",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　チャンカン(槍槓) 1翻 鳴きOK 出現率:0.05%",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　ダブルリーチ(ダブル立直) 2翻 門前のみ 出現率:0.15%",
  "🀋🀌🀍🀝🀞🀟🀔🀕🀖🀫🀫🀫🀫🀫　サンショクドウジュン(三色同順) 2翻 喰下り1翻 出現率:3.5%",
  "🀉🀉🀉🀛🀛🀛🀒🀒🀒🀫🀫🀫🀫🀫　サンショクドウコウ(三色同刻) 2翻 鳴きOK 出現率:0.04%",
  "🀉🀉🀉🀟🀟🀟🀑🀑🀑🀫🀫🀫🀫🀫　サンアンコウ(三暗刻) 2翻 鳴きOK 出現率:0.7%",
  "🀇🀈🀉🀊🀋🀌🀍🀎🀏🀫🀫🀫🀫🀫　イッキツウカン(一気通貫) 2翻 喰下り1翻 出現率:2.5%",
  "🀇🀇🀉🀉🀋🀋🀟🀟🀡🀡🀀🀀🀄🀄　チートイツ(七対子) 2翻25符 門前のみ 出現率:2.5%",
  "🀇🀇🀇🀃🀃🀃🀫🀫🀉🀉🀉🀘🀘🀘　トイトイ=トイトイホー(対々和) 2翻 鳴きOK 出現率:3.75%",
  "🀇🀇🀇🀍🀎🀏🀐🀑🀒🀂🀂🀂🀅🀅　チャンタ(混全帯幺九) 2翻 喰下り1翻 出現率:1.1%",
  "🀫🀇🀇🀫🀝🀝🀝🀝🀃🀃🀃🀃🀫🀫🀫🀫🀫　サンカンツ(三槓子) 2翻 鳴きOK 出現率:0.005%",
  "🀫🀫🀫🀫🀫🀫🀅🀅🀅🀆🀆🀄🀄🀄　ショウサンゲン(小三元) 2翻(実質4翻) 鳴きOK 出現率:0.15%",
  "🀆🀆🀇🀇🀇🀏🀏🀏🀙🀙🀙🀃🀃🀃　ホンロウトウ(混老頭) 2翻(実質4翻) 鳴きOK 出現率:0.09%",
  "🀈🀉🀊🀈🀉🀊🀟🀠🀡🀟🀠🀡🀫🀫　リャンペーコー(二盃口) 3翻 門前のみ 出現率:0.05%",
  "🀇🀈🀉🀍🀎🀏🀙🀙🀙🀖🀗🀘🀡🀡　ジュンチャン(純全帯公九) 3翻 喰下り2翻 出現率:0.03%",
  "🀇🀈🀉🀋🀋🀋🀌🀍🀎🀂🀂🀂🀆🀆　ホンイツ(混一色) 3翻 喰下り2翻 出現率:7%",
  "🀇🀇🀇🀈🀈🀈🀊🀋🀌🀌🀍🀎🀏🀏　チンイツ(清一色) 6翻 喰下り5翻 出現率:1%",
  "🀇🀇🀇🀌🀌🀌🀛🀛🀛🀁🀁🀁🀐🀐　スーアンコウ(四暗刻) 役満 門前のみ 出現率:0.05%",
  "🀫🀫🀫🀫🀫🀆🀆🀆🀄🀄🀄🀅🀅🀅　ダイサンゲン(大三元) 役満 鳴きOK 出現率:0.04%",
  "🀇🀏🀙🀡🀐🀘🀀🀁🀂🀃🀆🀅🀄🀄　コクシムソウ(国士無双) 役満 門前のみ 出現率:0.04%",
  "🀑🀒🀓🀓🀓🀓🀕🀕🀕🀅🀅🀗🀗🀗　リューイーソー(緑一色) 役満 鳴きOK 出現率:0.001%",
  "🀀🀀🀀🀂🀂🀂🀄🀄🀄🀅🀅🀁🀁🀁　ツーイーソー(字一色) 役満 鳴きOK 出現率:0.009%",
  "🀏🀏🀏🀙🀙🀙🀡🀡🀡🀇🀇🀘🀘🀘　チンロウトウ(清老頭) 役満 鳴きOK 出現率:0.002%",
  "🀫🀛🀛🀫🀘🀘🀘🀘🀃🀃🀃🀃🀫🀖🀖🀫　スーカンツ(四槓子) 役満 鳴きOK 出現率:0.0002%",
  "🀫🀫🀫🀀🀀🀁🀁🀁🀂🀂🀂🀃🀃🀃　ショウスーシー(小四喜) 役満 鳴きOK 出現率:0.01%",
  "🀫🀫🀀🀀🀀🀁🀁🀁🀂🀂🀂🀃🀃🀃　ダイスーシー(大四喜) 役満 鳴きOK 出現率:0.01%",
  "🀇🀇🀇🀈🀉🀊🀋🀋🀌🀍🀎🀏🀏🀏　チュウレンポウトウ(九蓮宝燈) 役満 門前のみ 出現率:0.0005%",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　チーホー＝チーホウ(地和) 役満 門前のみ 出現率:0.002%",
  "🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫🀫　テンホウ(天和) 役満 門前のみ 出現率:0.0003%",
  "🀆🀆🀆🀅🀅🀅🀄🀄🀄🀫🀫🀫🀫🀫　四暗刻+大三元 ダブル役満 門前のみ",
  "🀀🀀🀀🀂🀂🀂🀅🀅🀅🀄🀄🀄🀃🀃　四暗刻+字一色 ダブル役満 門前のみ",
  "🀅🀅🀅🀄🀄🀄🀀🀀🀁🀁🀁🀆🀆🀆　字一色+大三元 ダブル役満 鳴きOK",
  "🀀🀀🀀🀁🀁🀁🀂🀂🀄🀄🀄🀃🀃🀃　字一色+小四喜 ダブル役満 鳴きOK",
  "🀀🀀🀀🀁🀁🀁🀆🀆🀂🀂🀂🀃🀃🀃　字一色+大四喜 ダブル役満 鳴きOK",
  "🀅🀅🀅🀑🀑🀑🀓🀓🀓🀗🀗🀗🀒🀒　緑一色+四暗刻 ダブル役満 門前のみ",
  "🀅🀅🀫🀑🀑🀫🀫🀓🀓🀫🀗🀗🀗🀗🀒🀒🀒🀒　緑一色+四槓子 ダブル役満 鳴きOK",
  "🀅🀅🀫🀑🀑🀫🀫🀓🀓🀫🀗🀗🀗🀗🀒🀒🀒🀒　大四喜+四槓子 ダブル役満 鳴きOK",
  "🀇🀈🀉🀊🀋🀌🀍🀎🀏🀙🀚🀛🀜🀝🀞🀟🀠🀡🀐🀑🀒🀓🀔🀕🀖🀗🀘🀀🀁🀂🀃🀆🀅🀄(麻雀牌全種類)",
];

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

      <main className="">
        <div className="flex justify-between bg-gradient-to-r from-rose-500 via-rose-400 to-rose-300 text-white p-1">
          <h1 className="font-bold text-2xl ">{title}</h1>
          <p className="font-mono text-2xl">
            {goals[Math.floor(Math.random() * goals.length)]}
          </p>
        </div>
        <div className="p-2">
          <div className="mb-4">
            <span className="font-bold text-white text-base">メンバー</span>
          </div>
          <div className="flex space-x-1 sm:space-x-2 md:space-x-3 2xl:space-x-4 items-center font-serif">
            {users.map((user) => {
              return user.name.length > 2 ? (
                user.checked ? (
                  <div
                    key={user.id}
                    className="bg-white font-bold text-[red] text-center px-2 2xl:px-4 rounded-md border border-black/60 cursor-pointer shadow shadow-black/60 w-10 h-16 2xl:w-16 2xl:h-20 flex justify-center items-center text-sm 2xl:text-xl janpai drop-shadow-jp"
                    onClick={() => clickEventHandler(user)}
                  >
                    <div className="absolute inset-0 rounded-md bg-white"></div>
                    <div className="z-10 drop-shadow-xl">{user.name}</div>
                  </div>
                ) : (
                  <div
                    key={user.id}
                    className="bg-blue-500 text-blue-50 text-center px-2 2xl:px-4 rounded-md border border-blue-600 cursor-pointer shadow shadow-blue-500 w-10 h-16 2xl:w-16 2xl:h-20 flex justify-center items-center text-sm 2xl:text-xl janpai drop-shadow-jp"
                    onClick={() => clickEventHandler(user)}
                  >
                    <div className="absolute inset-0 rounded-md bg-blue-500"></div>
                    <div className="z-10 drop-shadow-xl">{user.name}</div>
                  </div>
                )
              ) : user.checked ? (
                <div
                  key={user.id}
                  className="bg-white font-bold text-[red] text-center px-2 2xl:px-4 rounded-md border border-black/60 cursor-pointer shadow shadow-black/60 w-10 h-16 2xl:w-16 2xl:h-20 flex justify-center items-center text-xl 2xl:text-2xl drop-shadow-jp"
                  onClick={() => clickEventHandler(user)}
                >
                  <div className="absolute inset-0 rounded-md bg-white"></div>
                  <div className="z-10 drop-shadow-xl">{user.name}</div>
                </div>
              ) : (
                <div
                  key={user.id}
                  className="relative bg-blue-500 text-blue-50 text-center px-2 2xl:px-4 rounded-md border border-blue-600 cursor-pointer shadow shadow-blue-500 w-10 h-16 2xl:w-16 2xl:h-20 flex justify-center items-center text-xl 2xl:text-2xl drop-shadow-jp"
                  onClick={() => clickEventHandler(user)}
                >
                  <div className="absolute inset-0 rounded-md bg-blue-500"></div>
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
          <hr className="my-3" />
          <div className="font-bold text-white text-base">マッチング状況</div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-1 md:gap-1 lg:gap-2 2xl:gap-4">
            {filteredMatches.map((match) => {
              const numOfAvailable = countAvailableMemberCount(
                users,
                match.users
              );
              return (
                <div
                  key={match.id}
                  className="w-[180px] 2xl:w-[300px] h-[180px] 2xl:h-[300px] 2xl:m-8 2xl:p-8 rounded-lg border-2 2xl:border-8 border-green-900 bg-[green]"
                >
                  <div className="flex justify-between items-center m-1 2xl:m-4 font-serif">
                    <span className="text-3xl 2xl:text-5xl">{match.name}</span>
                    {numOfAvailable === 4 ? (
                      <span className="text-lg 2xl:text-2xl px-2 2xl:px-4 py-px 2xl:py-1 rounded-md bg-[blue] text-white 2xl:shadow-sm shadow-[blue]/80">
                        聴牌
                      </span>
                    ) : numOfAvailable === 3 ? (
                      <span className="text-lg 2xl:text-2xl px-2 2xl:px-4 py-px 2xl:py-1 rounded-md bg-[orange] text-white 2xl:shadow-sm shadow-[orange]/80">
                        一向聴
                      </span>
                    ) : numOfAvailable === 2 ? (
                      <span className="text-lg 2xl:text-2xl px-2 2xl:px-4 py-px 2xl:py-1 rounded-md bg-rose-500 text-white 2xl:shadow-sm shadow-rose-500/80">
                        二向聴
                      </span>
                    ) : numOfAvailable === 1 ? (
                      <span className="text-lg 2xl:text-2xl px-2 2xl:px-4 py-px 2xl:py-1 rounded-md bg-[brown] text-white 2xl:shadow-sm shadow-[brown]/80">
                        三向聴
                      </span>
                    ) : (
                      <span className="text-lg 2xl:text-2xl px-2 2xl:px-4 py-px 2xl:py-1 rounded-md bg-[purple] text-white 2xl:shadow-sm shadow-[purple]/80">
                        四向聴
                      </span>
                    )}
                  </div>
                  <div className="mt-4 2xl:mt-10 flex justify-between text-center m-2 2xl:m-4 items-center font-serif 2xl:gap-4 tracking-wide">
                    {match.users.map((un, index) => {
                      let y = users.filter(
                        (user) => user.checked && user.name === un
                      );
                      return y && y.length > 0 ? (
                        <div
                          key={index}
                          className="text-2xl 2xl:text-4xl w-16 h-20 text-[orange]"
                        >
                          {un}
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="text-2xl 2xl:text-4xl w-16 h-20 text-slate-400"
                        >
                          {un}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
