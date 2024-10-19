import { bindable } from "aurelia"

export class NavBar {
  @bindable public regions: { slug: string; name: string }[] = []
  public showRegionsDisplay: {
    display: "block" | "none"
  } = { display: "none" }

  public toggleShowRegions() {
    this.showRegionsDisplay = {
      display: this.showRegionsDisplay.display === "block" ? "none" : "block",
    }
  }

  public setShowRegions(str: "block" | "none") {
    this.showRegionsDisplay = { display: str }
  }
}
