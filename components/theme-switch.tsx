import { FC, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

export interface ThemeSwitchProps {
  className?: string;
}

const emptySubscribe = () => () => {};

const themeOptions = [
  {
    value: "midnight",
    label: "Midnight",
    swatch: "linear-gradient(135deg, #80d4ff 0%, #6f7cff 100%)",
  },
  {
    value: "sunrise",
    label: "Sunrise",
    swatch: "linear-gradient(135deg, #ff9d5c 0%, #ffd36f 100%)",
  },
  {
    value: "paper",
    label: "Paper",
    swatch: "linear-gradient(135deg, #d7b98f 0%, #f7ead4 100%)",
  },
  {
    value: "canopy",
    label: "Canopy",
    swatch: "linear-gradient(135deg, #55d7a5 0%, #b9f27c 100%)",
  },
  {
    value: "lagoon",
    label: "Lagoon",
    swatch: "linear-gradient(135deg, #46c7d9 0%, #7ab6ff 100%)",
  },
  {
    value: "signal",
    label: "Signal",
    swatch: "linear-gradient(135deg, #ff577f 0%, #8e7dff 100%)",
  },
  {
    value: "ember",
    label: "Ember",
    swatch: "linear-gradient(135deg, #ff7a59 0%, #ffcf6e 100%)",
  },
  {
    value: "blossom",
    label: "Blossom",
    swatch: "linear-gradient(135deg, #ff91bc 0%, #ffd5ec 100%)",
  },
  {
    value: "graphite",
    label: "Graphite",
    swatch: "linear-gradient(135deg, #8fa0b8 0%, #d4dce8 100%)",
  },
] as const;

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { setTheme, theme } = useTheme();

  if (!isMounted) return <div aria-hidden className="h-10 w-36 rounded-full" />;

  const activeTheme =
    themeOptions.find((option) => option.value === theme) ?? themeOptions[0];

  return (
    <label
      className={clsx(
        "relative inline-flex items-center gap-3 rounded-full border border-separator",
        "bg-surface px-3 py-2 text-foreground shadow-surface",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-4 w-4 rounded-full border border-white/20"
        style={{ background: activeTheme.swatch }}
      />
      <span className="hidden text-xs uppercase tracking-[0.22em] text-muted md:inline">
        Theme
      </span>
      <select
        aria-label="Select theme"
        className="appearance-none bg-transparent pr-6 text-sm font-medium text-foreground outline-none"
        value={activeTheme.value}
        onChange={(event) => setTheme(event.target.value)}
      >
        {themeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
      >
        ▼
      </span>
    </label>
  );
};
