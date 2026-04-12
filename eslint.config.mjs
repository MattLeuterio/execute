import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: 'JSXOpeningElement[name.name="button"]',
          message: "Use shared shadcn-style Button from src/components/ui/button instead of native <button>.",
        },
        {
          selector: 'JSXOpeningElement[name.name="input"]',
          message: "Use shared shadcn-style input components from src/components/ui instead of native <input>.",
        },
        {
          selector: 'JSXOpeningElement[name.name="select"]',
          message: "Use shared shadcn-style Select from src/components/ui/select instead of native <select>.",
        },
        {
          selector: 'JSXOpeningElement[name.name="textarea"]',
          message: "Use shared shadcn-style Textarea from src/components/ui/textarea instead of native <textarea>.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
