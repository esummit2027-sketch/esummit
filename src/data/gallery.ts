export type GalleryCategory =
  | 'Speakers'
  | 'Events'
  | 'Workshops'
  | 'Competitions'
  | 'Networking'
  | 'Campus';

export interface GalleryItem {
  id: string;
  caption: string;
  category: GalleryCategory;
  /**
   * Drop photos into public/images/gallery/ and set src, e.g.
   * '/images/gallery/pitch-2025.jpg'. Items without a src render as a
   * generated tile using the seed below, so the grid is never broken.
   */
  src?: string;
  /** Controls masonry tile height. */
  span: 'tall' | 'wide' | 'square';
  seed: number;
}

export const galleryItems: GalleryItem[] = [
  { id: 'g1', caption: 'Opening keynote, 2025 edition', category: 'Speakers', span: 'tall', seed: 11 },
  { id: 'g2', caption: 'Hackathon, hour thirty-one', category: 'Competitions', span: 'square', seed: 27 },
  { id: 'g3', caption: 'Pricing workshop, Seminar Hall 1', category: 'Workshops', span: 'wide', seed: 43 },
  { id: 'g4', caption: 'Expo floor demos', category: 'Events', span: 'square', seed: 58 },
  { id: 'g5', caption: 'Investor 1:1 rooms', category: 'Networking', span: 'tall', seed: 66 },
  { id: 'g6', caption: 'Campus at first light', category: 'Campus', span: 'wide', seed: 74 },
  { id: 'g7', caption: 'Panel on building in the hills', category: 'Speakers', span: 'square', seed: 82 },
  { id: 'g8', caption: 'Pitch Arena finals', category: 'Competitions', span: 'tall', seed: 95 },
  { id: 'g9', caption: 'Late-night mentor round', category: 'Networking', span: 'square', seed: 103 },
];
