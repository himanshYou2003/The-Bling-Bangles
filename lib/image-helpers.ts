/**
 * Helper function to get bangle images from the local folder structure
 * Each bangle has 3 images (different angles) stored in /public/images/bangles/{id}/
 */
export function getBangleImages(id: number): string[] {
  return [
    `/images/bangles/${id}/1.svg`,
    `/images/bangles/${id}/2.svg`,
    `/images/bangles/${id}/3.svg`,
  ];
}

/**
 * Get the main image for a bangle (first angle)
 */
export function getBangleMainImage(id: number): string {
  return `/images/bangles/${id}/1.svg`;
}
