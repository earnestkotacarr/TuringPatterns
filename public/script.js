console.log("I LOADED")
 
axios.get("/api")
.then(function(response) {
    console.log(response.data)
    let modelList = document.getElementById("models")
    response.data.forEach(function(model) {
        let newItem = document.createElement('li')
        newItem.innerHTML = model
        modelList.appendChild(newItem)
    })
})
