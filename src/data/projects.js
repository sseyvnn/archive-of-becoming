/**
 * ARCHIVE OF BECOMING — project data.
 *
 * Single source of truth for the landing page's image field, the
 * reference list, and each project's process board. Add a new project by
 * adding a new object to `projects` below and giving it a few lines in
 * `landingLayout` / `board(...)` — no component needs to change.
 *
 * IMPORTANT — one project, many media:
 * A project can (and often will) contribute several images/videos to the
 * landing page's image field via `landingMedia`. Every entry carries the
 * parent project's id, so hovering / clicking any one of them behaves as
 * "this belongs to project X" — never as its own standalone item.
 *
 * NOTE: the landing page no longer renders `landingMedia` / `landingLayout`
 * (the field is now driven by data/workField.js with 16:9 placeholders).
 * They are kept as reference data and can be reused or deleted.
 *
 * LANDING FIELD POSITIONING (legacy — see note above)
 * `landingLayout` (below the project list) is the ordered, explicitly
 * positioned list actually rendered by the Project Image Field. Desktop
 * coordinates are cells on a fixed-column grid (see --board-columns /
 * --board-row-unit in styles/variables.css) — `col`/`row` are the
 * starting cell, `colSpan`/`rowSpan` the size. Placement is explicit
 * (not auto-packed) specifically so the composition can carry real
 * negative space. `wide: true` additionally makes an item span both
 * mobile columns instead of one.
 *
 * PROJECT BOARD
 * `projectBoard.artifacts` are the nodes of that project's process board
 * (see pages/Project.jsx) — each has a percentage-based `x`/`y`/`width`
 * so the desktop board and the connecting lines are pure CSS/SVG, no
 * measurement required. `projectBoard.connections` are `{ from, to }`
 * pairs of artifact ids, drawn as thin lines on desktop and ignored on
 * the mobile editorial sequence (see ARTIFACT_ORDER note below).
 */

// --- placeholder media (replace freely — see README) -----------------------
import rfsGarmentSim from '../assets/placeholders/remote-fitting-system/garment-sim.svg'
import rfsBodyModel from '../assets/placeholders/remote-fitting-system/body-model.svg'
import rfsInterface from '../assets/placeholders/remote-fitting-system/interface.svg'
import rfsFitVisualization from '../assets/placeholders/remote-fitting-system/fit-visualization.svg'

import dfaArchiveWall from '../assets/placeholders/digital-fashion-archive/archive-wall.svg'
import dfaObject01 from '../assets/placeholders/digital-fashion-archive/object-01.svg'
import dfaObject02 from '../assets/placeholders/digital-fashion-archive/object-02.svg'

import vseStyling01 from '../assets/placeholders/virtual-styling-environment/styling-01.svg'
import vseStyling02 from '../assets/placeholders/virtual-styling-environment/styling-02.svg'
import vseStyling03 from '../assets/placeholders/virtual-styling-environment/styling-03.svg'
import vseMotionWebm from '../assets/placeholders/virtual-styling-environment/motion-still.webm'
import vseMotionMp4 from '../assets/placeholders/virtual-styling-environment/motion-still.mp4'
import vseMotionPoster from '../assets/placeholders/virtual-styling-environment/motion-still-poster.svg'

import onaNetworkView from '../assets/placeholders/ona/network-view.svg'
import onaInteraction from '../assets/placeholders/ona/interaction.svg'

import fiiInstallation01 from '../assets/placeholders/fashion-interactive-installation/installation-01.svg'
import fiiInstallation02 from '../assets/placeholders/fashion-interactive-installation/installation-02.svg'
import fiiInstallation03 from '../assets/placeholders/fashion-interactive-installation/installation-03.svg'

import efcCommerce01 from '../assets/placeholders/experimental-fashion-commerce/commerce-01.svg'
import efcCommerce02 from '../assets/placeholders/experimental-fashion-commerce/commerce-02.svg'

import aobPortfolio01 from '../assets/placeholders/archive-of-becoming/portfolio-01.svg'
import aobPortfolio02 from '../assets/placeholders/archive-of-becoming/portfolio-02.svg'

import esStudy01 from '../assets/placeholders/experimental-systems/study-01.svg'
import esStudy02 from '../assets/placeholders/experimental-systems/study-02.svg'
import esStudy03 from '../assets/placeholders/experimental-systems/study-03.svg'
import esStudy04 from '../assets/placeholders/experimental-systems/study-04.svg'

// -----------------------------------------------------------------------
// Shared process-board coordinate template (percentage-based, desktop).
// Every project's board reuses this arrangement with its own content —
// loose and organic on purpose, not a rigid org-chart tree. See PROJECT
// BOARD note above.
const BOARD_SLOTS = {
  info: { x: 4, y: 5, width: 24 },
  final: { x: 60, y: 3, width: 30 },
  prototype: { x: 32, y: 24, width: 22 },
  research: { x: 5, y: 40, width: 22 },
  experiment: { x: 68, y: 44, width: 24 },
  interface: { x: 38, y: 56, width: 26 },
  model: { x: 9, y: 68, width: 22 },
}

const BOARD_CONNECTIONS = [
  ['research', 'prototype'],
  ['prototype', 'experiment'],
  ['experiment', 'interface'],
  ['prototype', 'model'],
  ['model', 'interface'],
]

/**
 * Builds one project's board from its own content. `media` supplies the
 * images/video used for the 'final', 'prototype' and 'interface' visual
 * nodes (reusing landingMedia is fine — a project's hero shot often is
 * both on the landing field and the board's "final output"). `notes`
 * supplies the two short text-artifact captions ('research', 'experiment').
 */
function buildBoard(project, { media, notes }) {
  const artifacts = [
    {
      id: `${project.id}-info`,
      number: `${project.number}.00`,
      type: 'info',
      title: project.title,
      caption: project.role,
      ...BOARD_SLOTS.info,
    },
    {
      id: `${project.id}-final`,
      number: `${project.number}.01`,
      type: media.final.type ?? 'image',
      title: 'FINAL OUTPUT',
      caption: media.final.caption,
      src: media.final.src,
      poster: media.final.poster,
      sources: media.final.sources,
      alt: media.final.alt,
      aspectRatio: media.final.aspectRatio,
      ...BOARD_SLOTS.final,
    },
    {
      id: `${project.id}-prototype`,
      number: `${project.number}.02`,
      type: 'image',
      title: 'PROTOTYPE',
      caption: media.prototype.caption,
      src: media.prototype.src,
      alt: media.prototype.alt,
      aspectRatio: media.prototype.aspectRatio,
      ...BOARD_SLOTS.prototype,
    },
    {
      id: `${project.id}-research`,
      number: `${project.number}.03`,
      type: 'text',
      title: 'RESEARCH',
      caption: `${project.year} / notes`,
      body: notes.research,
      ...BOARD_SLOTS.research,
    },
    {
      id: `${project.id}-experiment`,
      number: `${project.number}.04`,
      type: 'text',
      title: 'EXPERIMENT',
      caption: `${project.year} / notes`,
      body: notes.experiment,
      ...BOARD_SLOTS.experiment,
    },
    {
      id: `${project.id}-interface`,
      number: `${project.number}.05`,
      type: 'image',
      title: 'INTERFACE',
      caption: media.interface.caption,
      src: media.interface.src,
      alt: media.interface.alt,
      aspectRatio: media.interface.aspectRatio,
      ...BOARD_SLOTS.interface,
    },
    {
      id: `${project.id}-model`,
      number: `${project.number}.06`,
      type: 'diagram',
      title: 'PROCESS NOTE',
      caption: `${project.year} / process`,
      body: notes.model,
      ...BOARD_SLOTS.model,
    },
  ]

  const idFor = (key) => `${project.id}-${key}`
  const connections = BOARD_CONNECTIONS.map(([from, to]) => ({ from: idFor(from), to: idFor(to) }))

  return { artifacts, connections }
}

// -----------------------------------------------------------------------

export const projects = [
  {
    id: 'project-01',
    number: '01',
    title: 'Remote Fitting System',
    slug: 'remote-fitting-system',
    shortDescription: 'Digital fitting environment',
    fullDescription:
      'A digital fitting system exploring how stylists/designers could evaluate garment fit remotely using body measurements, 3D avatars and digital garment simulation.',
    year: 2026,
    role: 'Creative Technologist',
    disciplines: ['3D', 'Digital Fashion'],
    tools: ['CLO3D', 'Blender', 'Figma', 'Web technologies'],
    landingMedia: [
      { id: 'p1-garment-sim', type: 'image', src: rfsGarmentSim, alt: 'Placeholder — CLO3D garment simulation study for Remote Fitting System.', aspectRatio: '3:4' },
      { id: 'p1-interface', type: 'image', src: rfsInterface, alt: 'Placeholder — interface screen from Remote Fitting System.', aspectRatio: '16:9' },
    ],
  },
  {
    id: 'project-02',
    number: '02',
    title: 'Digital Fashion Archive',
    slug: 'digital-fashion-archive',
    shortDescription: 'Interactive fashion archive',
    fullDescription:
      "An interactive system for digitizing and presenting a stylist/designer's body of work beyond a traditional portfolio.",
    year: 2026,
    role: 'Creative Technologist',
    disciplines: ['Digital Archive', 'Interaction Design'],
    tools: ['Blender', 'React', 'Figma', '3D/Web'],
    landingMedia: [
      { id: 'p2-archive-wall', type: 'image', src: dfaArchiveWall, alt: 'Placeholder — archive wall view from Digital Fashion Archive.', aspectRatio: '4:3' },
      { id: 'p2-object-01', type: 'image', src: dfaObject01, alt: 'Placeholder — archived object 01 from Digital Fashion Archive.', aspectRatio: '1:1' },
    ],
  },
  {
    id: 'project-03',
    number: '03',
    title: 'Virtual Styling Environment',
    slug: 'virtual-styling-environment',
    shortDescription: 'Digital styling system',
    fullDescription:
      'A digital environment for assembling, comparing and testing complete looks on a virtual body.',
    year: 2025,
    role: 'Creative Technologist',
    disciplines: ['3D', 'Digital Fashion'],
    tools: ['CLO3D', 'Blender', 'Figma', 'Web'],
    landingMedia: [
      { id: 'p3-styling-01', type: 'image', src: vseStyling01, alt: 'Placeholder — styling study 01 from Virtual Styling Environment.', aspectRatio: '3:4' },
      {
        id: 'p3-motion-still',
        type: 'video',
        sources: [
          { src: vseMotionWebm, type: 'video/webm' },
          { src: vseMotionMp4, type: 'video/mp4' },
        ],
        poster: vseMotionPoster,
        alt: 'Placeholder — looping motion study from Virtual Styling Environment.',
        aspectRatio: '16:9',
      },
    ],
  },
  {
    id: 'project-04',
    number: '04',
    title: 'Ọ̀NÀ',
    slug: 'ona',
    shortDescription: 'Interactive knowledge interface',
    fullDescription:
      'An interactive knowledge interface exploring gesture, spatial information and Yoruba knowledge/cultural systems.',
    year: 2026,
    role: 'Creative Technologist',
    disciplines: ['Interactive Media', 'Information Design'],
    tools: ['TouchDesigner', 'Gesture / computer vision', '3D', 'Interactive systems'],
    landingMedia: [
      { id: 'p4-network-view', type: 'image', src: onaNetworkView, alt: 'Placeholder — network visualization from Ọ̀NÀ.', aspectRatio: '1:1' },
      { id: 'p4-interaction', type: 'image', src: onaInteraction, alt: 'Placeholder — interaction still from Ọ̀NÀ.', aspectRatio: '3:4' },
    ],
  },
  {
    id: 'project-05',
    number: '05',
    title: 'Fashion Interactive Installation',
    slug: 'fashion-interactive-installation',
    shortDescription: 'Spatial fashion experience',
    fullDescription:
      'A physical/digital fashion experience exploring how movement, garments, sound or audience interaction can influence visual media.',
    year: 2025,
    role: 'Creative Technologist',
    disciplines: ['Interactive Media', 'Installation'],
    tools: ['TouchDesigner', 'Computer vision', 'Interactive media'],
    landingMedia: [
      { id: 'p5-installation-01', type: 'image', src: fiiInstallation01, alt: 'Placeholder — installation view 01 from Fashion Interactive Installation.', aspectRatio: '4:3' },
      { id: 'p5-installation-02', type: 'image', src: fiiInstallation02, alt: 'Placeholder — installation view 02 from Fashion Interactive Installation.', aspectRatio: '9:16' },
    ],
  },
  {
    id: 'project-06',
    number: '06',
    title: 'Experimental Fashion Commerce',
    slug: 'experimental-fashion-commerce',
    shortDescription: 'Interactive digital retail',
    fullDescription:
      'An experiment investigating richer ways to experience garments online through 3D interaction, fit information, material information and styling.',
    year: 2025,
    role: 'Creative Technologist',
    disciplines: ['Digital Retail', '3D'],
    tools: ['Figma', 'React', '3D/Web', 'Fashion technology'],
    landingMedia: [
      { id: 'p6-commerce-01', type: 'image', src: efcCommerce01, alt: 'Placeholder — commerce interface study 01 from Experimental Fashion Commerce.', aspectRatio: '1:1' },
      { id: 'p6-commerce-02', type: 'image', src: efcCommerce02, alt: 'Placeholder — commerce interface study 02 from Experimental Fashion Commerce.', aspectRatio: '4:3' },
    ],
  },
  {
    id: 'project-07',
    number: '07',
    title: 'Archive of Becoming',
    slug: 'archive-of-becoming',
    shortDescription: 'Portfolio system',
    fullDescription:
      'The portfolio itself as an interactive archive documenting the process and work of becoming SEYVN.',
    year: 2026,
    role: 'Creative Technologist',
    disciplines: ['Interaction Design', 'Creative Coding'],
    tools: ['React', 'Vite', 'Creative coding', 'Interaction design'],
    landingMedia: [
      { id: 'p7-portfolio-01', type: 'image', src: aobPortfolio01, alt: 'Placeholder — landing composition study from Archive of Becoming.', aspectRatio: '16:9' },
      { id: 'p7-portfolio-02', type: 'image', src: aobPortfolio02, alt: 'Placeholder — detail study from Archive of Becoming.', aspectRatio: '1:1' },
    ],
  },
  {
    id: 'project-08',
    number: '08',
    title: 'Experimental Systems',
    slug: 'experimental-systems',
    shortDescription: 'Selected visual + technical studies',
    fullDescription:
      'A curated collection of smaller technical/visual experiments — spanning TouchDesigner, Blender, audio-reactive systems, computer vision, generative media and visual studies.',
    year: 2025,
    role: 'Creative Technologist',
    disciplines: ['Generative Media', 'Computer Vision'],
    tools: ['TouchDesigner', 'Blender', 'Audio-reactive systems', 'Computer vision', 'Generative media'],
    landingMedia: [
      { id: 'p8-study-02', type: 'image', src: esStudy02, alt: 'Placeholder — visual study 02 from Experimental Systems.', aspectRatio: '3:4' },
      { id: 'p8-study-03', type: 'image', src: esStudy03, alt: 'Placeholder — visual study 03 from Experimental Systems.', aspectRatio: '4:3' },
    ],
  },
]

// -----------------------------------------------------------------------
// Project boards — see buildBoard() above. Each project reuses one or two
// of its OWN landingMedia items for the visual nodes, plus placeholder
// process-note text clearly marked as such.
const boardContent = {
  'project-01': {
    media: {
      final: { src: rfsInterface, alt: 'Placeholder — final interface output for Remote Fitting System.', aspectRatio: '16:9', caption: 'System / v1' },
      prototype: { src: rfsBodyModel, alt: 'Placeholder — early 3D body model prototype.', aspectRatio: '4:3', caption: 'Body model' },
      interface: { src: rfsFitVisualization, alt: 'Placeholder — fit visualization interface.', aspectRatio: '1:1', caption: 'Fit visualization' },
    },
    notes: {
      research: '[Placeholder] Early research into remote fitting workflows, body measurement capture and existing digital-fitting tools.',
      experiment: '[Placeholder] Testing garment behavior against body measurements established during the fitting study.',
      model: '[Placeholder] Process note reserved for CLO3D simulation and body-model development stages.',
    },
  },
  'project-02': {
    media: {
      final: { src: dfaArchiveWall, alt: 'Placeholder — final archive wall output.', aspectRatio: '4:3', caption: 'Archive wall' },
      prototype: { src: dfaObject01, alt: 'Placeholder — early archived object prototype.', aspectRatio: '1:1', caption: 'Object study 01' },
      interface: { src: dfaObject02, alt: 'Placeholder — archive interface study.', aspectRatio: '1:1', caption: 'Object study 02' },
    },
    notes: {
      research: '[Placeholder] Research into archival systems and how a body of work can be presented beyond a static portfolio.',
      experiment: '[Placeholder] Testing digitization workflows for physical and digital work samples.',
      model: '[Placeholder] Process note reserved for information-architecture and archive-structure development.',
    },
  },
  'project-03': {
    media: {
      final: { type: 'video', sources: [{ src: vseMotionWebm, type: 'video/webm' }, { src: vseMotionMp4, type: 'video/mp4' }], poster: vseMotionPoster, alt: 'Placeholder — final motion study output.', aspectRatio: '16:9', caption: 'Motion study' },
      prototype: { src: vseStyling02, alt: 'Placeholder — early styling prototype.', aspectRatio: '1:1', caption: 'Styling study' },
      interface: { src: vseStyling03, alt: 'Placeholder — styling environment interface.', aspectRatio: '16:9', caption: 'Environment view' },
    },
    notes: {
      research: '[Placeholder] Research into look-building workflows and how stylists compare garment combinations digitally.',
      experiment: '[Placeholder] Testing look assembly and comparison against a virtual body.',
      model: '[Placeholder] Process note reserved for CLO3D and Blender styling-environment development.',
    },
  },
  'project-04': {
    media: {
      final: { src: onaInteraction, alt: 'Placeholder — final interaction output for Ọ̀NÀ.', aspectRatio: '3:4', caption: 'Interaction study' },
      prototype: { src: onaNetworkView, alt: 'Placeholder — early network-view prototype.', aspectRatio: '1:1', caption: 'Network view' },
      interface: { src: onaNetworkView, alt: 'Placeholder — knowledge-interface study.', aspectRatio: '1:1', caption: 'Interface study' },
    },
    notes: {
      research: '[Placeholder] Research into Yoruba knowledge/cultural systems and gesture-driven interfaces.',
      experiment: '[Placeholder] Testing gesture and spatial-information interaction methods.',
      model: '[Placeholder] Process note reserved for TouchDesigner and computer-vision development stages.',
    },
  },
  'project-05': {
    media: {
      final: { src: fiiInstallation03, alt: 'Placeholder — final installation output.', aspectRatio: '1:1', caption: 'Installation view' },
      prototype: { src: fiiInstallation01, alt: 'Placeholder — early installation prototype.', aspectRatio: '4:3', caption: 'Prototype view' },
      interface: { src: fiiInstallation02, alt: 'Placeholder — spatial interface study.', aspectRatio: '9:16', caption: 'Spatial study' },
    },
    notes: {
      research: '[Placeholder] Research into movement, sound and audience-interaction driven visual media.',
      experiment: '[Placeholder] Testing how garments and motion influence generated visual output.',
      model: '[Placeholder] Process note reserved for TouchDesigner and computer-vision development.',
    },
  },
  'project-06': {
    media: {
      final: { src: efcCommerce02, alt: 'Placeholder — final commerce interface output.', aspectRatio: '4:3', caption: 'Commerce interface' },
      prototype: { src: efcCommerce01, alt: 'Placeholder — early commerce prototype.', aspectRatio: '1:1', caption: 'Prototype view' },
      interface: { src: efcCommerce01, alt: 'Placeholder — 3D interaction interface study.', aspectRatio: '1:1', caption: 'Interaction study' },
    },
    notes: {
      research: '[Placeholder] Research into online garment presentation and fit/material communication.',
      experiment: '[Placeholder] Testing 3D interaction patterns for online garment inspection.',
      model: '[Placeholder] Process note reserved for React/3D web development stages.',
    },
  },
  'project-07': {
    media: {
      final: { src: aobPortfolio01, alt: 'Placeholder — final landing composition output.', aspectRatio: '16:9', caption: 'Landing composition' },
      prototype: { src: aobPortfolio02, alt: 'Placeholder — early composition prototype.', aspectRatio: '1:1', caption: 'Composition study' },
      interface: { src: aobPortfolio02, alt: 'Placeholder — interaction-system interface study.', aspectRatio: '1:1', caption: 'Interaction study' },
    },
    notes: {
      research: '[Placeholder] Research into archival presentation systems and editorial/fashion-board references.',
      experiment: '[Placeholder] Testing composition, typography and interaction patterns for the archive itself.',
      model: '[Placeholder] Process note reserved for React/Vite architecture and interaction-design development.',
    },
  },
  'project-08': {
    media: {
      final: { src: esStudy01, alt: 'Placeholder — final visual study output.', aspectRatio: '1:1', caption: 'Visual study' },
      prototype: { src: esStudy04, alt: 'Placeholder — early technical-study prototype.', aspectRatio: '1:1', caption: 'Technical study' },
      interface: { src: esStudy02, alt: 'Placeholder — generative-system interface study.', aspectRatio: '3:4', caption: 'System study' },
    },
    notes: {
      research: '[Placeholder] Reserved for notes on individual experiments as they are selected for this collection.',
      experiment: '[Placeholder] Reserved for technical notes — audio-reactivity, computer vision, generative media.',
      model: '[Placeholder] Process note reserved for TouchDesigner/Blender experiment documentation.',
    },
  },
}

for (const project of projects) {
  project.projectBoard = buildBoard(project, boardContent[project.id])
}

// -----------------------------------------------------------------------
/**
 * Explicit, ordered placement for the landing Project Image Field.
 * Desktop cells are on the --board-columns grid; rowSpan/colSpan are cell
 * counts, not pixels — see the file header. `wide: true` spans both
 * mobile columns. Re-order or re-number this array to re-art-direct the
 * whole field; leaving items out of this list simply keeps them off the
 * landing page (still reachable from their project page).
 */
const landingLayout = [
  { projectId: 'project-01', mediaIndex: 0, col: 2, colSpan: 3, row: 1, rowSpan: 18 },
  { projectId: 'project-01', mediaIndex: 1, col: 15, colSpan: 6, row: 1, rowSpan: 15, wide: true },
  { projectId: 'project-02', mediaIndex: 0, col: 7, colSpan: 4, row: 24, rowSpan: 13 },
  { projectId: 'project-04', mediaIndex: 0, col: 19, colSpan: 3, row: 26, rowSpan: 13 },
  { projectId: 'project-03', mediaIndex: 0, col: 2, colSpan: 3, row: 45, rowSpan: 18 },
  { projectId: 'project-05', mediaIndex: 1, col: 11, colSpan: 2, row: 45, rowSpan: 15 },
  { projectId: 'project-02', mediaIndex: 1, col: 17, colSpan: 3, row: 48, rowSpan: 13 },
  { projectId: 'project-07', mediaIndex: 0, col: 5, colSpan: 6, row: 70, rowSpan: 15, wide: true },
  { projectId: 'project-06', mediaIndex: 0, col: 15, colSpan: 3, row: 72, rowSpan: 13 },
  { projectId: 'project-04', mediaIndex: 1, col: 3, colSpan: 3, row: 91, rowSpan: 18 },
  { projectId: 'project-08', mediaIndex: 0, col: 10, colSpan: 3, row: 93, rowSpan: 18 },
  { projectId: 'project-05', mediaIndex: 0, col: 17, colSpan: 4, row: 95, rowSpan: 13 },
  { projectId: 'project-06', mediaIndex: 1, col: 2, colSpan: 4, row: 115, rowSpan: 13 },
  { projectId: 'project-08', mediaIndex: 1, col: 9, colSpan: 4, row: 118, rowSpan: 13 },
  { projectId: 'project-07', mediaIndex: 1, col: 17, colSpan: 3, row: 117, rowSpan: 13 },
  { projectId: 'project-03', mediaIndex: 1, col: 6, colSpan: 6, row: 136, rowSpan: 15, wide: true },
]

export const landingMediaField = landingLayout.map(({ projectId, mediaIndex, ...layout }) => {
  const project = projects.find((p) => p.id === projectId)
  const media = project.landingMedia[mediaIndex]
  return {
    ...media,
    projectId: project.id,
    projectNumber: project.number,
    projectTitle: project.title,
    projectSlug: project.slug,
    layout,
  }
})

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug) {
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return { previous: null, next: null }
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  return { previous, next }
}
