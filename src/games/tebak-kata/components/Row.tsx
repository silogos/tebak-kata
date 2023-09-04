import { FC, memo, useEffect } from 'react';

const Row: FC<{ word: string; hasAnswered: boolean; answer?: string }> = ({
  word,
  hasAnswered,
  answer,
}) => {
  useEffect(() => console.log({ word }), [word]);

  return (
    <div className="row">
      {Array(word.length)
        .fill('1')
        .map((_, index) => {
          const value = answer ? answer[index] : '';
          let state = 'normal';
          if (hasAnswered) {
            if (word[index] === value) {
              state = 'correct';
            } else if (word.includes(value)) {
              state = 'include';
            }
          }

          return (
            <div key={index} className={`box ${state}`}>
              {value}
            </div>
          );
        })}
    </div>
  );
};

export default memo(Row);
