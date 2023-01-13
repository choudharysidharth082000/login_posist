console.log("Hello world");

const logoutButton = document.getElementById("logout");
const banner = document.getElementById("containorBackdrop");
const bannerHeader = document.getElementById("headerWelcome");
const bannerDescription = document.getElementById("bannerDiscription");
const containorShows = document.getElementById("containorShows");
const containorShowsAction = document.getElementById("containorShowsAction");
const logout1 = document.getElementById("logout1");
const sidebar = document.getElementById("sidebar");
const close = document.getElementById("iconClose");
const showMore = document.getElementById("showMore");
const containorClicked = document.getElementById("containorClicked");
const containorShowsAction1 = document.getElementById("containorShowsAction1");
const cardMovieContent = document.getElementById("cardMovieContent");
const cardMovieContentHeader = document.getElementById(
  "cardMovieContentHeader"
);
const iframe = document.getElementById("iframe");
console.log("This is the iframe", iframe);
console.log(bannerHeader);

logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.style.width = "575px";
  //   window.localStorage.removeItem("token");
  //   window.location.href = "/src/pages/login.html";
});
logout1.addEventListener("click", (e) => {
  e.preventDefault();
  window.localStorage.removeItem("token");
  window.location.href = "/src/pages/login.html";
});
iconClose.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Hello world");
  sidebar.style.width = "0px";
});

//string truncate method
const truncate = (string, n) => {
  return string?.length > n ? string.substr(0, n - 1) + " ..." : string;
};

window.addEventListener("load", (event) => {
  console.log("Loader Started");
  if (
    window.location.pathname == "/src/pages/home.html" &&
    window.localStorage.getItem("token") == null
  ) {
    window.location.href = "/src/pages/login.html";
  }

  //getitng the result from the api
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=94f9f5533f279def2c111bf737c3e9a9";
  const getData = fetch(url);
  getData
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.results);
      //adding the background image to the the containor div
      const randomNumber = Math.floor(Math.random() * data.results.length - 1);
      banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.results[randomNumber].backdrop_path})`;
      //changing the content in the benner Header
      bannerHeader.innerHTML = data.results[randomNumber].title;
      bannerDescription.innerHTML = truncate(
        data.results[randomNumber].overview,
        150
      );

      //creating the cards
      data.results.forEach((movie) => {
        const card = document.createElement("div");
        card.classList.add("containorPoster");
        card.classList.add("max-height-poster");
        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="card-img-top" alt="...">
            `;
        containorShows.appendChild(card);
        console.log("loader Terned Off");
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  //action url
  const actionURL =
    " https://api.themoviedb.org/3/discover/movie?api_key=94f9f5533f279def2c111bf737c3e9a9&with_genres=27";
  const getActionData = fetch(actionURL);
  getActionData
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.results);
      //creating the cards
      data.results.forEach((movie) => {
        const card = document.createElement("div");
        // adding the id to the card
        card.setAttribute("id", movie.id);
        card.classList.add("containorPoster");
        card.classList.add("max-height-poster");
        card.innerHTML = `
                <img onclick="clickedImage(this)" id="${movie.id}#@@${movie.overview}#@@${movie.original_title}" src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="card-img-top" alt="...">
                `;
        containorShowsAction.appendChild(card);
      });
    });
});
const clickedImage = (item) => {
  // getting the id from the attribute
  const id = item.getAttribute("id");
  console.log(id);
  console.log(id.split("#@@")[0]);
  //getting the overview from the attribute
  const overview = item.getAttribute("id").split("#@@")[1];
  const title = item.getAttribute("id").split("#@@")[2];
  containorClicked.style.display = "flex";
  containorClicked.style.justifyContent = "center";
  containorClicked.style.alignItems = "center";
  containorClicked.style.flexDirection = "column";

  cardMovieContentHeader.innerHTML = title;
  cardMovieContent.innerHTML = overview;

  //fetching the video for the content
  const videoURL = `https://api.themoviedb.org/3/movie/${
    id.split("#@@")[0]
  }/videos?api_key=94f9f5533f279def2c111bf737c3e9a9&append_to_response=videos`;
  const iFrameURL = "https://www.youtube.com/embed";

  const promise = fetch(videoURL);
  promise
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("This is the video", data);
      console.log(data.results[0].key);
      const videoKey = data.results[0].key;
      const videoURL = iFrameURL + "/" + videoKey + "?start=2&autoplay";
      console.log("The Video url is : ", videoURL);
      iframe.src = videoURL;
      console.log(iframe);
    });

  //calling for fetching data
  const actionURL =
    " https://api.themoviedb.org/3/discover/movie?api_key=94f9f5533f279def2c111bf737c3e9a9&with_genres=27";
  const getActionData = fetch(actionURL);
  getActionData
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.results);
      data.results.forEach((movie) => {
        const card = document.createElement("div");
        // adding the id to the card
        card.setAttribute("id", movie.id);
        card.classList.add("containorPoster");
        card.classList.add("max-height-poster");
        card.innerHTML = `
                <img onclick="clickedImage(this)" id=${movie.id} src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="card-img-top" alt="...">
                `;
        containorShowsAction1.appendChild(card);
      });
    });
};
