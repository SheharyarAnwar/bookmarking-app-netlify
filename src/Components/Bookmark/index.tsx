import React from "react"
import classes from "./index.module.css"
export interface BookmarkT {
  title: string
  link: string
}
const Index: React.FC<BookmarkT> = ({ title, link }) => {
  const beforeRef = React.createRef<HTMLSpanElement>()
  const afterRef = React.createRef<HTMLSpanElement>()

  return (
    <div className={classes.root}>
      <p>{title}</p>

      <a className={classes.check} href={link} target="__blank">
        <span className={classes.before} ref={beforeRef} />
        <span className={classes.after} ref={afterRef} />
      </a>
    </div>
  )
}

export default Index
