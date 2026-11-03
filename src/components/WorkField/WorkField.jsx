import { workField } from '../../data/workField'
import WorkFieldItem from './WorkFieldItem'
import './WorkField.css'

/**
 * The landing page's primary visual: an asymmetrical, editorial field of
 * 16:9 thumbnails, each with a small label. The composition is authored
 * entirely in data/workField.js — this component only maps it.
 */
export default function WorkField() {
  return (
    <section className="work-field" aria-label="Selected work">
      {workField.map((item) => (
        <WorkFieldItem key={item.id} item={item} />
      ))}
    </section>
  )
}
