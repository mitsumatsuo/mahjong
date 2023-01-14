import { MouseEventHandler } from "react";

const ClearSpan = ({
  labelText,
  action,
}: {
  labelText: string;
  action: MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <span
      className="inline-block w-[270px] rounded-full bg-white shadow-sm shadow-black text-center text-xl font-bold hover:-translate-y-px duration-200 active:shadow-none active:translate-y-0 active:bg-[#3dc14f]"
      onClick={action}
    >
      {labelText}
    </span>
  );
};
export default ClearSpan;
