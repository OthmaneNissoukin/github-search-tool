
// DOM Elements

let myImage = document.querySelector(".user-avatar img")
let myUsername = document.querySelector(".user-avatar h3 a")
let myBio = document.querySelector(".bio")
let myReposCount = document.getElementById("reposCount")
let myFollowers = document.getElementById("followers")
let joinedDate = document.getElementById("joined")

// Onsubmit Form

document.forms[0].onsubmit = function() {
    let username = document.getElementById("username").value.replaceAll(" ", "")

    // Get Data
    let myRequest = new XMLHttpRequest()

    myRequest.open("GET", `https://api.github.com/users/${username}`, true)
    myRequest.send()

    myRequest.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        let myData = JSON.parse(this.responseText)

        myImage.setAttribute("src", myData["avatar_url"])
        myImage.style.display = "inline-block"
        myUsername.textContent = myData["login"]
        myUsername.setAttribute("href", myData["html_url"])
        myBio.textContent = myData["bio"]
        myReposCount.textContent = myData["public_repos"]
        myFollowers.textContent = myData["followers"]
        
        // Get Joined Date
        let datetime = new Date(myData["created_at"])
        let joinedAt = `${datetime.getDate()}-${datetime.getMonth()}-${datetime.getFullYear()}`
        
        joinedDate.textContent = joinedAt

        myBio.textContent == "" ? myBio.style.display = "none" : myBio.style.display = "block"

        
    } else if (this.status == 404) {
        myUsername.textContent = "User Not Found !!!"
        myImage.style.display = "none"
        myBio.style.display = "none"
        myReposCount.textContent = "0"
        myFollowers.textContent = "0"
        joinedDate.textContent = "- - - -"
    }
    
}

    // Prevent Refreshing The Page When Clicking Enter
    return false
}

