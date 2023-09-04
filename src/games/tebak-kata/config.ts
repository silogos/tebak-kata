export type MenuType = {
  key: number;
  title: string;
  wordLength: number;
  totalChance: number;
};

const config = {
  menu: [
    { key: '4kata', title: '4 Kata', wordLength: 4, totalChance: 5 },
    { key: '5kata', title: '5 Kata', wordLength: 5, totalChance: 7 },
    { key: '6kata', title: '6 Kata', wordLength: 6, totalChance: 9 },
    { key: '7kata', title: '7 Kata', wordLength: 7, totalChance: 12 },
  ],
};

export default config;
