const form = document.querySelector("form")

const timesInput = document.getElementById("number")
const fromInput = document.getElementById("from")
const toInput = document.getElementById("to")
const noRepeatCheckbox = document.getElementById("noRepeat")

form.onsubmit = (event) => {
  event.preventDefault()

  const times = Number(timesInput.value)
  const from = Number(fromInput.value)
  const to = Number(toInput.value)
  const noRepeat = noRepeatCheckbox.checked

  const result = drawer(times, from, to, noRepeat)

  const rafflingContainer = document.querySelector(".raffling")
  rafflingContainer.classList.add("hide")

  const drawnContainer = document.querySelector(".drawn")
  drawnContainer.classList.remove("hide")

  const button = document.querySelector("button")
  button.classList.add("hide")
  button.innerHTML = `Sortear novamente <img src="./assets/icons/arrow-return.svg" />`

  const resultsContainer = document.querySelector(".results")
  resultsContainer.innerHTML = ""

  displayNumbersWithDelay(result)
}

function drawer(times, from, to, noRepeat) {
  if (to - from + 1 < times && noRepeat) {
    alert("Intervalo insuficiente para a quantidade de números solicitados.")

    throw new Error(
      "Intervalo insuficiente para a quantidade de números solicitados."
    )
  }

  const drawnNumbers = noRepeat ? new Set() : []

  while (noRepeat ? drawnNumbers.size < times : drawnNumbers.length < times) {
    const drawnNumber = randomRange(from, to)

    if (noRepeat) {
      drawnNumbers.add(drawnNumber)
    } else {
      drawnNumbers.push(drawnNumber)
    }
  }

  return noRepeat ? Array.from(drawnNumbers) : drawnNumbers
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function displayNumbersWithDelay(numbers) {
  const resultsContainer = document.querySelector(".results")
  const button = document.querySelector("button")

  numbers.forEach((numero, index) => {
    setTimeout(() => {
      const numberContainer = document.createElement("div")
      numberContainer.className = "container-number"
      numberContainer.innerHTML = `<span>${numero}</span>`
      resultsContainer.appendChild(numberContainer)

      if (index === numbers.length - 1) {
        button.classList.remove("hide")
      }
    }, index * 4000)
  })
}
