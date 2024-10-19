import Router from "koa-router"
import { handleGoFish } from "./queries/gofish.js"
import fishData from "./ad-hoc/fish-data.json"
import { Region } from "./domain/region.js"
import optimzedFishData from "./gofish-optimized.json"

export const router = new Router()

router.get("/api/gofish-db", handleGoFish)
router.get("/api/gofish-rawjson", (ctx) => {
  ctx.body = fishData
})
router.get("/api/gofish-parsedjson", (ctx) => {
  const regionMap: Record<string, Region> = {}
  fishData.forEach((fishItem) => {
    if (!regionMap[fishItem.NOAAFisheriesRegion]) {
      regionMap[fishItem.NOAAFisheriesRegion] = {
        slug: fishItem.NOAAFisheriesRegion.toLowerCase().replace(/ /g, "-"),
        name: fishItem.NOAAFisheriesRegion,
        averageCalories: 0,
        averageFat: 0,
        availableFish: [],
      }
    }
    const fat = fishItem.FatTotal ? fishItem.FatTotal.split(" g")[0] : 0
    regionMap[fishItem.NOAAFisheriesRegion].availableFish.push({
      name: fishItem.SpeciesName,
      imgSrc: fishItem.SpeciesIllustrationPhoto?.src || "",
      caloriesPerServing: Number(fishItem.Calories) || 0,
      fatPerServing: Number(fat) || 0,
      description:
        fishItem.HealthBenefits ?? "&lt;Health benefits not available&gt;",
    })
  })

  const regions = Object.values(regionMap).map((region) => {
    // handle the division by zero case
    if (region.availableFish.length === 0) {
      return region
    }

    const { totalCalories, totalFat } = region.availableFish.reduce(
      (acc, fish) => {
        acc.totalCalories += fish.caloriesPerServing
        acc.totalFat += fish.fatPerServing
        return acc
      },
      { totalCalories: 0, totalFat: 0 }
    )

    return {
      ...region,
      averageCalories: totalCalories / region.availableFish.length,
      averageFat: totalFat / region.availableFish.length,
    }
  })
  ctx.body = regions
})
router.get("/api/gofish-optimizedjson", (ctx) => {
  ctx.body = optimzedFishData
})
