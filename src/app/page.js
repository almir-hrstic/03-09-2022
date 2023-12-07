'use client'

import styles from './styles/page.module.scss'
import { debounce } from './helpers'
import { useState, useRef, useEffect } from 'react'

export default function Page() {

  const [activeImage, setActiveImage] = useState(0)

  const root = useRef()
  const audio = useRef()

  const imageCount = parseInt(process.env.IMAGE_COUNT)
  let imagesInterval = null

  const setScreenHeight = () => root.current.style.setProperty('--screen-height', `${Math.floor(window.innerHeight)}px`)

  const getImages = () => {

    if (imageCount > 1) {

      imagesInterval = setInterval(() => {

        setActiveImage(image => image < imageCount - 1 ? image + 1 : 0)

      }, parseInt(audio.current.duration / imageCount) * 1000)
    }
  }

  const getCounter = (date) => {

    return `${Math.floor((new Date().getTime() - new Date(`${date} GMT+0100`).getTime()) / (1000 * 60 * 60 * 24))}`
  }

  const setActive = () => {

    root.current.classList.add(styles.root____active)
    audio.current.play()

    getImages()
  }

  useEffect(() => {

    setScreenHeight()
    window.addEventListener('resize', debounce(() => setScreenHeight()))

    return () => clearInterval(imagesInterval)

  }, [])

  return (

    <div className={styles.root} ref={root}>

      <audio src={`${process.env.BASE_URL}/background.mp3`} ref={audio} loop />

      {

        [...Array(imageCount)].map((image, index) => (

          <img src={`${process.env.BASE_URL}/images/${index}.jpg`} className={index !== activeImage ? styles.image : `${styles.image} ${styles.image____active}`} key={index} loading={imageCount > 3 ? activeImage + 2 >= index ? 'eager' : 'lazy' : 'eager'} />
        ))

      }

      <div className={styles.root__container}>

        <button className={styles.counters} onClick={() => setActive()}>

          <p>
            {getCounter('Sep 03, 2022')}
          </p>

          <p className={styles.counters__secondary}>
            {getCounter('Dec 27, 2018')}
          </p>

        </button>

      </div>

    </div>
  )
}
