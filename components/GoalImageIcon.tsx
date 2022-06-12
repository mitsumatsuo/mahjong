import Image from "next/image";
import { Goal } from "../lib/mahjong";

const GoalImageIcon = ({
  kanji,
  kana,
  han,
  condition,
  image,
  description,
  probability,
  width,
  height,
}: Goal) => {
  return (
    <div className="hidden md:block absolute top-10 right-left w-[350px] h-[30px] p-1">
      <div className="relative w-full h-full">
        <div className="absolute shrink-0 w-full h-full group">
          <Image
            src={`/image/${image}`}
            width={width}
            height={height}
            layout="responsive"
            className=""
            alt={kana}
          />
          <div className="hidden group-hover:block relative">
            <div className="mx-auto w-0 h-0 border-b-blue-500 border-8 border-transparent"></div>
            <div className="rounded-lg bg-gradient-to-r from-green-400/80 to-blue-500/80 p-2 px-8">
              <div className="font-serif">
                <div className="flex justify-between items-center">
                  <span>役名</span>
                  <span>
                    {kana}({kanji})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>役</span>
                  <span>
                    {han === 13
                      ? "役満"
                      : han === 14
                      ? "ダブル役満"
                      : `${han}翻`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>成立</span>
                  <span>{condition}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>出現率</span>
                  <span>{`${probability ? probability + "%" : "???"}`}</span>
                </div>
                <div className="">
                  <span>{description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GoalImageIcon;
