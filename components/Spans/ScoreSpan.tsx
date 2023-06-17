import { Fragment, useState } from "react";
import { User, ScoreDetail } from "../../lib/mahjong";

export const TypeSelectButton = ({
  type,
  setType,
}: {
  type: number;
  setType: (type: number) => void;
}) => {
  return (
    <Fragment>
      <span
        className={`border text-xs py-px px-2 rounded whitespace-nowrap ${
          type === 0 ? "bg-green-300 border-green-400" : ""
        }`}
        onClick={(e) => setType(0)}
      >
        平均
      </span>
      <span
        className={`border text-xs py-px px-2 rounded whitespace-nowrap ${
          type === 1 ? "bg-green-300 border-green-400" : ""
        }`}
        onClick={(e) => setType(1)}
      >
        合計
      </span>
      <span
        className={`border text-xs py-px px-2 rounded whitespace-nowrap ${
          type === 2 ? "bg-green-300 border-green-400" : ""
        }`}
        onClick={(e) => setType(2)}
      >
        参加
      </span>
    </Fragment>
  );
};

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
  // const [type, setType] = useState(0);
  const { rank } = user;
  return (
    <>
      <div className="border flex">
        <div className="w-24 border">
          <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
            公式
          </div>
          <div className="text-center font-mono text-sm flex items-center justify-center">
            {getScoreText(type, user.score.league)}
          </div>
        </div>
        <div className="w-24 border">
          <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
            練習
          </div>
          <div className="text-center font-mono text-sm flex items-center justify-center">
            {getScoreText(type, user.score.open)}
          </div>
        </div>
      </div>

      <div className="border flex">
        <div className="w-16 border">
          <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
            一位
          </div>
          <div className="text-center font-mono text-sm flex items-center justify-center">
            {getRankText(type, rank.first, user)}
          </div>
        </div>
        <div className="w-16 border">
          <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
            二位
          </div>
          <div className="text-center font-mono text-sm flex items-center justify-center">
            {getRankText(type, rank.second, user)}
          </div>
        </div>
        <div className="w-16 border">
          <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
            三位
          </div>
          <div className="text-center font-mono text-sm flex items-center justify-center">
            {getRankText(type, rank.third, user)}
          </div>
        </div>
        <div className="w-16 border">
          <div className="text-center text-sm flex items-center justify-center bg-slate-200 px-2">
            四位
          </div>
          <div className="text-center font-mono text-sm flex items-center justify-center">
            {getRankText(type, rank.fourth, user)}
          </div>
        </div>
      </div>

      {showType && <TypeSelectButton type={type} setType={setType} />}
    </>
  );
};
const getScoreText = (type: number, value: ScoreDetail): any => {
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
        <span className="text-xs font-thin font-serif w-5">点</span>
      ) : type === 1 ? (
        <span className="text-xs font-thin font-serif w-5">点</span>
      ) : (
        <span className="text-xs font-thin font-serif w-5">回</span>
      )}
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
