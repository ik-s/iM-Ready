import { HiCheck } from "react-icons/hi2";

type CheckMarkProps = {
  checked?: boolean;
  size?: "small" | "large";
};

export function CheckMark({
  checked = true,
  size = "large",
}: CheckMarkProps) {
  const dimension = size === "small" ? "h-4 w-4" : "h-7 w-7";

  return (
    <span
      aria-hidden="true"
      className={[
        "grid shrink-0 place-items-center rounded-full text-white",
        dimension,
        checked ? "bg-[#00A58F]" : "bg-[#CBD2D0]",
      ].join(" ")}
    >
      <HiCheck
        className={size === "small" ? "h-3 w-3" : "h-4 w-4"}
      />
    </span>
  );
}
