import type { AppProps } from "next/app";
import createCache, { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const clientSideEmotionCache = createCache({ key: "css" });

interface MyAppProps extends AppProps{
  emotionCache: EmotionCache
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
