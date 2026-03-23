const numberAmount = document.querySelector(".number-amount")
const years = document.querySelector(".years")
const procent = document.querySelector(".rate")

const currency = document.querySelector(".currency")
const yearText = document.querySelector(".years-text")
const procentText = document.querySelector(".procent")

const errorAmount = document.querySelector(".amount-block .error-text")
const errorYears = document.querySelector(".years-block .error-text")
const errorRate = document.querySelector(".rate-block .error-text")
const errorType = document.querySelector(".mortage-type .error-text")
const typeElements = document.querySelectorAll(".type-element")

const buttonReset = document.querySelector(".reset")
const buttonCalculate = document.querySelector(".button-calculate")

const resultRepayment = document.querySelector(".result-repayment")
const resultSumma = document.querySelector(".result-summa")

const resultBlock = document.querySelector(".your-result")
const result = document.querySelector(".result")


function getLoanType() {
    const selected = document.querySelector('input[name="loanType"]:checked')
    return selected ? selected.value : null
}

function getValues() {
    return {
    amount: Number(numberAmount.value),
    years: Number(years.value),
    rate: Number(procent.value),
    type: getLoanType()
}
}

buttonCalculate.addEventListener('click', () => {
    calculate()
})

buttonReset.addEventListener('click', () => {
    reset()
})

function validateField(value, inputElement, sideElement, errorElement) {
    if (value === 0) {
        inputElement.parentElement.style.border = "2px solid var(--Red)"
        sideElement.style.backgroundColor = "var(--Red)"
        sideElement.style.color = "white"
        errorElement.classList.add("active")
        return false
    } else {
        inputElement.parentElement.style.border = ""
        sideElement.style.backgroundColor = ""
        sideElement.style.color = ""
        errorElement.classList.remove("active")
        return true
    }
}

function validateType(type) {
    if (!type) {
        errorType.classList.add("active")
        return false
    } else {
        errorType.classList.remove("active")
        return true
    }
}

function calculate() {
    const data = getValues()

    const validAmount = validateField(data.amount, numberAmount, currency, errorAmount)
    const validYears = validateField(data.years, years, yearText, errorYears)
    const validRate = validateField(data.rate, procent, procentText, errorRate)
    const validType = validateType(data.type)

    if (!validAmount || !validYears || !validRate || !validType) return

    let monthlyPayment = 0
    let total = 0

    if (data.type === "repayment") {
        const monthlyRate = data.rate / 100 / 12
        const months = data.years * 12

        monthlyPayment =
            data.amount *
            (monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1)

        total = monthlyPayment * months
    }

    if (data.type === "interest") {
        monthlyPayment = (data.amount * (data.rate / 100)) / 12
        total = monthlyPayment * data.years * 12
    }

    resultRepayment.textContent = "£" + monthlyPayment.toFixed(2)
    resultSumma.textContent = "£" + total.toFixed(2)

    resultBlock.classList.add("active")
    result.classList.add("none")
}

function reset() {
    // 1. очистить input
    numberAmount.value = ""
    years.value = ""
    procent.value = ""

    // 2. сброс radio
    const radios = document.querySelectorAll('input[name="loanType"]')
    radios.forEach(radio => radio.checked = false)

    // 3. убрать ошибки
    errorAmount.classList.remove("active")
    errorYears.classList.remove("active")
    errorRate.classList.remove("active")
    errorType.classList.remove("active")

    // 4. убрать стили ошибок
    numberAmount.parentElement.style.border = ""
    years.parentElement.style.border = ""
    procent.parentElement.style.border = ""

    currency.style.backgroundColor = ""
    currency.style.color = ""

    yearText.style.backgroundColor = ""
    yearText.style.color = ""

    procentText.style.backgroundColor = ""
    procentText.style.color = ""

    // 5. сброс результата
    resultRepayment.textContent = "£0.00"
    resultSumma.textContent = "£0.00"

    // 6. вернуть стартовый экран
    resultBlock.classList.remove("active")
    result.classList.remove("none")
}