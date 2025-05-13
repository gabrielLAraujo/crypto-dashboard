import { MantineProvider, createTheme } from '@mantine/core';
import type { AppProps } from 'next/app';
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Component {...pageProps} />
    </MantineProvider>
  );
}
