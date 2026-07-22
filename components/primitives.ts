import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[var(--accent)] to-[var(--danger)]",
      yellow: "from-[var(--warning)] to-[var(--accent)]",
      blue: "from-[var(--accent)] to-[var(--success)]",
      cyan: "from-[var(--accent)] to-[var(--accent-hover)]",
      green: "from-[var(--success)] to-[var(--accent)]",
      pink: "from-[var(--danger)] to-[var(--accent)]",
      foreground: "from-[var(--foreground)] to-[var(--muted)]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-muted block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
