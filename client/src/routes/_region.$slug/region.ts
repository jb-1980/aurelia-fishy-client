import { IRouteableComponent } from "@aurelia/router"
import { RegionModel } from "../../models"
import { GoFishApi } from "../../services/go-fish-service"

export class Region implements IRouteableComponent {
  public region: RegionModel
  public regions: RegionModel[] = []
  private goFishService: GoFishApi

  constructor() {
    this.goFishService = new GoFishApi()
  }

  async canLoad(params: { slug: string }) {
    const response = await this.goFishService.goFish()
    if (response._type === "Success") {
      this.region = response.regions.find(
        (region) => region.slug === params.slug
      )
      this.regions = response.regions
    } else {
      console.error(response.error)
    }
  }
}
