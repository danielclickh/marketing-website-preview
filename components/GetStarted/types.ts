export interface GettingStartedPlatform {
  id: number
  name: string
  instructions: string
}
export interface GettingStartedData {
  platforms: Array<GettingStartedPlatform>
}
