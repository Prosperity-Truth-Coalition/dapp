import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { RecoilRoot } from 'recoil';
import { darkTheme } from '@rainbow-me/rainbowkit';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    bsc,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
      accentColor: '#111',
      accentColorForeground: 'white',
      
    })}>
      <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>

      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
