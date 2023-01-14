import { Penalty } from "../../lib/mahjong";

const Penalty = ({ penalty }: { penalty: Penalty }) => {
  if (!penalty || penalty.count === 0) return null;

  return (
    <div className="absolute left-1 bottom-0.5">
      <div className="relative group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-[blue]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        <div className="absolute hidden group-hover:block -top-8 -left-2 text-sm truncate z-10 bg-white border border-black py-1 px-4">
          錯和 {penalty.count} 回
        </div>
      </div>
    </div>
  );
};

export default Penalty;
