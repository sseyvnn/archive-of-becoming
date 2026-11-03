/**
 * ARCHIVE OF BECOMING — site-wide identity + about/contact content.
 *
 * Central place for the handful of facts repeated across About, CV and
 * Contact. Nothing here is invented: anything not already established in
 * the brief is left as an explicit, clearly-labeled placeholder rather
 * than a guessed value — replace those directly.
 */

export const identity = {
  name: 'SEYVN',
  archiveName: 'Archive of Becoming',
  role: 'Creative Technologist',
  location: 'Columbus, OH',
  availability: 'Available for relocation / New York opportunities',
}

export const aboutContent = {
  statement:
    'I work between fashion and technology, building digital tools, interactive systems and experiences that explore how fashion can exist beyond the physical garment.',
  archiveStatement:
    'An evolving record of projects, experiments and research documenting the process of becoming SEYVN.',
  practice: [
    'Creative Technology',
    'Fashion Technology',
    'Interactive Media',
    '3D Experiences',
    'Digital Retail',
  ],
  education: ['Computer Science', 'Cybersecurity'],
  currentlyExploring: [
    'Digital Garments',
    'Remote Fitting',
    'Fashion Archives',
    'Interactive Retail',
    'Human-Computer Interaction',
  ],
  tools: ['CLO3D', 'TouchDesigner', 'Blender', 'Figma', 'React', 'JavaScript', 'Python', 'HTML/CSS'],
}

// Placeholder image — swap for a real portrait at src/assets/about-portrait.*
// and update the import in pages/About.jsx.
export const portraitPlaceholder = {
  alt: '[Placeholder] Portrait — replace src/assets/about-portrait with a real image.',
}

export const contactContent = {
  openTo: [
    'Creative Technology',
    'Fashion Technology',
    'Digital Experience',
    'Interactive Media',
    'Collaborations',
    'Internships',
  ],
  channels: [
    // href: null means "no real link yet" — rendered as plain, clearly
    // placeholder text rather than an invented, clickable handle.
    { label: 'Email', value: 'placeholder@email.com', href: null },
    { label: 'Instagram', value: '@placeholder', href: null },
    { label: 'LinkedIn', value: 'placeholder', href: null },
  ],
}
