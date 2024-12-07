import * as PIXI from 'pixi.js'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { TrainEntity } from './TrainEntity'
import { TrainMessage } from './TrainMessage'
import { useLoadAsset } from './useLoadAsset'

type TrainProps = {
  activeGifts: number
  prizesText?: string[]
}

export const TrainCanvas: FC<TrainProps> = ({
  activeGifts,
  prizesText,
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
      setMessage: setMessageText,
      width: window.innerWidth,
      height: window.innerWidth,
      resolution: window.devicePixelRatio,
      backgroundAlpha: 0,
      antialias: true,
      view: canvas,
    })

    setApp(app)
  }, [activeGifts, trainImage])

  useEffect(() => {
    return () => {
      if (!app) return
      try {
        app.destroy(true)
        setApp(null)
      } catch (e) {
        //console.log(e)
      }
    }
  }, [app])

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
