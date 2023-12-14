// Storage unit price is per minute so we need the number of minutes in a month,
// using 30.41 as the average number of days per month.
const AVG_DAYS_PER_MONTH = 30.41

//we know that the pricing coming from Strapi is for 1 month and for 1TB. The values being passed from the calculator are in GB. So we transform that into a GB value, then multiply by the storageaftercompression value coming from the calculator
export const calculateStorageCost = (
  storagePricePer1TB: number,
  storageAfterCompression: number
): number => {
  const pricePerGB = (storagePricePer1TB / 1024) * storageAfterCompression
  return pricePerGB
}

//we know that the compute cost coming from Strapi is based on 16GiB ram with 2vCPU for prod and 24GiB with 6vCPU - per hour. we need to calculate it down to 1 GiB so that we can return prod min and max based on user inputs
export const calculateComputeCost = (
  unitPrice: number,
  memory: number,
  hours: number
) => {
  console.log(unitPrice, memory, hours)
  return hours * unitPrice * AVG_DAYS_PER_MONTH
  //   // Unit price is based on units (memory / 8) per minute.
  //   const minutesConsumed = hours * 60 * AVG_DAYS_PER_MONTH
  //   return (memory / 8) * minutesConsumed * unitPrice
}
