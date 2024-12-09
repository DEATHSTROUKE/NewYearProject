import { Letter } from '@shared'
import React, { useLayoutEffect } from 'react'

import { Feedback } from '@/components/Feedback/Feedback'
import { Game } from '@/components/Game/Game'
import { HowToPlay } from '@/components/HowToPlay/HowToPlay'
import { LotteryTicket } from '@/components/LotteryTicket/LotteryTicket'
import { Meaning } from '@/components/Meaning/Meaning'
import { Message } from '@/components/Message/Message'
import { Rules } from '@/components/Rules/Rules'
import { Train } from '@/components/Train/Train'

import { useMainStore } from '@/store/mainStore'

function TestPage() {
  const setTimer = useMainStore(state => state.setTimer)

  useLayoutEffect(() => {
    setTimer('2023-12-21T22:52:27.777Z')
  }, [setTimer])

  const letters: Letter[] = [
    { letter: 'а', state: 'yellow' },
    { letter: 'в', state: 'yellow' },
    { letter: 'а', state: 'green' },
    { letter: 'н', state: 'grey' },
    { letter: 'с', state: 'yellow' },
    { letter: 'с', state: 'green' },
    { letter: 'м', state: 'grey' },
    { letter: 'о', state: 'grey' },
    { letter: 'л', state: 'yellow' },
    { letter: 'а', state: 'green' },
    { letter: 'с', state: 'green' },
    { letter: 'л', state: 'green' },
    { letter: 'а', state: 'green' },
    { letter: 'в', state: 'green' },
    { letter: 'а', state: 'green' },
  ]

  return (
    <div className="main-wrapper">
      <div className="main-page__row">
        <Train
          activeGifts={0}
          isBigTrain
          prizesText={['1', '2', '3', '4', '5']}
        />
      </div>
      <div className="main-page__row">
        <Message text="Новогодняя викторина начнется 18 декабря в 10.00" />
      </div>
      <div className="main-page__row">
        <Message
          text={`<a href="https://google.com" target="_blank">Задание 1.</a> <a
          href="https://telegra.ph/Novogodnyaya-viktorina-Naryadi-svoyu-yolochku-12-12"
          target="_blank"
        >
          К правилам
        </a> На стебле сидит краса, желтизна в волосах, плотками повязалась, скрытою осталась!`}
        />
      </div>
      <div className="main-page__row">
        <a
          href="https://telegra.ph/Novogodnyaya-viktorina-Naryadi-svoyu-yolochku-12-12"
          target="_blank"
          className="main-page__btn"
          rel="noreferrer"
        >
          К правилам
        </a>
      </div>
      <div className="main-page__row">
        <Rules />
      </div>
      <div className="main-page__row">
        <HowToPlay />
      </div>
      {/* Meaning */}
      <div className="main-page__row">
        <Meaning text="Кукуруза - Злак с толстым стеблем и крупными съедобными желтыми зернами, собранными в початок Злак с толстым стеблем и крупными съедобными желтыми зернами, собранными в початок, а также зерна этого растения." />
      </div>
      {/* Feedback */}
      <div className="main-page__row">
        <Feedback
          text="Деду Морозу хочется узнать твое мнение"
          afterFeedbackText="Спасибо! Все ваши ответы мы внимательно изучим! Следующее задание викторины будет ждать вас в телеграм-канале «Благополучие» в 10.00 мск"
        />
      </div>
      {/* Game field */}
      <div className="main-page__row">
        <Game wordLength={5} currentLine={3} isEnd={false} letters={letters} />
      </div>
      {/* Порядковый номер */}
      <div className="main-page__row">
        <LotteryTicket ticketNumber="111" textBelow="Ссылка будет позже" />
      </div>
      {/* Елка на канвасе */}
      <div className="main-page__row"></div>
    </div>
  )
}

export default TestPage
