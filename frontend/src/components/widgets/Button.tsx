import { twMerge } from "tailwind-merge";

export default function Button({
  className,
  type = "submit",
  title,
  loading = false,
  onClick,
}: {
  className?: string | null;
  type?: "submit" | "reset" | "button" | undefined;
  title: string;
  loading?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={twMerge(
        "bg-blue-600 text-white rounded-md text-sm  px-4 py-3 cursor-pointer",
        className
      )}
      role="button"
      type={type}
      disabled={loading ?? false}
      onClick={onClick}
    >
      {loading ? (
        <span className="loading loading-bars loading-sm bg-white"></span>
      ) : (
        title
      )}
    </button>
  );
}
