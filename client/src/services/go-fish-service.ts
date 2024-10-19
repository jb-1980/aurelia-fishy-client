import { resolve } from "aurelia"
import { IHttpClient } from "@aurelia/fetch-client"
import { RegionModel } from "../models"

export class GoFishApi {
  private http: IHttpClient = resolve(IHttpClient)

  async goFish(): Promise<
    | {
        _type: "Success"
        regions: RegionModel[]
      }
    | {
        _type: "Error"
        error: Error
      }
  > {
    try {
      const request = await this.http.fetch(import.meta.env.VITE_FISHY_API)

      if (!request.ok) {
        return {
          _type: "Error",
          error: new Error("Failed to fetch data"),
        }
      }

      const data = (await request.json()) as SeafoodProfile[]
      return {
        _type: "Success",
        regions: makeRegionsFromSeafoodProfiles(data),
      }
    } catch (e) {
      return {
        _type: "Error",
        error: e,
      }
    }
  }
}

type Image = {
  src: string
  alt: string
  title: string
}

export type SpeciesIllustrationPhoto = {
  src: string
  alt: string
  title: string
}

export type SeafoodProfile = {
  FisheryManagement: string | null
  Habitat: string | null
  HabitatImpacts: string | null
  ImageGallery: Image[]
  Location: string | null
  Management: string | null
  NOAAFisheriesRegion: string
  Population: string | null
  PopulationStatus: string | null
  ScientificName: string
  SpeciesAliases: string
  SpeciesIllustrationPhoto: SpeciesIllustrationPhoto
  SpeciesName: string
  AnimalHealth: string | null
  Availability: string
  Biology: string
  Bycatch: string | null
  Calories: string | null
  Carbohydrate: string | null
  Cholesterol: string | null
  Color: string | null
  DiseaseTreatmentandPrevention: string | null
  DiseasesinSalmon: string | null
  DisplayedSeafoodProfileIllustration: string | null
  EcosystemServices: string | null
  EnvironmentalConsiderations: string | null
  EnvironmentalEffects: string | null
  FarmingMethods: string | null
  FarmingMethods_: string | null
  FatTotal: string | null
  Feeds_: string | null
  Feeds: string | null
  FiberTotalDietary: string | null
  FishingRate: string | null
  Harvest: string | null
  HarvestType: string | null
  HealthBenefits: string | null
  Human_Health_: string | null
  HumanHealth: string | null
  PhysicalDescription: string
  Production: string | null
  Protein: string | null
  Quote: string
  QuoteBackgroundColor: string
  Research: string | null
  SaturatedFattyAcidsTotal: string | null
  Selenium: string | null
  ServingWeight: string | null
  Servings: string | null
  Sodium: string | null
  Source: string
  SugarsTotal: string | null
  Taste: string | null
  Texture: string | null
  Path: string
  last_update: string | null
}

export const makeRegionsFromSeafoodProfiles = (
  profiles: SeafoodProfile[]
): RegionModel[] => {
  const regionMap: Record<string, RegionModel> = {}
  profiles.forEach((profile) => {
    if (!regionMap[profile.NOAAFisheriesRegion]) {
      regionMap[profile.NOAAFisheriesRegion] = {
        slug: profile.NOAAFisheriesRegion.toLowerCase().replace(/ /g, "-"),
        name: profile.NOAAFisheriesRegion,
        averageCalories: 0,
        averageFat: 0,
        availableFish: [],
      }
    }
    const fat = profile.FatTotal ? profile.FatTotal.split(" g")[0] : 0
    regionMap[profile.NOAAFisheriesRegion].availableFish.push({
      name: profile.SpeciesName,
      imgSrc: profile.SpeciesIllustrationPhoto?.src || "",
      caloriesPerServing: Number(profile.Calories) || 0,
      fatPerServing: Number(fat) || 0,
      description:
        profile.HealthBenefits ?? "&lt;Health benefits not available&gt;",
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
  return regions
}
