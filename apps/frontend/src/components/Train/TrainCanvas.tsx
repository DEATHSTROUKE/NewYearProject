import * as PIXI from 'pixi.js'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import Train from '@/assets/images/base_illustration.webp'

import { TrainEntity } from './TrainEntity'
import { TrainMessage } from './TrainMessage'
import { useLoadAsset } from './useLoadAsset'

type TrainProps = {
  activeGifts: number
  activePrizes?: string
  nonActivePrizes?: string
}

const SpriteSheet = '/spritesheet.json'

export const TrainCanvas: FC<TrainProps> = ({
  activeGifts,
  activePrizes,
  nonActivePrizes,
}) => {
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
      activePrizes,
      nonActivePrizes,
      setMessage: setMessageText,
      width: window.innerWidth,
      // height: window.innerHeight,
      resolution: window.devicePixelRatio,
      backgroundAlpha: 0,
      antialias: true,
      view: canvas,
    })

    setApp(app)
  }, [activeGifts, activePrizes, nonActivePrizes, trainImage])

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
