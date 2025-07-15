
// Types for our data
export interface Villa {
  id: number;
  type: string; // Changed to string to match database villa type IDs
  x: number;
  y: number;
}

// Road configuration
export interface Road {
  id: number;
  orientation: 'horizontal' | 'vertical';
  position: number; // y for horizontal, x for vertical
  start: number;    // start position (x for horizontal, y for vertical)
  end: number;      // end position (x for horizontal, y for vertical)
  thickness: number; // thickness in pixels
}
