'use client'

import styles from './styles/page.module.scss'
import Zoom from './icons/zoom'
import { debounce } from './helpers'
import { useState, useRef, useEffect } from 'react'

export default function Page() {

  const [activeImage, setActiveImage] = useState(0)

  const root = useRef()
  const audio = useRef()

  const imageCount = parseInt(process.env.IMAGE_COUNT)

  let imageInterval = null

  const setScreenHeight = () => root.current.style.setProperty('--screen-height', `${Math.floor(window.innerHeight)}px`)

  const setImages = () => {

    if (imageCount > 1) {

      imageInterval = setInterval(() => {

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

    setImages()
  }

  useEffect(() => {

    setScreenHeight()
    window.addEventListener('resize', debounce(() => setScreenHeight()))

    return () => clearInterval(imageInterval)

  }, [])

  return (

    <div className={styles.root} ref={root}>

      <audio src={`${process.env.BASE_URL}/background.mp3`} loop={true} ref={audio} />

      {

        new Array(imageCount).fill().map((image, index) => (

          <img src={`${process.env.BASE_URL}/images/${index}.jpg`} className={index !== activeImage ? styles.image : `${styles.image} ${styles.image____active}`} width="100%" height="100%" loading={activeImage + 2 >= index ? null : 'lazy'} key={index} />
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

      <Zoom setZoom={() => root.current.classList.toggle(styles.root____zoom)} />

    </div>
  )
}
