import * as PIXI from 'pixi.js'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { TrainMessage } from './TrainMessage'
import { TrainEntity } from './pixi/TrainEntity'
import { useLoadAsset } from './useLoadAsset'

type TrainProps = {
  activeGifts: number
  prizesText?: string[]
  isBigTrain?: boolean
}

export const TrainCanvas: FC<TrainProps> = ({
  activeGifts,
  prizesText,
  isBigTrain,
}: TrainProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [app, setApp] = useState<TrainEntity | null>(null)
  const [messageText, setMessageText] = useState<string | null>(null)

  //const TreePath = `/Train${activeGifts}.png`
  const TrainPath = `/sprites/base_illustration.webp`

  //const spritesheet = useLoadAsset<PIXI.Spritesheet>(SpriteSheet)
  const trainImage = useLoadAsset<PIXI.Texture>(TrainPath)

  const LightPath = `/sprites/light.webp`
  const lightImage = useLoadAsset<PIXI.Texture>(LightPath)

  const SnowPath = `/sprites/Snow.webp`
  const snowImage = useLoadAsset<PIXI.Texture>(SnowPath)

  useEffect(() => {
    if (!trainImage || !snowImage || !lightImage) {
      return
    }

    const container = containerRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    container.appendChild(canvas)

    const app = new TrainEntity({
      trainTexture: trainImage,
      lightTexture: lightImage,
      snowTexture: snowImage,
      activeGifts,
      prizesText,
      isBigTrain,
      setMessage: setMessageText,
      width: window.innerWidth,
      height: window.innerWidth,
      resolution: window.devicePixelRatio,
      backgroundAlpha: 0,
      antialias: true,
      view: canvas,
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.__PIXI_APP__ = app

    setApp(app)

    return () => {
      if (!app) return
      try {
        app.destroy(true)
        setApp(null)
      } catch (e) {
        //console.log(e)
      }
    }
  }, [activeGifts, isBigTrain, lightImage, prizesText, snowImage, trainImage])

  const closeMessageHandler = useCallback(() => {
    setMessageText(null)
  }, [setMessageText])

  useEffect(() => {
    document.addEventListener('click', closeMessageHandler)

    return () => {
      document.removeEventListener('click', closeMessageHandler)
    }
  }, [closeMessageHandler])

  return (
    <div
      className="canvas-wrapper"
      ref={containerRef}
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <TrainMessage text={messageText} />
    </div>
  )
}
