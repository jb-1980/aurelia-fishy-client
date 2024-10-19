import { Fish } from "./fish.js"

export type Region = {
  /** The URL slug for the region; can also be used for an id */
  slug: string
  /** The NOAA Region */
  name: string
  /** The average calories per serving of the fish in the region */
  averageCalories: number
  /** The average grams of fat per serving of the fish in the region */
  averageFat: number
  /** The fish available in the region */
  availableFish: Fish[]
}
