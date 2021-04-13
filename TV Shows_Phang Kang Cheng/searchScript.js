document.getElementById("home").addEventListener("click", function () {
    document.getElementById("mainDiv").style.display = 'block';
    document.getElementById("genreDiv").style.display = 'none';
    document.getElementById("searchDiv").style.display = 'none';
    document.getElementById("detailDiv").style.display = 'none';
})

function searchShow(event) {
    event.preventDefault();
    var input = document.getElementById("searchInput").value;

    console.log(input);
    showOutput(input);
}

function showOutput(names) {
    document.getElementById("searchDiv").innerHTML = "";

    var searchResult = document.createElement("h1");
    searchResult.innerHTML = "These are the shows what you have searched for "
    document.getElementById("searchDiv").appendChild(searchResult)

    document.getElementById("mainDiv").style.display = 'none';
    document.getElementById("genreDiv").style.display = 'none';
    document.getElementById("detailDiv").style.display = 'none';
    document.getElementById("searchDiv").style.display = 'block';
    console.log(document.getElementById("searchDiv").style.display);

    var http = new XMLHttpRequest();
    http.open("GET", "http://api.tvmaze.com/search/shows?q=" + names);
    http.send();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            //console.log("type of response:", typeof(JSON.parse(http.responseText)))
            console.log(JSON.parse(http.response));
            let tvShows = (JSON.parse(http.response));

            for (let i = 0; i <= 9; i++) {
                var showName = document.createElement("div");
                showName.innerHTML = "<b>Show name:</b> <br>" + tvShows[i].show.name;
                var imgContainer = document.createElement("div");
                imgContainer.classList = "imgContainer"

                var showImg = document.createElement("img");
                if (tvShows[i].show.image === null) {
                    showImg.src = "https://dummyimage.com/210x295/ffffff&text=+++++++";
                }
                else {
                    showImg.src = tvShows[i].show.image.medium;
                }

                var showRunTime = document.createElement("div");
                showRunTime.innerHTML = "<b>Show run time:</b> <br>" + tvShows[i].show.runtime + " mins";

                var showScore = document.createElement("div");
                showScore.innerHTML = "<b>Show Score:</b> <br><i>" + tvShows[i].score + " / 20</i>";

                var showLang = document.createElement("div");
                showLang.innerHTML = "<b>Show Language:</b> <br>" + tvShows[i].show.language;

                var showPremier = document.createElement("div");
                showPremier.innerHTML = "<b>Show Premiered:</b> <br>" + tvShows[i].show.premiered;

                showLang.appendChild(showPremier)
                showScore.appendChild(showLang)
                showRunTime.appendChild(showScore)
                showName.appendChild(showRunTime)
                imgContainer.appendChild(showImg)
                imgContainer.appendChild(showName)
                document.getElementById("searchDiv").appendChild(imgContainer)
            }
        }
    }
}


