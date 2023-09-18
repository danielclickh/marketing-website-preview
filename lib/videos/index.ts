import { Video, VideoCategory } from './types'
import { slugify } from '../utils/strings'

export function getVideos(): Video[] {
  return [
    {
      provider: "youtube",
      id: "8FUfyvoqDTg",
      slug: "vantage",
      title: "Vantage & ClickHouse",
      subTitle: "Brooke McKim\nCo-founder and CTO, Vantage",
      description: "Vantage streamlines cloud cost management for businesses. Brooke shares how transitioning to ClickHouse Cloud not only optimized Vantage's operations but also cut their Redshift bill in half.",
      thumbnail: "https://img.youtube.com/vi/8FUfyvoqDTg/maxresdefault.jpg",
      categories: [
        "Management"
      ]
    },
    {
      provider: "youtube",
      id: "3mS-RSKfGWQ",
      slug: "clearbit",
      title: "Clearbit & ClickHouse",
      subTitle: "Harlow Ward\nCo-founder and CTO, Clearbit",
      description: "Clearbit needed a real-time database to handle their massive clickstream data volume and power their UI. Harlow shares why ClickHouse Cloud ticked all the boxes.",
      thumbnail: "https://img.youtube.com/vi/3mS-RSKfGWQ/maxresdefault.jpg",
      categories: [
        "Database"
      ]
    },
    {
      provider: "youtube",
      id: "6V_66oiln00",
      slug: "statsig",
      title: "Statsig & ClickHouse",
      subTitle: "Jason Wang\nSoftware Engineer, Statsig",
      description: "Statsig is an experimentation and A/B testing company, handling millions of events every second and billions daily. Jason shares why they landed on ClickHouse Cloud for their real-time analytics.",
      thumbnail: "https://img.youtube.com/vi/6V_66oiln00/maxresdefault.jpg",
      categories: [
        "Testing"
      ]
    }
  ];
}



export function getVideo(slug: string): Video|undefined {
  return getVideos().find(video => video.slug === slug);
}

export function getCategories(): Map<string, VideoCategory> {

  const categories = new Map();

  getVideos()
      .flatMap(video => video.categories)
      .forEach(category => {
        categories.set(slugify(category), category);
      });

  return categories;
}

export function getCategory(slug: string): VideoCategory|undefined {
  return getCategories().get(slug);
}
