/* Debounce */

const debounce = (callback, timeout = 1000) => {

  let trigger

  return () => {

    clearTimeout(trigger)
    trigger = setTimeout(() => callback(), timeout)
  }
}

export { debounce }
