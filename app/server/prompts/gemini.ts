export const FLOOR_PLAN_PROMPT = `
Create a top-down, fully 3D isometric render of this architectural floorplan as a beautiful miniature maquette.

CRITICAL ACCURACY REQUIREMENTS:

1. DOORS - HIGHEST PRIORITY:
   Pay close attention to door placement and swing direction shown in the floorplan.
   Door arcs show which way they open - respect this exactly.
   The door leaf must be on the side of the arc, opening into the room as drawn.
   Do NOT reverse the swing direction.

2. CLOSETS AND STORAGE:
   Look for dashed lines - these indicate shelving/rods.
   Only add shelving where dashed lines appear.
   Leave remaining closet space open (just floor).

3. LAYOUT:
   Match room sizes, wall positions, and proportions exactly.
   Keep all connections between rooms accurate.

VISUAL STYLE:
Clean, highly detailed miniature architectural model with accurate proportions.
Add colorful, modern furniture in each room—sofas, beds, tables, lamps, plants, rugs, appliances—arranged realistically and in scale.
Photorealistic materials (wood floors, tiles, fabrics). Soft lighting, subtle shadows, professional quality.

NEGATIVE CONSTRAINTS (STRICTLY FORBIDDEN):
- NO TEXT: Do not write any room names, labels, dimensions, or annotations on the image. The floor should be clean of any text.
- NO WATERMARKS: Do not add any watermarks or logos.
- NO WALL DISTORTION: Keep walls straight and vertical.

Note: Focus on accuracy first (doors, layout, closets), then add beautiful details.
`;
