import { Video, VideoCategory } from "./types"

export function getVideos(): Video[] {
  return [
    {
      type: "youtube",
      id: "8FUfyvoqDTg",
      title: "Vantage & ClickHouse",
      subTitle: "Brooke McKim\nCo-founder and CTO, Vantage",
      description: "Vantage streamlines cloud cost management for businesses. Brooke shares how transitioning to ClickHouse Cloud not only optimized Vantage's operations but also cut their Redshift bill in half.",
      thumbnail: "https://img.youtube.com/vi/8FUfyvoqDTg/maxresdefault.jpg",
      categories: [
        "Management"
      ]
    },
    {
      type: "youtube",
      id: "3mS-RSKfGWQ",
      title: "Clearbit & ClickHouse",
      subTitle: "Harlow Ward\nCo-founder and CTO, Clearbit",
      description: "Clearbit needed a real-time database to handle their massive clickstream data volume and power their UI. Harlow shares why ClickHouse Cloud ticked all the boxes.",
      thumbnail: "https://img.youtube.com/vi/3mS-RSKfGWQ/maxresdefault.jpg",
      categories: [
        "Database"
      ]
    },
    {
      type: "youtube",
      id: "6V_66oiln00",
      title: "Statsig & ClickHouse",
      subTitle: "Jason Wang\nSoftware Engineer, Statsig",
      description: "Statsig is an experimentation and A/B testing company, handling millions of events every second and billions daily. Jason shares why they landed on ClickHouse Cloud for their real-time analytics.",
      thumbnail: "https://img.youtube.com/vi/6V_66oiln00/maxresdefault.jpg",
      categories: [
        "Testing"
      ]
    }
  ]
}

export function getVideo(id: string): Video|undefined {
  return getVideos().find(video => video.id === id);
}

export function getCategories(): VideoCategory[] {
  const cats = getVideos().flatMap(video => video.categories);
  return Array.from(new Set(cats)); // Remove duplicates
}
