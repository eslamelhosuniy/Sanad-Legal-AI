import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function IconButton({ icon: Icon, ...props }: Props) {
  return (
    <button
      {...props}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${props.className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
