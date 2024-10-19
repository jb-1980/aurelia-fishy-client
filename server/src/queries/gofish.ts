import { Context } from "koa"
import { Region } from "../domain/region.js"
import { Fish, Region as DBRegion, RegionModel } from "../repository/index.js"
// #region API
export const handleGoFish = async (ctx: Context): Promise<void> => {
  ctx.body = await query_GoFish()
}
// #endregion API

// #region query
export const query_GoFish = async (): Promise<Region[]> => {
  return getRegions()
}
// #endregion query

// #region repository
const makeRegionDTO = (region: RegionModel): Region => {
  const { totalCalories, totalFat } = region.Fishes.reduce(
    (acc, fish) => {
      acc.totalCalories += fish.caloriesPerServing
      acc.totalFat += fish.fatPerServing
      return acc
    },
    { totalCalories: 0, totalFat: 0 }
  )
  return {
    slug: region.name.toLowerCase().replace(" ", "-"),
    name: region.name,
    averageCalories:
      region.Fishes.length > 0 ? totalCalories / region.Fishes.length : 0,
    averageFat: region.Fishes.length > 0 ? totalFat / region.Fishes.length : 0,
    availableFish: region.Fishes.map((fish) => ({
      id: fish.id,
      name: fish.name,
      imgSrc: fish.imgSrc,
      caloriesPerServing: fish.caloriesPerServing,
      fatPerServing: fish.fatPerServing,
      description: fish.description,
    })),
  }
}

export const getRegions = async (): Promise<Region[]> => {
  const regions = await DBRegion.findAll({
    include: Fish,
  })
  return regions.map(makeRegionDTO)
}
// #endregion repository
