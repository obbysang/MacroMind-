I have implemented the pixel-perfect reproduction of the designs provided in `code.html` and `code(1).html`.

### Implementation Details:
1.  **Global Styles & Theme**:
    - Configured Tailwind CSS v4 in `globals.css` with the specific color palette (primary, background, surface, etc.) and fonts.
    - Added `Space Grotesk` and `Noto Sans` via `next/font/google`.
    - Added `Material Symbols Outlined` via `layout.tsx`.
    - Implemented custom scrollbar and chart styles.

2.  **Dashboard Page (`/`)**:
    - Implemented in `apps/web/src/app/page.tsx`.
    - Matches `code.html` structure exactly.
    - Includes the fixed sidebar, KPI cards, AI Causal Insights feed, and Strategy Comparison widget.
    - Responsive grids (`grid-cols-1 md:grid-cols-3`, etc.) are preserved.

3.  **Match Analysis Page (`/matches/analysis`)**:
    - Implemented in `apps/web/src/app/matches/analysis/page.tsx`.
    - Matches `code(1).html` structure exactly.
    - Includes the responsive sidebar (`w-20 lg:w-64`), Timeline visualization, Critical Incidents list, and AI Impact Analysis.
    - Uses the specific dark theme colors (`#101c22` background) as defined in the design.

### Verification:
- **Fonts**: Space Grotesk is applied globally.
- **Colors**: Custom hex codes from the HTML files are used.
- **Layout**: Sidebar widths and grid layouts match the source code.
- **Responsiveness**: The Dashboard content adapts to mobile/tablet (stacking grids), and the Match Analysis sidebar collapses on smaller screens, matching the provided code's logic.

You can run the project with `npm run dev` in `apps/web` to view the results.
- Dashboard: `http://localhost:3000/`
- Match Analysis: `http://localhost:3000/matches/analysis`
