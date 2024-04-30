import Styles from './sectionTitle.module.css'

export const SectionTitle = ({ children }: { children: React.ReactNode } ) => {
  return (
    <p className={Styles.sectionTitle}>{children}</p>
  )
}
