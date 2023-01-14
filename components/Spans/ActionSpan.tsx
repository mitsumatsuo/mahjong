import { MouseEventHandler } from "react";

const cn = (...classNames: string[]) => {
  return classNames.filter(Boolean).join(" ");
};

const ActionSpan = ({
  labelText,
  themeColor,
  value,
  action,
}: {
  labelText: string;
  themeColor: string;
  value: boolean;
  action: MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <span
      className={cn(
        "inline-block w-32 rounded-full bg-white shadow-sm shadow-black text-center text-xl font-bold duration-200",
        value
          ? themeColor === "1"
            ? "shadow-none translate-y-0 bg-[#01aaf2]"
            : "shadow-none translate-y-0 bg-[#f1e23b]"
          : themeColor === "1"
          ? "hover:-translate-y-px active:shadow-none active:translate-y-0 active:bg-[#01aaf2]"
          : "hover:-translate-y-px active:shadow-none active:translate-y-0 active:bg-[#f1e23b]"
      )}
      onClick={action}
    >
      {labelText}
    </span>
  );
};

export default ActionSpan;
