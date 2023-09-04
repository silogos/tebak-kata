import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Row from './components/Row';
import Overlay from './components/Overlay';
import config, { MenuType } from './config';
import styles from './styles/TebakKata.module.scss';

export const getStaticPaths: GetStaticPaths = () => {
  const paths = config.menu.map((item) => ({ params: { key: item.key } }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  words: string[];
  menu: MenuType;
}> = async (context) => {
  const menu = config.menu.find((item) => item.key === context?.params?.key) as
    | MenuType
    | undefined;

  if (!menu) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    'https://raw.githubusercontent.com/damzaky/kumpulan-kata-bahasa-indonesia-KBBI/master/indonesian-words.txt',
    { method: 'GET' },
  );
  const responseText = await response.text();
  const words = responseText
    .split('\n')
    .filter((item) => item.length === menu.wordLength);

  console.log({ words });

  return {
    props: {
      words,
      menu,
    },
  };
};

const Detail = ({
  words,
  menu,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [word, setWord] = useState<string>('');
  const [answer, setAnswer] = useState<string[]>([]);
  const [guess, setGuess] = useState<string>('');
  const [gameState, setGameState] = useState<'start' | 'end' | 'failed'>(
    'start',
  );
  const getWord = useCallback(() => {
    const word = words[Math.floor(Math.random() * words.length)];
    console.log({ word });
    setWord(word);
  }, [words]);

  const handleStart = useCallback(() => {
    setGameState('start');
    setAnswer([]);
    setGuess('');
    getWord();
  }, [getWord]);

  const handleKeyPress = useCallback(
    (ev: KeyboardEvent) => {
      const char = ev.key;
      let result = guess || '';

      if (['end', 'failed'].includes(gameState)) {
        return;
      }

      if (char === 'Enter' && guess?.length === menu.wordLength) {
        if (!words.includes(guess)) {
          alert(`${guess} bukan kata`);
          return;
        }

        setAnswer((prevAnswer) => [...prevAnswer, guess]);

        if (guess === word) {
          setGameState('end');
        } else {
          if (answer.length + 1 === menu.totalChance) {
            setGameState('failed');
          }
        }

        result = '';
      }

      if (char === 'Backspace' && result.length > 0) {
        result = result?.slice(0, -1);
      }

      if (
        /^[a-zA-Z]+$/.test(char) &&
        char.length === 1 &&
        guess?.length < menu.wordLength
      ) {
        result += ev.key;
      }

      setGuess(result.toLowerCase());
    },
    [guess, answer, gameState, word, menu, words],
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);

    return () => window.removeEventListener('keyup', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    handleStart();
  }, [handleStart]);

  return (
    <Layout title={`Tebak Jumlah ${menu.title}`}>
      <div className={styles.container}>
        <div className="content">
          {Array(menu?.totalChance)
            .fill(true)
            .map((_, index) => {
              const hasAnswered = answer.length > index;
              const isActive = answer.length === index;
              const selectedAnswer = (isActive ? guess : answer[index]) || '';
              return (
                <Row
                  key={index}
                  word={word}
                  hasAnswered={hasAnswered}
                  answer={selectedAnswer}
                />
              );
            })}

          <Overlay show={['end', 'failed'].includes(gameState)}>
            {gameState === 'end' && 'Game End'}
            {gameState === 'failed' && 'Failed'}
            <button onClick={handleStart}>Retry</button>
          </Overlay>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
