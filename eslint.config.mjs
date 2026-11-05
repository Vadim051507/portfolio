import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // components/react-bits is vendored third-party code, kept as published.
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "components/react-bits/**"]),
]);

export default eslintConfig;
