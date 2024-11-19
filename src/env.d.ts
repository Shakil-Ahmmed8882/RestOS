// src/env.d.ts
interface ImportMetaEnv {
  VITE_IMGBB_API_KEY: string;
  VITE_TOKEN: string; // Ensure the token is prefixed with 'VITE_'
  VITE_BACKENT_URL: string; // Ensure the token is prefixed with 'VITE_'
  VITE_TEST_USER_ID: string; // Ensure the token is prefixed with 'VITE_'
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
