const getweather = (location) => {
    messageOne.textContent = "Loading..."
    messageTwo.innerHTML = ""
    fetch('/weather?address=' + location).then((response) => {

        response.json().then(({ error, location, forecastData } = {}) => {

            if (error) {
                messageOne.innerHTML = "<span style = 'color:red'>Error</span>"
                messageTwo.innerHTML = "<span style = 'color:red'>" + error + "</span>"
                return
            }
            messageOne.innerHTML = "<span style = 'color:green'>" + location + "</span>"
            messageTwo.innerHTML = "<span style = 'color:green'>" + forecastData + "</span>"
        })
    })
}

const weatherForm = document.querySelector('form')
const searchForm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()   // to prevent form from refreshing page

    getweather(searchForm.value)

})