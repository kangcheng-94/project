document.getElementById("home").addEventListener("click", function () {
    document.getElementById("mainDiv").style.display = 'block';
    document.getElementById("genreDiv").style.display = 'none';
    document.getElementById("searchDiv").style.display = 'none';
    document.getElementById("detailDiv").style.display = 'none';
})

var types = ["Comedy", "Thriller", "Romance", "Drama", "Children", "Crime"]
for (let i = 0; i <= types.length - 1; i++) {
    getShows(types[i])
}
function getShows(Genres) {
    var http = new XMLHttpRequest();
    http.open("GET", "http://api.tvmaze.com/search/shows?q=" + Genres);
    http.send();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            //console.log("type of response:", typeof(JSON.parse(http.responseText)))
            console.log(JSON.parse(http.response));
            let tvShows = (JSON.parse(http.response));

            for (let i = 0; i <= 4; i++) { //since shows is sorted according to rating, just slice the array to review index 1-4 (top 5 shows)
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
                document.getElementById(Genres).appendChild(imgContainer)
            }
            var viewMore = document.createElement("span");
            viewMore.innerHTML = "Click here to view more";
            viewMore.addEventListener("click", function () {
                console.log("Genre::", Genres);
                console.log("Shows::", tvShows);
                showGenre(Genres, tvShows);
            })
            document.getElementById(Genres).appendChild(viewMore)
            console.log(document.getElementById(Genres));
        }
    }
}
function showGenre(G, S) {
    document.getElementById("mainDiv").style.display = 'none';
    document.getElementById("genreDiv").style.display = 'none';
    document.getElementById("detailDiv").style.display = 'none';
    document.getElementById("genreDiv").style.display = 'block';
    var genreTitle = document.createElement("h1");
    genreTitle.innerHTML = G;

    document.getElementById("genreDiv").appendChild(genreTitle)
    for (let i = 0; i <= S.length - 1; i++) {
        var tvShowList = document.createElement("div");
        tvShowList.innerHTML = "<b>Show name:</b> <br>" + S[i].show.name;
        var imgContainer = document.createElement("div");
        imgContainer.classList = "imgContainer"
        var showImg = document.createElement("img");
        if (S[i].show.image === null) {
            showImg.src = "https://dummyimage.com/210x295/ffffff&text=+++++++";;
        }
        else {
            showImg.src = S[i].show.image.medium;
        }
        var sRunTime = document.createElement("div");
        sRunTime.innerHTML = "<b>Show run time:</b> <br>" + S[i].show.runtime + " mins";

        var sScore = document.createElement("div");
        sScore.innerHTML = "<b>Show Score:</b> <br><i>" + S[i].score + " / 20</i>";

        var sLang = document.createElement("div");
        sLang.innerHTML = "<b>Show Language:</b> <br>" + S[i].show.language;

        var sPremier = document.createElement("div");
        sPremier.innerHTML = "<b>Show Premiered:</b> <br>" + S[i].show.premiered;

        sLang.appendChild(sPremier)
        sScore.appendChild(sLang)
        sRunTime.appendChild(sScore)
        tvShowList.appendChild(sRunTime)
        imgContainer.appendChild(showImg)
        imgContainer.appendChild(tvShowList)
        document.getElementById("genreDiv").appendChild(imgContainer)
    }
    function showDetails(Genres, tvShows) {
        window.location.href = tvShows[i].show.url;
    }
}
