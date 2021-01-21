import React, { useEffect, useState } from "react"
import classes from "./index.module.css"
import Add from "../Assets/Add.svg"
import Bookmark, { BookmarkT } from "../Components/Bookmark"
import { useQuery, useMutation } from "@apollo/client"
import { ADD_BOOKMARK, GET_BOOKMARKS } from "../Apollo/queries"
const Home = () => {
  const wrapperRef = React.createRef<HTMLDivElement>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [data, setData] = useState<BookmarkT[]>([
    { title: "Am", link: "http://fb.com" },
  ])
  const [title, setTitle] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [
    addBookmark,
    { loading: mutationLoading, data: mutationData, error: mutationError },
  ] = useMutation(ADD_BOOKMARK)

  const onTaskAddedHandler = () => {
    setModalOpen(false)
    addBookmark({ variables: { title, link } })
  }
  const tasks = data.map((val, i) => <Bookmark key={i} {...val} />)
  return (
    <>
      <div className={classes.header}>
        <h3>Bookmarking App</h3>
      </div>

      <div className={classes.root}>
        <div className={classes.tasks}>
          {tasks && tasks.length <= 0 ? (
            <p style={{ marginTop: "10%", textAlign: "center" }}>
              No Bookmarks To Show
            </p>
          ) : (
            tasks
          )}
        </div>
        <div className={classes.add} onClick={() => setModalOpen(true)}>
          <Add width={15} />
        </div>
      </div>
      <div
        style={{ display: modalOpen ? "flex" : "none" }}
        className={classes.modalWrapper}
        ref={wrapperRef}
        onClick={e => {
          wrapperRef.current === (e.target as Node) && setModalOpen(false)
        }}
      >
        <div className={classes.modal}>
          <h4>Tilte</h4>
          <input
            placeholder="Click To Add Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
          ></input>
          <input
            placeholder="Click To Add Link"
            value={link}
            onChange={e => setLink(e.target.value)}
            type="text"
          ></input>
          <button className={classes.add} onClick={() => onTaskAddedHandler()}>
            <Add width={15} />
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
