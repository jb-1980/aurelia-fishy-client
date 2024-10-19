import { Region, Fish } from "../repository/index.js"

import data from "./fish-data.json"
import { sequelize } from "../repository/connection.js"

const main = async () => {
  const regions = new Map<string, string>()

  for (const fishItem of data) {
    const regionName = fishItem.NOAAFisheriesRegion
    if (!regions.has(regionName)) {
      const region = await Region.create({
        name: regionName,
      })
      regions.set(regionName, region.id)
    }

    const regionId = regions.get(regionName)
    const fat = fishItem.FatTotal ? fishItem.FatTotal.split(" g")[0] : 0
    await Fish.create({
      name: fishItem.SpeciesName,
      imgSrc: fishItem.SpeciesIllustrationPhoto.src,
      caloriesPerServing: Number(fishItem.Calories) || 0,
      fatPerServing: Number(fat),
      description: fishItem.HealthBenefits ?? undefined,
      region_id: regionId!,
    })
  }
}

main()
  .catch(console.error)
  .finally(() => {
    sequelize.close()
    process.exit()
  })
