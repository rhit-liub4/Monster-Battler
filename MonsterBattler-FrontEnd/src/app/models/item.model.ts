export interface GameItem {
  id: string;
  name: string;
  description: string;
  icon?: string; // path to sprite or image
  use(): void;   // function triggered when item is used
}
