// Taxonomy tree configuration for the Indexes category panel.
// Each node carries the release (year/month) when it was added.
// The component filters to nodes released on or before the active scroll month,
// and highlights nodes added in exactly the active release.

export interface IndexTreeNode {
  name: string
  year: number  // release year when this node was introduced
  month: number // release month when this node was introduced
  children?: IndexTreeNode[]
}

export const INDEXES_TREE: IndexTreeNode = {
  name: 'ClickHouse Indexes',
  year: 2022,
  month: 2,
  children: [
    {
      name: 'Primary Index',
      year: 2022,
      month: 2,
      children: [
        { name: 'Multi-Stage PREWHERE',  year: 2023, month:  2 },
        { name: 'Reduced Memory Usage',  year: 2024, month:  2 },
        { name: 'Optimal Row Order',     year: 2024, month:  6 },
        { name: 'Read-in-Order',         year: 2024, month:  7 },
        { name: 'Descending Sort',       year: 2024, month: 12 },
        { name: 'JSON Subcolumn Keys',   year: 2024, month: 12 },
        { name: 'Lazy Materialisation',  year: 2025, month:  4 },
      ],
    },
    {
      name: 'Skip Indexes',
      year: 2022,
      month: 2,
      children: [
        {
          name: 'MinMax',
          year: 2022,
          month: 8,
          children: [
            { name: 'Table-Level MinMax', year: 2025, month: 1 },
          ],
        },
        { name: 'Set', year: 2022, month: 8 },
        {
          name: 'Bloom Filter',
          year: 2022,
          month: 8,
          children: [
            { name: 'Bloom Filter Optimised', year: 2025, month: 6 },
          ],
        },
        {
          name: 'Full-Text / Inverted',
          year: 2023,
          month: 1,
          children: [
            {
              name: 'Text Index Alpha',
              year: 2025,
              month: 9,
              children: [
                {
                  name: 'Text Index Beta',
                  year: 2025,
                  month: 12,
                  children: [
                    { name: 'Text Index Improvements', year: 2026, month: 1 },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'Streaming Secondary',    year: 2025, month:  9 },
        { name: 'Late Materialisation',   year: 2025, month: 10 },
        { name: 'Top-N Skipping',         year: 2025, month: 12 },
      ],
    },
    {
      name: 'Projections',
      year: 2022,
      month: 2,
      children: [
        { name: 'Multi-Projection Filtering', year: 2025, month:  6 },
        { name: 'DISTINCT Optimisation',      year: 2025, month: 11 },
        { name: 'Secondary Index Mode',       year: 2025, month: 11 },
      ],
    },
  ],
}
