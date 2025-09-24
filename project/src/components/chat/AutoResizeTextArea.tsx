import React, { useRef, useEffect } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function AutoResizeTextarea(props: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [props.value]);

  return (
    <textarea
      {...props}
      ref={ref}
      className={`custom-textarea w-full resize-none focus:outline-none border border-gray-300 dark:border-neutral-medium bg-white dark:bg-neutral-medium px-4 py-3 rounded-2xl ${props.className}`}
    />
  );
}
