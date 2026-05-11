# Chart Components Guide

Questa guida documenta i componenti chart riutilizzabili e come usarli per evitare duplicazione di codice.

## 📋 Quick Reference

| Panel | Uso Ideale | Complessità | Ubicazione |
|-------|-----------|------------|-----------|
| **LineChartPanel** | Serie singola (andamento, trend) | Bassa | `src/components/charts/line-chart-panel.tsx` |
| **AreaChartPanel** | Multi-serie con gradients (insights) | Media | `src/components/charts/area-chart-panel.tsx` |
| **BarChartPanel** | Barre, stacked, patterns | Media-Alta | `src/components/charts/bar-chart-panel.tsx` |

---

## 🎯 Quando Usare Quale Panel

### LineChartPanel
- ✅ Una sola serie di dati
- ✅ Linea con tooltip personalizzato
- ✅ Formattazione custom dei valori
- ❌ NON per multi-serie senza gradients

**Esempi in uso:**
- AdherenceChart (% aderenza nel tempo)
- WeightChart (peso nel tempo)

**Quando creare un nuovo LineChart:**
```
Se hai: data con un singolo valore per punto → LineChartPanel
Se vuoi: tooltip con contenuto custom → usa labelFormatter + valueFormatter
```

---

### AreaChartPanel
- ✅ Multi-serie (2-5 serie tipicamente)
- ✅ Gradients automatici per ogni serie
- ✅ Tooltip condiviso tra serie
- ❌ NON per barre o linee semplici

**Esempi in uso:**
- InsightsGrid: 3 card diverse (Adherence, Weight, Measurements)

**Quando creare un nuovo AreaChart:**
```
Se hai: 2+ serie da visualizzare insieme → AreaChartPanel
Se vuoi: gradients belli e automatici → AreaChartPanel lo fa per te
Se dati cambiano per series[] → basta aggiornare array config
```

---

### BarChartPanel
- ✅ Barre singole o stacked
- ✅ Pattern fills (es: giorni mancanti)
- ✅ Custom defs (SVG patterns, gradients)
- ✅ Click handlers per interazione
- ❌ NON per linee o aree

**Esempi in uso:**
- ClientAdherenceOverview: stacked bars con patterns per missing days

**Quando creare un nuovo BarChart:**
```
Se hai: barre con logica custom (colori per entry, patterns) → BarChartPanel
Se devi: renderizzare defs SVG → children prop accetta tutto
Se devi: reagire a click su barre → onClick prop su Bar components
```

---

## 🏗️ Pattern: Come Creare un Domain Wrapper

### 1. Struttura Base (Template)

```typescript
// src/components/[feature]/[name]-chart.tsx
import { useMemo } from "react";
import { type Locale, getTranslations } from "@/lib/i18n";
import { LineChartPanel } from "@/components/charts/line-chart-panel";
import { getChartSeriesColor } from "@/lib/colors";

interface YourChartProps {
  data: YourDataType[];
  locale: Locale;
}

export function YourChart({ data, locale }: YourChartProps) {
  const t = getTranslations("yourFeature", locale);

  // 1. Transform data to match panel expectations
  const chartData = useMemo(() =>
    data.map(item => ({
      label: formatLabel(item.date, locale),
      rawDate: item.date,
      value: item.metric,
    }))
  , [data, locale]);

  // 2. Setup formatters
  const valueFormatter = (value: number) => `${value}%`;
  const labelFormatter = (point: typeof chartData[0]) =>
    formatDateFull(point.rawDate, locale);

  // 3. Get colors once here (not in panel)
  const seriesColor = getChartSeriesColor("adherence");

  // 4. Render panel with data + formatters
  return (
    <LineChartPanel
      data={chartData}
      seriesKey="value"
      seriesColor="adherence"
      seriesLabel={t.yourChart.title}
      valueFormatter={valueFormatter}
      labelFormatter={labelFormatter}
      yDomain={[0, 100]}
      yAxisWidth={44}
      chartMargin={{ top: 0, right: 12, left: 6, bottom: 8 }}
    />
  );
}
```

---

### 2. Responsabilità: Chi Fa Cosa

```
Domain Wrapper (es: YourChart)
├─ Data fetching / mock data
├─ Localization (translations)
├─ Data transformation to chart format
├─ Color retrieval (getChartSeriesColor)
├─ Formatter functions (valueFormatter, labelFormatter)
└─ Business logic (click handlers, state)

Chart Panel (es: LineChartPanel)
├─ Recharts plumbing (CartesianGrid, XAxis, YAxis, etc)
├─ Tooltip rendering
├─ Legend (if applicable)
└─ Gradient generation (AreaChartPanel only)
```

**Regola d'oro:** Panel riceve dati trasformati + formatters. Non deve conoscere logica di dominio.

---

## 📝 Esempi Completi

### Esempio 1: LineChartPanel (Single Series)

**File:** `src/app/[locale]/nutritionist/_components/client-detail-charts.tsx`

```typescript
const adherenceColor = getChartSeriesColor("adherence");

export function AdherenceChart({ data, locale }: Props) {
  return (
    <LineChartPanel
      data={data}
      seriesKey="adherence"
      seriesColor="adherence"
      seriesLabel={t.charts.adherence}
      valueFormatter={(v) => `${v}%`}
      labelFormatter={(p) => formatChartTooltipDate(p.rawDate)}
      yDomain={[0, 100]}
      yAxisWidth={44}
      chartMargin={{ top: 0, right: 12, left: 6, bottom: 8 }}
    />
  );
}
```

---

### Esempio 2: AreaChartPanel (Multi-Series)

**File:** `src/components/insights/insights-grid.tsx`

```typescript
<AreaChartPanel
  data={localizedAdherenceData}
  series={[
    {
      dataKey: "value",
      seriesColor: "adherence",
      strokeWidth: 1.8,
    },
  ]}
  yDomain={[55, 85]}
  labelFormatter={(label) =>
    formatTooltipWeekLabel(label, tooltipLabelPrefix)
  }
  tooltipFormatter={(value) => [
    `${value}%`,
    insightsContent.adherenceLabel,
  ]}
  heightClassName="h-48"
/>
```

Con 3 serie per measurements:
```typescript
series={[
  { dataKey: "waist", seriesColor: "waist", strokeWidth: 1.7 },
  { dataKey: "hips", seriesColor: "hips", strokeWidth: 1.7 },
  { dataKey: "chest", seriesColor: "chest", strokeWidth: 1.7 },
]}
```

---

### Esempio 3: BarChartPanel (With Patterns & Click Handlers)

**File:** `src/app/[locale]/nutritionist/_components/client-adherence-overview.tsx`

```typescript
<div className="relative">
  <BarChartPanel
    data={barChartData}
    xDataKey="label"
    yDomain={[0, 100]}
    yAxisWidth={40}
    heightClassName="relative h-72 w-full"
    tooltipContent={({ active, label, payload }) => {
      // Custom tooltip with rich content
    }}
  >
    <>
      <defs>
        <pattern
          id={`missing-day-pattern-${clientId}`}
          patternUnits="userSpaceOnUse"
          width="6"
          height="6"
          patternTransform="rotate(35)"
        >
          <rect width="6" height="6" fill="var(--muted)" fillOpacity="0.22" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--muted-foreground)" />
        </pattern>
      </defs>

      <Bar dataKey="missingValue" stackId="day" fill={`url(#missing-day-pattern-${clientId})`} />
      <Bar dataKey="adherenceValue" stackId="day" onClick={handleBarClick}>
        {data.map((entry) => (
          <Cell key={entry.key} fill={getBarColor(entry.adherence)} />
        ))}
      </Bar>
    </>
  </BarChartPanel>

  {/* Icons overlay (absolute positioned, needs relative parent) */}
  <div className="md:hidden">{renderIcons(compact)}</div>
</div>
```

---

## 🚀 Checklist: Come Aggiungere un Nuovo Chart

1. **Decidi il tipo**
   - [ ] Serie singola? → LineChartPanel
   - [ ] Multi-serie con gradients? → AreaChartPanel
   - [ ] Barre con customizzazioni? → BarChartPanel

2. **Crea il domain wrapper** (copia template da questa guida)
   - [ ] Fetch / prepare data
   - [ ] Setup formatters (valueFormatter, labelFormatter)
   - [ ] Get colors from getChartSeriesColor()
   - [ ] Render panel con data + props

3. **Passa data corretta al panel**
   - [ ] Ogni data point ha i campi attesi (label, rawDate, value/dataKey)
   - [ ] Formatters sono funzioni (non stringhe)
   - [ ] yDomain è un array [min, max]

4. **Test**
   - [ ] Renderizza senza errori TypeScript
   - [ ] Tooltip appare al hover
   - [ ] Dati visualizzati correttamente
   - [ ] Responsive su mobile

5. **Done!** ✅

---

## 🎨 Color System

Tutti i colori chart sono centralizzati in `src/lib/colors.ts`:

```typescript
import { getChartSeriesColor, getChartGradientStops } from "@/lib/colors";

// Per LinePanel / BarPanel:
const color = getChartSeriesColor("adherence"); // → "#10b981"

// Per AreaPanel (gradients automatici):
const [lightColor, darkColor] = getChartGradientStops("adherence");
// AreaPanel lo fa internamente, non serve richiamare
```

**ChartSeriesKey disponibili:**
- `"adherence"` - Green
- `"weight"` - Blue
- `"waist"`, `"hips"`, `"chest"` - Neutral shades
- (Aggiungi altri in colors.ts se necessario)

---

## ❓ FAQ

**Q: Posso usare un panel per più componenti diversi?**
A: Sì! È il punto. LineChartPanel ad esempio è usato da AdherenceChart e WeightChart con config diverse.

**Q: Cosa faccio se il mio chart è troppo particolare?**
A: Se hai logica Recharts molto custom (legend toggle, zoom, ecc), puoi ancora usare ChartFrame come base e scrivere il Recharts direttamente. Ma prima prova a usare i panel!

**Q: Come passo dati dinamici?**
A: Usa `useMemo` nel domain wrapper per trasformare dati quando cambiano. Il panel riceverà sempre data corretti.

**Q: Posso cambiare i colori?**
A: I colori vengono da `getChartSeriesColor()`. Per cambiarli, modifica `src/lib/colors.ts`, non il panel.

---

## 📌 Link Utili

- Panel implementations: `src/components/charts/`
- Color system: `src/lib/colors.ts`
- Existing wrappers: `src/app/[locale]/nutritionist/_components/`, `src/components/insights/`
