import * as PIXI from 'pixi.js'
import { Assets } from 'pixi.js'

import { TrainEntityOptions } from '../../types/pixi'

enum Keys {
  BigGift1 = 'BigGift1',
  BigGift2 = 'BigGift2',
  BigGift3 = 'BigGift3',
  BigGift4 = 'BigGift4',
  BigGift5 = 'BigGift5',
  LittleGift1 = 'LittleGift1',
  LittleGift2 = 'LittleGift2',
  LittleGift3 = 'LittleGift3',
  LittleGift4 = 'LittleGift4',
  LittleGift5 = 'LittleGift5',
}
const GiftsPaths = {
  [Keys.BigGift1]: '/sprites/gifts/gift_1.webp',
  [Keys.BigGift2]: '/sprites/gifts/gift_2.webp',
  [Keys.BigGift3]: '/sprites/gifts/gift_3.webp',
  [Keys.BigGift4]: '/sprites/gifts/gift_4.webp',
  [Keys.BigGift5]: '/sprites/gifts/gift_5.webp',
  [Keys.LittleGift1]: '/sprites/gifts/little_gift_1.webp',
  [Keys.LittleGift2]: '/sprites/gifts/little_gift_2.webp',
  [Keys.LittleGift3]: '/sprites/gifts/little_gift_3.webp',
  [Keys.LittleGift4]: '/sprites/gifts/little_gift_4.webp',
  [Keys.LittleGift5]: '/sprites/gifts/little_gift_5.webp',
}

type GiftsTexture = Record<Keys, PIXI.Texture | undefined>

export class TrainEntity extends PIXI.Application {
  textures: GiftsTexture = {
    [Keys.BigGift1]: undefined,
    [Keys.BigGift2]: undefined,
    [Keys.BigGift3]: undefined,
    [Keys.BigGift4]: undefined,
    [Keys.BigGift5]: undefined,
    [Keys.LittleGift1]: undefined,
    [Keys.LittleGift2]: undefined,
    [Keys.LittleGift3]: undefined,
    [Keys.LittleGift4]: undefined,
    [Keys.LittleGift5]: undefined,
  }
  readonly trainTexture: PIXI.Texture
  readonly snowTexture: PIXI.Texture
  readonly lightTexture: PIXI.Texture

  readonly activeGifts: number
  readonly activePrizes?: string
  readonly nonActivePrizes?: string
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
      activePrizes,
      nonActivePrizes,
      setMessage,
      ...options
    } = treeEntityOptions
    super(options)

    this.trainTexture = trainTexture
    this.lightTexture = lightTexture
    this.snowTexture = snowTexture
    this.activeGifts = activeGifts
    this.activePrizes = activePrizes
    this.nonActivePrizes = nonActivePrizes
    this.setMessage = setMessage
    this.clientWidth = this.screen.width
    this.clientHeight = this.screen.height
    this.setup()
  }

  async setup() {
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
    for (const value of Object.entries(GiftsPaths)) {
      Assets.add(value[0], value[1])
    }
    this.textures = (await Assets.load(Object.keys(GiftsPaths))) as GiftsTexture

    console.info('1', this.textures)
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
    lightSprite.scale.set(3.38, 3.42)
    lightSprite.x = 0
    lightSprite.y = 0
    lightSprite.zIndex = 0
    lightSprite.interactive = true

    lightSprite.hitArea = new PIXI.Polygon([])

    this.mainContainer.addChild(lightSprite)
  }
  setupTrain() {
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
    texture,
    coordX,
    coordY,
    scale,
    zIndex,
    // func,
    name,
  }: {
    texture: PIXI.Texture<PIXI.Resource> | undefined
    coordX: number
    coordY: number
    scale?: number
    zIndex: number
    //func?: () => void
    name?: string
  }) {
    const giftSprite = new PIXI.Sprite(texture)
    if (scale) {
      giftSprite.scale.set(scale)
    }
    giftSprite.x = coordX
    giftSprite.y = coordY
    giftSprite.zIndex = zIndex
    giftSprite.interactive = true
    giftSprite.on('pointerdown', e => {
      e.stopPropagation()
      // if (func) {
      //   func()
      //   this.onActiveGiftClick()
      // }
      this.onActiveGiftClick()
      console.info('pointerdown ', name)
    })

    this.mainContainer.addChild(giftSprite)
  }

  setupGift1() {
    //first big
    this.setupGiftByNumber({
      name: 'first big',
      texture: this.textures.BigGift1,
      scale: 0.99,
      coordX: 100,
      coordY: 592,
      zIndex: 2,
      // func: () => {
      //   console.info('tap 1')
      // },
    })
    //first small
    this.setupGiftByNumber({
      name: 'first small',
      texture: this.textures.LittleGift1,
      coordX: 1232.44,
      coordY: 850.47,
      zIndex: 4,
    })
  }

  setupGift2() {
    //second big
    this.setupGiftByNumber({
      name: 'second big',
      texture: this.textures.BigGift2,
      coordX: 263.51,
      coordY: 903.26,
      zIndex: 3,
    })
    //second small
    this.setupGiftByNumber({
      name: 'second small',
      texture: this.textures.LittleGift2,
      scale: 1,
      coordX: 1185.62,
      coordY: 948.14,
      zIndex: 5,
    })
  }

  setupGift3() {
    //third big
    this.setupGiftByNumber({
      name: 'third big',
      texture: this.textures.BigGift3,
      coordX: 229.78,
      coordY: 479.27,
      zIndex: 4,
    })
    //third small
    this.setupGiftByNumber({
      name: 'third small',
      texture: this.textures.LittleGift3,
      scale: 0.851,
      coordX: 1432.87,
      coordY: 765.27,
      zIndex: 5,
    })
  }

  setupGift4() {
    //fourth big
    this.setupGiftByNumber({
      name: 'fourth big',
      texture: this.textures.BigGift4,
      coordX: 387.44,
      coordY: 151.39,
      zIndex: 1,
      scale: 0.91,
    })
    //fourth small
    this.setupGiftByNumber({
      name: 'fourth small',
      texture: this.textures.LittleGift4,
      scale: 0.65,
      coordX: 1540.51,
      coordY: 742,
      zIndex: 4,
    })
  }

  setupGift5() {
    //fifth big
    this.setupGiftByNumber({
      name: 'fifth big',
      texture: this.textures.BigGift5,
      coordX: 1568.17,
      coordY: 412.31,
      zIndex: 2,
    })
    //fifth small
    this.setupGiftByNumber({
      name: 'fifth small',
      texture: this.textures.LittleGift5,
      scale: 0.78,
      coordX: 1436.71,
      coordY: 789.33,
      zIndex: 5,
    })
  }

  setupGifts() {
    if (this.activeGifts === 1) {
      this.setupGift1()
    } else if (this.activeGifts === 2) {
      this.setupGift1()
      this.setupGift2()
    } else if (this.activeGifts === 3) {
      this.setupGift1()
      this.setupGift2()
      this.setupGift3()
    } else if (this.activeGifts === 4) {
      this.setupGift1()
      this.setupGift2()
      this.setupGift3()
      this.setupGift4()
    } else if (this.activeGifts === 5) {
      this.setupGift1()
      this.setupGift2()
      this.setupGift3()
      this.setupGift4()
      this.setupGift5()
    }
  }

  onActiveGiftClick() {
    if (this.activePrizes !== undefined) {
      this.setMessage(this.activePrizes)
    }
  }
}
