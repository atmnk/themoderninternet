import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ["next-app-template-main/**"],
  },
  prettier,
];

export default eslintConfig;
