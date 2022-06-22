/** Tracks by string/numeric 'id' property helper for Angular *ngFor. */
export function trackById(index: number, item: { id: string | number }): string {
  return `${item.id}`;
}
