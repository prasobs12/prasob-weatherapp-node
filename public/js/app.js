
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Your weather Data'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    
    messageOne.textContent = 'Loading..........'
    messageTwo.textContent = ''
 
    
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            // console.log(data.error)
            messageOne.textContent = data.error
        } else{
            // console.log(data.place)
            // console.log(data.address)
            console.log(data.weather)
            messageOne.textContent = data.address
            messageTwo.textContent = 'the current temp is ' + data.weather.currentTemp +
            ' The temp feels like ' + data.weather.feltTemp + ' and the weather is ' + data.weather.weathDescp  
        }

        
    })
})
})


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })