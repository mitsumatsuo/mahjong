import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useGoals from "../hooks/useGoals";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { Goal } from "../lib/mahjong";
import Image from "next/image";
import { ReactNode } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import { Dispatch } from "react";

const duration = 0.5;
const Yaku: NextPage = () => {
  const { data: goals, isLoading, isError } = useGoals();
  const [index, setIndex] = useState(0);
  const [ref, { width }] = useMeasure();
  let prev = usePrevious(index);
  let direction = prev ? (prev < index ? 1 : -1) : -1;

  if (isLoading) return null;
  if (isError) return null;

  const idx =
    index % goals.length === 0
      ? 0
      : index % goals.length < 0
      ? goals.length + (index % goals.length)
      : index % goals.length;
  const {
    image,
    width: iw,
    height: ih,
    kanji,
    kana,
    han,
    condition,
    description,
    probability,
  }: Goal = goals[idx];

  return (
    <MotionConfig transition={{ duration }}>
      <div className="">
        <main className="flex flex-col relative items-center">
          <div className="flex space-x-3 justify-center py-10">
            <button
              onClick={() => setIndex((s) => s - 1)}
              className="bg-white rounded px-1 shadow-sm shadow-black text-[purple] font-serif"
            >
              <ChevronLeftIcon className="w-6" />
            </button>
            <button
              onClick={() => setIndex(Math.floor(Math.random() * goals.length))}
              className="bg-white rounded px-1 shadow-sm shadow-black text-[purple] font-serif"
            >
              <QuestionMarkCircleIcon className="w-6" />
            </button>
            <button
              onClick={() => setIndex((s) => s + 1)}
              className="bg-white rounded px-1 shadow-sm shadow-black text-[purple] font-serif"
            >
              <ChevronRightIcon className="w-6" />
            </button>
          </div>
          <div ref={ref} className="relative w-[400px] h-14 overflow-x-hidden">
            <AnimatePresence custom={{ direction, width }}>
              <motion.div
                key={`${index}`}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={{ direction, width }}
                className="w-[400px] absolute overflow-x-hidden"
              >
                <Image
                  src={`/image/${image}`}
                  width={iw}
                  height={ih}
                  layout="responsive"
                  className=""
                  alt={kana}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="border border-green-900 w-[400px]">
            <ResizablePanel>
              <DescriptionItem value={`${kana}(${kanji})`}>
                役名
              </DescriptionItem>
              <DescriptionItem
                value={
                  han === 13 ? "役満" : han === 14 ? "ダブル役満" : `${han}翻`
                }
              >
                役
              </DescriptionItem>
              <DescriptionItem value={condition}>成立</DescriptionItem>
              <DescriptionItem
                value={`${probability ? probability + "%" : "???"}`}
              >
                出現率
              </DescriptionItem>
              <DescriptionItem>{description}</DescriptionItem>
            </ResizablePanel>
          </div>
        </main>
      </div>
    </MotionConfig>
  );
};

type Variants = {
  enter: ({ direction, width }: { direction: number; width: number }) => {
    x: number;
    opacity: number;
  };
  center: { x: number; opacity: number };
  exit: ({ direction, width }: { direction: number; width: number }) => {
    x: number;
    opacity: number;
  };
};

let variants: Variants = {
  enter: ({ direction, width }: { direction: number; width: number }) => {
    return {
      x: direction * width,
      opacity: 1,
    };
  },
  center: { x: 0, opacity: 1 },
  exit: ({ direction, width }: { direction: number; width: number }) => {
    return {
      x: direction * -width,
      opacity: 1,
    };
  },
};

const ResizablePanel = ({ children }: { children: ReactNode }) => {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ height: height ?? "auto" }}
      className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            ref={ref}
            className={`${
              height ? "absolute" : "relative"
            } px-8 py-2 space-y-2 w-full`}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const usePrevious = (state: number) => {
  const [tuple, setTuple]: [(number | null)[], Dispatch<(number | null)[]>] =
    useState([null, state]);
  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }
  return tuple[0];
};

const DescriptionItem = ({
  value,
  children,
}: {
  value?: string | number | undefined;
  children: ReactNode | string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <span>{children}</span>
      {value && <span>{value}</span>}
    </div>
  );
};

export default Yaku;

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.
  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
