export type FishModel = {
  /** A common name for the fish */
  name: string
  /** The URL of an image of the fish */
  imgSrc: string
  /** The calories per serving of the fish */
  caloriesPerServing: number
  /** The grams of fat per serving of the fish */
  fatPerServing: number
  /** A description of the fish */
  description: string
}

export type RegionModel = {
  /** The URL slug for the region; can also be used for an id */
  slug: string
  /** The NOAA Region */
  name: string
  /** The average calories per serving of the fish in the region */
  averageCalories: number
  /** The average grams of fat per serving of the fish in the region */
  averageFat: number
  /** The fish available in the region */
  availableFish: FishModel[]
}
