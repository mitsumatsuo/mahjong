import { User } from "../../lib/mahjong";

const Record = ({ user }: { user: User }) => {
  if (!user || !user.record) return null;
  return (
    <div className="absolute left-1 top-1">
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
          {user.record.split(',').map((i, idx) => <span key={idx} className="px-0">「{i}」</span>)}
        </div>
      </div>
    </div>
  );
};

export default Record;
