import * as PIXI from 'pixi.js'

export const GIFTS_SPRITES = {
  bigGift1: {
    textureName: 'BigGift1',
    scale: 1,
    coordX: 100,
    coordY: 592,
    zIndex: 2,
    index: 1,
  },
  bigGift2: {
    textureName: 'BigGift2',
    coordX: 264,
    coordY: 903,
    zIndex: 3,
    index: 2,
  },
  bigGift3: {
    textureName: 'BigGift3',
    coordX: 230,
    coordY: 479,
    zIndex: 4,
    index: 3,
  },
  bigGift4: {
    textureName: 'BigGift4',
    coordX: 387,
    coordY: 151,
    zIndex: 1,
    scale: 0.91,
    index: 4,
  },
  bigGift5: {
    textureName: 'BigGift5',
    coordX: 1568,
    coordY: 412,
    zIndex: 2,
    index: 5,
  },
  littleGift1: {
    textureName: 'LittleGift1',
    coordX: 1232,
    coordY: 850,
    zIndex: 4,
    index: 1,
  },
  littleGift2: {
    textureName: 'LittleGift2',
    scale: 1,
    coordX: 1186,
    coordY: 948,
    zIndex: 5,
    index: 2,
  },
  littleGift3: {
    textureName: 'LittleGift3',
    scale: 0.851,
    coordX: 1433,
    coordY: 765,
    zIndex: 5,
    index: 3,
  },
  littleGift4: {
    textureName: 'LittleGift4',
    scale: 0.65,
    coordX: 1541,
    coordY: 742,
    zIndex: 4,
    index: 4,
  },
  littleGift5: {
    textureName: 'LittleGift5',
    scale: 0.78,
    coordX: 1437,
    coordY: 789,
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
