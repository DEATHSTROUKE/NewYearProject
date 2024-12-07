import * as PIXI from 'pixi.js'

export interface TreeEntityOptions extends Partial<PIXI.IApplicationOptions> {
  textures: PIXI.Spritesheet
  trainTexture: PIXI.Texture
  activeGifts: number
  activePrizes?: string
  nonActivePrizes?: string
  setMessage: (text: string | null) => void
}

export interface TrainEntityOptions extends Partial<PIXI.IApplicationOptions> {
  // textures: PIXI.Spritesheet
  trainTexture: PIXI.Texture
  lightTexture: PIXI.Texture
  snowTexture: PIXI.Texture
  activeGifts: number
  prizesText?: string[]
  setMessage: (text: string | null) => void
}
