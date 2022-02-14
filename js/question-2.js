



const url = "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=";
const key = "428b5a18b8b24043981eee7f06b97c23";

let uri = url + key;

getData(uri)
  .then(data => {
    doStuffWithData(data.results);
  })
  .catch(error => {
    console.error(error);
  });


function getData(uri) {
  let loadingMessage = document.createElement("h2");
  loadingMessage.innerHTML = "Loading...";
  document.body.appendChild(loadingMessage);
  return new Promise(async (res, rej) => {
    let response = await fetch(uri);
    let data = await response.json();
    loadingMessage.innerHTML = `Games 8/${data.results.length}`;
    if (!data || (typeof data === "undefined")) rej("No data found.");
    res(data);
  });
}

function doStuffWithData(data) {
  let ul = document.createElement("ul");
  for (let i = 0; i < 8; i++) {
    let value = data[i];
    let li = document.createElement("li");
    li.innerHTML = processData(value);
    ul.appendChild(li);
  }
  document.body.appendChild(ul);
}

function processData(data) {
  return `${data.name}:<br> Rating ☆ ${Math.round(data.rating * 10) / 10}/5 <br> Amount of Tags: ${data.tags.length} <br>&nbsp`;
}