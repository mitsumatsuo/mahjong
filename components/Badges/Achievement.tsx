import { User } from "../../lib/mahjong";

const Achievement = ({ user }: { user: User }) => {
  if (!user || !user.achievement) return null;
  return (
    <div className="absolute right-0 bottom-1/2 inset-y-0">
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
          {user.achievement.split(',').map((i, idx) => <span key={idx} className="px-0">「{i}」</span>)}
        </div>
      </div>
    </div>
  );
};

export default Achievement;
