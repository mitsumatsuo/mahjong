import { Fragment, useEffect, useState } from "react";
import { User, ScoreDetail, UserRank } from "../../lib/mahjong";

const Button = ({
  type,
  setType,
  value,
  text,
}: {
  type: number;
  setType: (type: number) => void;
  value: number;
  text: string;
}) => (
  <span
    className={`border text-xs py-px px-2 rounded whitespace-nowrap cursor-pointer active:border-green-400/80 active:bg-green-300/80 hover:border-green-400 transition-all ${
      type === value ? "bg-green-300 border-green-400" : ""
    }`}
    onClick={(e) => setType(value)}
  >
    {text}
  </span>
);

export const TypeSelectButton = ({
  type,
  setType,
}: {
  type: number;
  setType: (type: number) => void;
}) => {
  return (
    <Fragment>
      <Button type={type} value={0} setType={setType} text={"平均"} />
      <Button type={type} value={1} setType={setType} text={"合計"} />
      <Button type={type} value={2} setType={setType} text={"参加"} />
    </Fragment>
  );
};

const AverageRankLabel = ({ text, rank }: { text: string; rank: UserRank }) => {
  return (
    <div className="w-24 border">
      <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
        {text}
      </div>
      <div className="text-center font-mono text-sm flex items-center justify-center">
        {getAverageRankText(rank.first, rank.second, rank.third, rank.fourth)}
      </div>
    </div>
  );
};

const ScoreLabel = ({
  text,
  unit,
  type,
  value,
}: {
  text: string;
  unit?: string;
  type: number;
  value: ScoreDetail;
}) => {
  return (
    <div className="w-24 border">
      <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
        {text}
      </div>
      <div className="text-center font-mono text-sm flex items-center justify-center">
        {getScoreText(type, value, unit)}
      </div>
    </div>
  );
};

const UnderZeroLabel = ({ user }: { user: User }) => (
  <div className="w-16 border">
    <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
      箱割れ
    </div>
    <div className="text-center font-mono text-sm flex items-center justify-center">
      {getUnderZeroText(user)}
    </div>
  </div>
);

const ScoreSpan = ({
  user,
  type,
  setType,
  showType,
}: {
  user: User;
  type: number;
  setType: (type: number) => void;
  showType: boolean;
}) => {
  console.log(user);
  const { rank } = user;
  return (
    <>
      <div className="border flex">
        <ScoreLabel text={"公式"} type={type} value={user.score.league} />
        {/* <ScoreLabel text={"練習"} type={type} value={user.score.open} /> */}
        <AverageRankLabel text={"平均順位"} rank={rank} />
      </div>

      <div className="border flex">
        <Place label="一位" type={type} rank={rank.first} user={user} />
        <Place label="二位" type={type} rank={rank.second} user={user} />
        <Place label="三位" type={type} rank={rank.third} user={user} />
        <Place label="四位" type={type} rank={rank.fourth} user={user} />
      </div>

      <div className="">
        <UnderZeroLabel user={user} />
      </div>

      {showType && <TypeSelectButton type={type} setType={setType} />}
    </>
  );
};

const Spacer = () => <div className="px-2 border-none outline-0"></div>;

const Place = ({
  label,
  type,
  rank,
  user,
}: {
  label: String;
  type: number;
  rank: number;
  user: User;
}) => (
  <div className="w-16 border">
    <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
      {label}
    </div>
    <div className="text-center font-mono text-sm flex items-center justify-center">
      {getRankText(type, rank, user)}
    </div>
  </div>
);
const getAverageRankText = (
  first: number,
  second: number,
  third: number,
  fourth: number
): any => {
  const val =
    Math.round(
      ((first * 1 + second * 2 + third * 3 + fourth * 4) /
        (first + second + third + fourth)) *
        100
    ) / 100;
  let minus = val > 2.5;

  return (
    <div className="flex justify-center items-end w-full">
      <span
        className={`text-lg font-bold flex-1 ${
          minus ? "text-[red]" : "text-[blue]"
        }`}
      >
        {val}
      </span>
      <span className="text-xs font-thin font-serif w-5">位</span>
    </div>
  );
};
const getScoreText = (
  type: number,
  value: ScoreDetail,
  unit: string | undefined
): any => {
  const val =
    type === 0
      ? value.match > 0
        ? Math.round((value.total / value.match) * 10) / 10
        : "-"
      : type === 1
      ? value.total
      : type === 2
      ? value.match
      : "-";

  let minus = type !== 2 && val !== "-" && val.toString()[0] === "-";
  let nonZero = type !== 2 && val !== 0 && val.toString()[0] !== "-";

  return (
    <div className="flex justify-center items-end w-full">
      <span
        className={`text-lg font-bold flex-1 ${
          minus ? "text-[red]" : nonZero ? "text-[blue]" : ""
        }`}
      >
        {val}
      </span>
      {type === 0 ? (
        <span className="text-xs font-thin font-serif w-5">{unit ?? "点"}</span>
      ) : type === 1 ? (
        <span className="text-xs font-thin font-serif w-5">{unit ?? "点"}</span>
      ) : (
        <span className="text-xs font-thin font-serif w-5">{unit ?? "回"}</span>
      )}
    </div>
  );
};
const getUnderZeroText = (user: User): any => {
  const val = user.score.league.negative;
  return (
    <div className="flex justify-center items-end w-full">
      <span className="text-lg font-bold flex-1">{val}</span>
      <span className="text-xs font-thin font-serif w-5">回</span>
    </div>
  );
};

const getRankText = (type: number, value: number, user: User): any => {
  const val =
    type === 0
      ? user.score.open.match + user.score.league.match === 0
        ? 0
        : Math.round(
            (value / (user.score.open.match + user.score.league.match)) * 1000
          ) / 10
      : value;

  return (
    <div className="flex justify-center items-end w-full">
      <span className="text-lg font-bold flex-1">{val}</span>
      {type === 0 ? (
        <span className="text-xs font-thin font-serif w-5">%</span>
      ) : (
        <span className="text-xs font-thin font-serif w-5">回</span>
      )}
    </div>
  );
};

export default ScoreSpan;
