// src/env.d.ts
interface ImportMetaEnv {
  VITE_IMGBB_API_KEY: string;
  VITE_TOKEN: string;
  VITE_DATABASEURL: string;
  VITE_TEST_USER_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
