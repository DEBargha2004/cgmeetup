export function goToPreviousPage () {
  if (window.history.length > 1) {
    console.log(window.history.state)
    window.history.back()
  } else {
    window.location.href = '/'
  }
}
