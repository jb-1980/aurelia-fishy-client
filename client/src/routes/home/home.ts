import { IRouteableComponent } from "@aurelia/router"
import { GoFishApi } from "../../services/go-fish-service"
import { RegionModel } from "../../models"

export class Home implements IRouteableComponent {
  public regions: RegionModel[] = []

  private goFishService: GoFishApi

  constructor() {
    this.goFishService = new GoFishApi()
  }

  async canLoad() {
    const response = await this.goFishService.goFish()
    if (response._type === "Success") {
      this.regions = response.regions
    } else {
      console.error(response.error)
      this.regions = []
    }
  }
}
