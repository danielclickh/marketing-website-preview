import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ThemeService} from '../common/services/theme.service';
import {BlogService} from './blog.service';
import {BlogPost} from './blog.protocol';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {
  blogDataPromise = this.blogService.getBlogData();
  filteredBlogPosts?: Array<BlogPost>;
  themeObs = this.themeService.observeTheme();
  searchText: string | undefined;
  selectedCategory: string | undefined;
  categories?: Array<string>;

  private blogPosts?: Array<BlogPost>;

  constructor(private readonly blogService: BlogService,
              private readonly themeService: ThemeService,
              private readonly cd: ChangeDetectorRef) {
    this.initializePage().then();
  }

  filterBlogPosts() {
    if (!this.blogPosts) {
      return;
    }

    let filteredPosts = [...this.blogPosts!];

    if (this.selectedCategory) {
      filteredPosts = filteredPosts.filter((post) => post.category === this.selectedCategory);
    }

    if (this.searchText) {
      const searchText = this.searchText;
      filteredPosts = filteredPosts.filter((blogPost) => {
        return searchText.toLowerCase().trim().split(' ').every(keyword => {
          const title = blogPost.title.toLowerCase();
          const shortDescription = blogPost.shortDescription.toLowerCase();
          return title.includes(keyword) || shortDescription.includes(keyword);
        });
      });
    }

    this.filteredBlogPosts = validateBlogPosts(filteredPosts);
    this.cd.detectChanges();
  }

  selectCategory(category: string | undefined) {
    this.selectedCategory = category;
    this.filterBlogPosts();
  }

  private async initializePage() {
    this.blogPosts = validateBlogPosts(await this.blogService.getBlogPosts());
    this.filteredBlogPosts = [...this.blogPosts];
    const categoriesToCountMap = new Map<string, number>();
    for (const blogPost of this.blogPosts) {
      categoriesToCountMap.set(blogPost.category, (categoriesToCountMap.get(blogPost.category) || 0) + 1);
    }
    this.categories = [...categoriesToCountMap.entries()]
      .sort((entry1, entry2) => entry2[1] - entry1[1])
      .map(entry => entry[0]);
    this.cd.detectChanges();
  }

  getBlogPostUrl(blogPost: BlogPost) {
    return this.blogService.getBlogPostUrl(blogPost);
  }
}

/**
 * Checks that blog posts have all required fields and can be rendered safely.
 * Returns the original array if no critical problems found or throws an error.
 */
function validateBlogPosts(blogPosts: Array<BlogPost>): Array<BlogPost> {
  if (blogPosts.some(p => !p.thumbnailPng)) {
    throw new Error('Blog post with no thumbnail: ' + blogPosts.filter(b => !b.thumbnailPng).map(b => b.id).join(','));
  }
  if (blogPosts.some(p => !p.author.avatarPng)) {
    console.warn('Warning: blog posts have no author avatar: ' + blogPosts.filter(b => !b.author.avatarPng).map(b => b.id).join(','));
  }
  return blogPosts;
}

