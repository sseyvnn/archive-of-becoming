/**
 * ARCHIVE OF BECOMING — the landing page's editorial thumbnail field.
 *
 * Each entry here is ONE 16:9 thumbnail plus its small label. The field
 * (components/WorkField) is entirely driven by this list: add, remove or
 * re-order entries and the composition updates — no component changes.
 *
 * ENTRY SHAPE
 *   slug        Optional. Pulls number, title, description and link from
 *               the matching project in data/projects.js, so the WORK /
 *               2026 list and this field never drift apart.
 *   number / title / description / to
 *               Optional overrides — or, for an entry with no `slug`, the
 *               only source. `to` is the destination route; leave it out
 *               and the entry renders as a non-clickable label until the
 *               page exists.
 *   thumbnail   null            -> a flat muted placeholder (current state)
 *               { type: 'image', src, alt }
 *               { type: 'video', sources: [{ src, type }], poster, alt }
 *               Always shown cropped to 16:9.
 *   tone        Placeholder fill. Muted neutrals only.
 *   layout      Where this entry sits. All numbers are in "cqw": percent of
 *               the field's own width, so the composition scales as one
 *               piece. See the LAYOUT note below.
 *
 * LAYOUT
 *   desktop / tablet / mobile each take:
 *     x      thumbnail's left edge, % of field width
 *     w      thumbnail width, % of field width (height is always w * 9/16)
 *     pull   extra vertical offset from the previous entry's bottom edge.
 *            Positive = more breathing room; negative = slide up so this
 *            entry sits BESIDE the previous one (desktop only — keep
 *            horizontal ranges apart when you do).
 *     label  'right' | 'left' | 'below'  — where the label sits relative to
 *            its thumbnail (tablet/mobile are always 'below').
 *
 * ADDING THE GUCCI SS27 RUNWAY PROJECT (planned first project):
 *   1. Add it to `projects` in data/projects.js (it will then also appear
 *      in the WORK / 2026 list), then add an entry here with
 *      `slug: 'gucci-ss27'` and its thumbnail.
 *   — or, to show it here before it has a page:
 *      { number: '01', title: 'Gucci SS27', description: 'Runway tracking
 *        system', thumbnail: null, layout: {...} }   (no `to` yet)
 */
import { projects } from './projects'

const entries = [
  {
    slug: 'remote-fitting-system',
    tone: '#d9d5ca',
    layout: {
      desktop: { x: 2, w: 34, pull: 0, label: 'right' },
      tablet: { x: 0, w: 62 },
      mobile: { x: 0, w: 100 },
    },
  },
  {
    slug: 'digital-fashion-archive',
    tone: '#cfcbc0',
    layout: {
      desktop: { x: 65, w: 27, pull: -16.5, label: 'below' },
      tablet: { x: 34, w: 60 },
      mobile: { x: 8, w: 92 },
    },
  },
  {
    slug: 'virtual-styling-environment',
    tone: '#c4c1b8',
    layout: {
      desktop: { x: 25, w: 24, pull: 4, label: 'left' },
      tablet: { x: 10, w: 52 },
      mobile: { x: 0, w: 92 },
    },
  },
  {
    slug: 'ona',
    tone: '#dcd8cf',
    layout: {
      desktop: { x: 53, w: 30, pull: -6.5, label: 'right' },
      tablet: { x: 30, w: 66 },
      mobile: { x: 6, w: 94 },
    },
  },
  {
    slug: 'fashion-interactive-installation',
    tone: '#cbc8be',
    layout: {
      desktop: { x: 1, w: 25, pull: 4, label: 'right' },
      tablet: { x: 0, w: 56 },
      mobile: { x: 0, w: 100 },
    },
  },
  {
    slug: 'experimental-fashion-commerce',
    tone: '#d4d0c6',
    layout: {
      desktop: { x: 60, w: 27, pull: -8, label: 'below' },
      tablet: { x: 38, w: 58 },
      mobile: { x: 10, w: 90 },
    },
  },
  {
    slug: 'archive-of-becoming',
    tone: '#c8c5bb',
    layout: {
      desktop: { x: 14, w: 32, pull: 4.5, label: 'right' },
      tablet: { x: 8, w: 64 },
      mobile: { x: 0, w: 94 },
    },
  },
  {
    slug: 'experimental-systems',
    tone: '#d8d4ca',
    layout: {
      desktop: { x: 60, w: 24, pull: -2, label: 'left' },
      tablet: { x: 24, w: 54 },
      mobile: { x: 6, w: 94 },
    },
  },
]

export const workField = entries.map((entry, index) => {
  const project = entry.slug ? projects.find((p) => p.slug === entry.slug) : null
  return {
    id: entry.id ?? project?.id ?? `field-${index}`,
    projectId: project?.id ?? null,
    number: entry.number ?? project?.number ?? String(index + 1).padStart(2, '0'),
    title: entry.title ?? project?.title ?? '',
    description: entry.description ?? project?.shortDescription ?? '',
    to: entry.to ?? (project ? `/project/${project.slug}` : null),
    thumbnail: entry.thumbnail ?? null,
    tone: entry.tone,
    layout: entry.layout,
  }
})
