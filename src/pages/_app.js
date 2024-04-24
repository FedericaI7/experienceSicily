import "@/styles/globals.css";
//core styles are required for all packages
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
}
