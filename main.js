function userData(result) {
  // Formatting Joined Date
  let joinedAt = new Date(result["created_at"]);
  let joinedFormat = `${joinedAt.getDate()}/${
    joinedAt.getMonth() + 1
  }/${joinedAt.getFullYear()}`;

  // Adding User Data To HTML Document
  document.getElementById("userlink").innerText = result["login"];
  document.getElementById("userlink").setAttribute("href", result["html_url"]);
  document.querySelector(".user-avatar img").src = result["avatar_url"];
  document.querySelector(".bio").innerText = result["bio"];
  document.getElementById("reposCount").innerText = result["public_repos"];
  document.getElementById("followers").innerText = result["followers"];
  document.getElementById("joined").innerText = joinedFormat;
}

function errorStyle() {
  // Reset HTML User Data In Case Of Error
  document.getElementById("userlink").innerText = "User Not Found!";
  document.querySelector(".user-avatar img").src = "";
  document.querySelector(".bio").innerText = "";
  document.getElementById("reposCount").innerText = "----";
  document.getElementById("followers").innerText = "----";
  document.getElementById("joined").innerText = "-----";
}

document.forms[0].onsubmit = function (e) {
  e.preventDefault();
  let username = document
    .getElementById("username")
    .value.trim()
    .replaceAll(" ", "");
  getData(username);
};

async function getData(username) {
  try {
    let url = `https://api.github.com/users/${username}`;
    let response = await fetch(url);
    let result = await response.json();

    if (response["status"] >= 200 && response["status"] <= 299) {
      userData(result);
    } else {
      throw new Error();
    }
  } catch (err) {
    errorStyle();
  }
}
