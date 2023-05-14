
import { config } from "../config/contracts";

const optionsForDropdown = [
  {
    text: "WBNB",
    value: "wbnb",
    image: "/assets/background.png",
    icon: "bnb",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    decimals: 18,
  },
  // {
  //   text: "USDC",
  //   value: "usdc",
  //   image: "/assets/background.png",
  //   icon: "usdc",
  //   address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  //   decimals: 18,
  // },
  // {
  //   text: "USDT",
  //   value: "usdt",
  //   image: "/assets/background.png",
  //   icon: "usdt",
  //   address: "0x55d398326f99059ff775485246999027b3197955",
  //   decimals: 18,
  // },
  // {
  //   text: "BTCB",
  //   value: "btcb",
  //   image: "/assets/background.png",
  //   icon: "btc",
  //   address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
  //   decimals: 18,
  // },
  // {
  //   text: "XRP",
  //   value: "xrp",
  //   image: "/assets/background.png",
  //   icon: "xrp",
  //   address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
  //   decimals: 18,
  // },
  {
    text: "PTC",
    value: "ptc",
    image: "/assets/background.png",
    icon: "ptc",
    address: config.address,
    decimals: config.decimals,
  },
];

export default optionsForDropdown;