import * as PIXI from 'pixi.js'

export const GIFTS_SPRITES = {
  bigGift1: {
    textureName: 'BigGift1',
    scale: 0.99,
    coordX: 100,
    coordY: 592,
    zIndex: 2,
    index: 1,
  },
  bigGift2: {
    textureName: 'BigGift2',
    coordX: 263.51,
    coordY: 903.26,
    zIndex: 10,
    index: 2,
  },
  bigGift3: {
    textureName: 'BigGift3',
    coordX: 229.78,
    coordY: 479.27,
    zIndex: 4,
    index: 3,
  },
  bigGift4: {
    textureName: 'BigGift4',
    coordX: 387.44,
    coordY: 151.39,
    zIndex: 1,
    scale: 0.91,
    index: 4,
  },
  bigGift5: {
    textureName: 'BigGift5',
    coordX: 1568.17,
    coordY: 412.31,
    zIndex: 2,
    index: 5,
  },
  littleGift1: {
    textureName: 'LittleGift1',
    coordX: 1232.44,
    coordY: 850.47,
    zIndex: 4,
    index: 1,
  },
  littleGift2: {
    textureName: 'LittleGift2',
    scale: 1,
    coordX: 1185.62,
    coordY: 948.14,
    zIndex: 5,
    index: 2,
  },
  littleGift3: {
    textureName: 'LittleGift3',
    scale: 0.851,
    coordX: 1432.87,
    coordY: 765.27,
    zIndex: 5,
    index: 3,
  },
  littleGift4: {
    textureName: 'LittleGift4',
    scale: 0.65,
    coordX: 1540.51,
    coordY: 742,
    zIndex: 4,
    index: 4,
  },
  littleGift5: {
    textureName: 'LittleGift5',
    scale: 0.78,
    coordX: 1436.71,
    coordY: 789.33,
    zIndex: 5,
    index: 5,
  },
}

export const enum Keys {
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
export const GiftsPaths = {
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

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

export type GiftsTexture = PartialRecord<Keys, PIXI.Texture | undefined>
