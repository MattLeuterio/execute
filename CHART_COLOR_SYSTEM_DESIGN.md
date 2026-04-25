# Chart Color System Design - Execute MVP

## Overview
The chart color system defines visual identity for chart series by **data type**, not by status severity.

This is intentionally separate from status colors:
- Status colors (green/amber/red/slate) communicate risk semantics.
- Chart colors communicate series identity and improve comparison.

## Principles
- One metric, one stable color across all chart surfaces.
- Chart color never implies positive/negative judgment.
- Status colors remain isolated in status UI elements.
- Keep contrast readable in both light and dark themes.
- Prefer consistency over visual novelty for MVP.

## Canonical Series Mapping
Defined in [src/lib/colors.ts](src/lib/colors.ts) via chart helpers.

- `adherence`: soft blue
- `weight`: muted violet
- `waist`: desaturated teal
- `hips`: warm bronze
- `chest`: dusty mauve
- `reference`: border

## Source of Truth
Chart color logic lives in [src/lib/colors.ts](src/lib/colors.ts):
- `getChartSeriesColor(series)`
- `getChartGridColor(strokeOpacity)`
- `getChartGradientStops(series, startOpacity?)`
- `getChartTooltipContentStyle()`

Status color logic remains in the same file but separate:
- `getStatusColors(...)`

## Current Consumers
- Nutritionist client detail charts:
  - [src/app/[locale]/nutritionist/_components/client-detail-charts.tsx](src/app/[locale]/nutritionist/_components/client-detail-charts.tsx)
- Shared insights charts:
  - [src/components/insights/insights-grid.tsx](src/components/insights/insights-grid.tsx)

## Implementation Rules
- Do not hardcode chart stroke/fill colors directly in chart components.
- Pull chart colors from color helpers.
- Keep legend colors tied to the same series mapping.
- Keep tooltip labels localized via i18n, but keep color keys language-independent.

## Anti-patterns
- Reusing status colors for chart series semantics.
- Encoding "good" vs "bad" meaning in series color.
- Defining different colors for the same metric in different screens.
- Adding one-off opacity values in component code when helper values already exist.

## Accessibility Guidance
- Verify line and legend visibility in light and dark themes.
- Keep sufficient contrast between adjacent series.
- Do not rely on color alone in tooltip/legend: always include labels.

## Adoption Checklist
- [ ] New chart metric added to central mapping in [src/lib/colors.ts](src/lib/colors.ts)
- [ ] New metric uses helper-based colors in component
- [ ] Legend dot/marker matches series color
- [ ] Tooltip labels are localized
- [ ] Manual light/dark check completed

## Future Extensions
- Introduce dedicated chart CSS variables (`--chart-*`) if theme granularity needs to grow.
- Add visual regression snapshots for chart surfaces.
- Expand helper API for dashed lines and reference bands.
