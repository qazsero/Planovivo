export const FLOOR_PLAN_PROMPT = `
Create a top-down, fully 3D isometric render of this architectural floorplan as a beautiful miniature maquette.

CRITICAL ACCURACY REQUIREMENTS:

1. DOORS - HIGHEST PRIORITY:
   Pay close attention to door placement and swing direction shown in the floorplan.
   Door arcs show which way they open - respect this exactly.
   
2. CLOSETS AND STORAGE:
   Look for dashed lines - these indicate shelving/rods.
   Only add shelving where dashed lines appear.
   Leave remaining closet space open (just floor).

3. LAYOUT:
   Match room sizes, wall positions, and proportions exactly.
   Keep all connections between rooms accurate.

VISUAL STYLE:
Clean, highly detailed miniature architectural model with accurate proportions. Remove all text labels. Add colorful, modern furniture in each room—sofas, beds, tables, lamps, plants, rugs, appliances—arranged realistically and in scale. Photorealistic materials (wood floors, tiles, fabrics). Soft lighting, subtle shadows, professional quality.

Note: Focus on accuracy first (doors, layout, closets), then add beautiful details.
`;
