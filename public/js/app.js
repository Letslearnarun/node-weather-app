console.log('client side javascript file loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = messageTwo.textContent = ''
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading..'

    const location = searchElement.value
    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
    response.json().then((data)=>{
        if(data.error) {
            messageOne.textContent = messageTwo.textContent = ''
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = messageTwo.textContent = ''
            messageOne.textContent = 'Place: ' + data.location
            messageTwo.textContent = 'Temperature: ' + data.Temperature + ' ' 
                + 'Feels Like: ' + data.feelslike
        }
    })
})
})