interface ImportMetaEnv {
    readonly PUBLIC_HUGGING_FACE_TOKEN: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }