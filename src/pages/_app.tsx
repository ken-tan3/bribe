import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider, createTheme } from "@nextui-org/react";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      // brand colors
      primaryLight: "$red300",
      primary: "$red600",
      primaryDark: "$red800",
      white: "#ffffff",
      gray: "$gray400",
      twitter: "#1DA1F2",
    },
    space: {},
    fonts: {},
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <NextUIProvider theme={theme}>
          <Component {...pageProps} />
        </NextUIProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
