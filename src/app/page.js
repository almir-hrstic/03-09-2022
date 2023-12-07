'use client'

import styles from './styles/page.module.scss'
import { debounce } from './helpers'
import { useState, useRef, useEffect } from 'react'

export default function Page() {

  const [data, setData] = useState()
  const [activeImage, setActiveImage] = useState(0)
  const [primaryCounter, setPrimaryCounter] = useState()
  const [secondaryCounter, setSecondaryCounter] = useState()

  const root = useRef()
  const audio = useRef()

  const imageCount = parseInt(process.env.IMAGE_COUNT)
  let imagesInterval = null

  const setScreenHeight = () => root.current.style.setProperty('--screen-height', `${Math.floor(window.innerHeight)}px`)

  const getData = () => {

    fetch(`${process.env.BASE_URL}/data.json`).then(response => response.json()).then(response => setData(response))
  }

  const getImages = () => {

    if (imageCount > 1) {

      imagesInterval = setInterval(() => setActiveImage(image => image < imageCount - 1 ? image + 1 : 0), 5000)
    }
  }

  const getCounter = (date) => {

    return `${Math.floor((new Date().getTime() - new Date(`${date} GMT+0100`).getTime()) / (1000 * 60 * 60 * 24))}`
  }

  useEffect(() => {

    setScreenHeight()
    window.addEventListener('resize', debounce(() => setScreenHeight()))

    getData()
    getImages()

    return () => clearInterval(imagesInterval)

  }, [])

  useEffect(() => {

    if (data) {

      setPrimaryCounter(getCounter(data.dates.primary))
      setSecondaryCounter(getCounter(data.dates.secondary))
    }

  }, [data])

  return (

    <div className={styles.root} ref={root}>

      <audio src={`${process.env.BASE_URL}/background.mp3`} ref={audio} loop>

      </audio>

      {

        [...Array(imageCount)].map((image, index) => (

          <img src={`${process.env.BASE_URL}/images/${index}.jpg`} className={index !== activeImage ? styles.image : `${styles.image} ${styles.image____active}`} key={index} />
        ))

      }

      {

        data &&

        <div className={styles.root__container}>

          <button className={styles.counters} onClick={() => audio.current.play()}>

            <p>
              {primaryCounter}
            </p>

            <p className={styles.counters__secondary}>
              {secondaryCounter}
            </p>

          </button>

        </div>

      }

    </div>
  )
}
