import { AppProps } from 'next/app';

import './globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex flex-col p-12 gap-10 items-center">
      <Component {...pageProps} />
    </main>
  );
}
