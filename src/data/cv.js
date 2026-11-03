/**
 * ARCHIVE OF BECOMING — CV data.
 *
 * Edit this file to update the CV page — nothing else needs to change.
 * Per the brief, no employment history, institutions or dates are
 * invented: entries not yet confirmed are written as explicit
 * `placeholder: true` items so the page's typography/layout is real while
 * the content clearly is not. Flip `placeholder` to false (and fill in
 * the real fields) once you have the details.
 */

export const downloadHref = '/cv.pdf' // add the real file to /public as cv.pdf

export const experience = [
  {
    placeholder: true,
    period: '[Placeholder period]',
    role: '[Placeholder role]',
    org: '[Placeholder company / studio]',
    location: '[Placeholder location]',
    description: '[Placeholder] Add role description once available.',
  },
]

export const education = [
  {
    placeholder: true,
    period: '[Placeholder period]',
    field: 'Computer Science',
    org: '[Placeholder institution]',
    location: '[Placeholder location]',
    description: null,
  },
  {
    placeholder: true,
    period: '[Placeholder period]',
    field: 'Cybersecurity',
    org: '[Placeholder institution]',
    location: '[Placeholder location]',
    description: null,
  },
]

// Selected projects intentionally reference the real project data
// (src/data/projects.js) rather than duplicating it — see pages/CV.jsx.
export const selectedProjectSlugs = [
  'remote-fitting-system',
  'ona',
  'archive-of-becoming',
]

export const technologies = ['CLO3D', 'TouchDesigner', 'Blender', 'Figma', 'React', 'JavaScript', 'Python', 'HTML/CSS']

export const additional = [
  '[Placeholder] Awards, talks, publications or other notes go here.',
]
