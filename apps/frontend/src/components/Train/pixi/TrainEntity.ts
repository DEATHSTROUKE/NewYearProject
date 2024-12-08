import * as PIXI from 'pixi.js'
import { Assets } from 'pixi.js'

import { GIFTS_SPRITES, GiftsPaths, GiftsTexture } from './constants'
import { TrainEntityOptions } from './pixi'

export class TrainEntity extends PIXI.Application {
  textures: GiftsTexture = {}
  readonly trainTexture: PIXI.Texture
  readonly snowTexture: PIXI.Texture
  readonly lightTexture: PIXI.Texture
  readonly isBigTrain?: boolean

  readonly activeGifts: number
  readonly prizesText: string[] | undefined
  readonly clientWidth: number
  readonly clientHeight: number
  readonly setMessage: (text: string | null) => void

  mainContainer = new PIXI.Container()

  constructor(treeEntityOptions: TrainEntityOptions) {
    const {
      trainTexture,
      lightTexture,
      snowTexture,
      activeGifts,
      prizesText,
      setMessage,
      isBigTrain,
      ...options
    } = treeEntityOptions
    super(options)

    this.trainTexture = trainTexture
    this.lightTexture = lightTexture
    this.snowTexture = snowTexture
    this.activeGifts = activeGifts
    this.prizesText = prizesText
    this.setMessage = setMessage
    this.isBigTrain = isBigTrain
    this.clientWidth = this.screen.width
    this.clientHeight = this.screen.height
    this.setup()
  }

  async setup() {
    console.info('SETUP')
    await this.loadPrizes()

    this.setupTrain()
    this.setupSnowAndLight()
    this.setupGifts()

    console.info(
      'main container',
      this.mainContainer.width,
      this.mainContainer.height,
    )
    console.info('client container', this.clientWidth, this.clientHeight)

    const scale = Math.min(
      this.clientWidth / this.mainContainer.width,
      this.clientHeight / this.mainContainer.height,
    )
    console.info('scale', scale)
    this.mainContainer.scale.set(scale)

    this.mainContainer.pivot.set(0.5)
    this.mainContainer.x =
      this.clientWidth / 100 - this.mainContainer.width / 100
    this.mainContainer.sortableChildren = true
    this.mainContainer.interactive = true

    this.mainContainer.on('pointerdown', e => {
      this.setMessage(null)
    })
    console.info(
      'main container 2',
      this.mainContainer.width,
      this.mainContainer.height,
    )
    this.stage.addChild(this.mainContainer)
    this.renderer.plugins.interaction.autoPreventDefault = false

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.renderer.view.style['touch-action'] = 'auto'
  }

  async loadPrizes() {
    console.info('LOAD PRIZES')
    for (const value of Object.entries(GiftsPaths)) {
      Assets.add(value[0], value[1])
    }
    this.textures = (await Assets.load(Object.keys(GiftsPaths))) as GiftsTexture

    console.info('textures', this.textures)
  }

  setupSnowAndLight() {
    const snowSprite = new PIXI.Sprite(this.snowTexture)
    snowSprite.scale.set(1.003)
    snowSprite.x = 169.03
    snowSprite.y = 48
    snowSprite.zIndex = 6
    snowSprite.interactive = true

    snowSprite.hitArea = new PIXI.Polygon([])

    this.mainContainer.addChild(snowSprite)

    const lightSprite = new PIXI.Sprite(this.lightTexture)
    lightSprite.scale.set(3)
    lightSprite.x = 200
    lightSprite.y = -20
    lightSprite.zIndex = 0
    lightSprite.alpha = 0.8
    lightSprite.interactive = true

    lightSprite.hitArea = new PIXI.Polygon([])

    this.mainContainer.addChild(lightSprite)
  }

  setupTrain() {
    console.info('setup train')
    const trainSprite = new PIXI.Sprite(this.trainTexture)
    trainSprite.scale.set(1.32)
    trainSprite.x = 304.3
    trainSprite.y = 90.67
    trainSprite.zIndex = 4
    trainSprite.interactive = true

    trainSprite.hitArea = new PIXI.Polygon([])

    this.mainContainer.addChild(trainSprite)
  }

  setupGiftByNumber({
    textureName,
    coordX,
    coordY,
    scale,
    zIndex,
    index,
  }: {
    // texture: PIXI.Texture<PIXI.Resource> | undefined
    textureName: string
    coordX: number
    coordY: number
    scale?: number
    zIndex: number
    index: number
  }) {
    const giftSprite = new PIXI.Sprite(
      this.textures[textureName as keyof typeof this.textures],
    )
    if (scale) {
      giftSprite.scale.set(scale)
    }
    giftSprite.x = coordX
    giftSprite.y = coordY
    giftSprite.zIndex = zIndex
    giftSprite.interactive = true
    giftSprite.on('pointerdown', e => {
      e.stopPropagation()
      this.onActiveGiftClick(index)
    })

    this.mainContainer.addChild(giftSprite)
  }

  setupGifts() {
    if (this.activeGifts >= 1) {
      this.setupGiftByNumber(GIFTS_SPRITES['bigGift1'])
      this.setupGiftByNumber(GIFTS_SPRITES['littleGift1'])
    }
    if (this.activeGifts >= 2) {
      this.setupGiftByNumber(GIFTS_SPRITES['bigGift2'])
      this.setupGiftByNumber(GIFTS_SPRITES['littleGift2'])
    }
    if (this.activeGifts >= 3) {
      this.setupGiftByNumber(GIFTS_SPRITES['bigGift3'])
      this.setupGiftByNumber(GIFTS_SPRITES['littleGift3'])
    }
    if (this.activeGifts >= 4) {
      this.setupGiftByNumber(GIFTS_SPRITES['bigGift4'])
      this.setupGiftByNumber(GIFTS_SPRITES['littleGift4'])
    }
    if (this.activeGifts >= 5) {
      this.setupGiftByNumber(GIFTS_SPRITES['bigGift5'])
      this.setupGiftByNumber(GIFTS_SPRITES['littleGift5'])
    }
  }

  onActiveGiftClick(activeGiftNumber: number) {
    if (activeGiftNumber && this.prizesText) {
      this.setMessage(this.prizesText[activeGiftNumber - 1])
    }
  }
}
