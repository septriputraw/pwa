const baseUrl = "https://api.football-data.org/v2";
const token = "6acd4debffc449c7a96ed6b6a1f72120";
$(document).ready(() => {
  $(".preloader-wrapper").fadeOut(3000);
});
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
//ambil data Matches
function getMatches() {
  if ('caches' in window) {
    caches.match(`${baseUrl}/competitions/2021/matches?status=SCHEDULED`).then((response) => {
        if (response) {
          response.json().then((data) => {
            let matchesHTML = "";
            data.matches.forEach((match) => {
                matchesHTML += `
                <div class="card">
                  <div class="card-content">
                    <span class="card-title truncate">${match.group}</span>
                    <p>${match.status}</p>
                    <h5><a href="./team.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a> VS <a href="./team.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a></h5>
                  </div>
                </div>
              `;
              });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = matchesHTML;
          });
        }
      }
    )
  }
  fetch(`${baseUrl}/competitions/2021/matches?status=SCHEDULED`,{
    method: "GET",
    headers: {
      "X-Auth-Token": `${token}`
    }
  })
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel match secara dinamis
      let matchesHTML = "";
      data.matches.forEach((match) => {
        matchesHTML += `
          <div class="card">
            <div class="card-content">
                <span class="card-title truncate">${match.group}</span>
                <p>${match.status}</p>
                <h5><a href="./team.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a> VS <a href="./team.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a></h5>
              </a>
            </div>
          </div>
        `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = matchesHTML;
    })
    .catch(error);
}

//ambil data team berdasarkan ID
function getTeamById() {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    if ("caches" in window) {
      caches.match(`${baseUrl}/teams/${idParam}`).then((response) => {
        if (response) {
          response.json().then((data) => {
            // .... kode lain disembunyikan agar lebih ringkas
            let teamHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl}" alt="${data.name}"/>
                </div>
                <div class="card-content">
                  <span class="card-title">${data.name}</span>
                  <p>Address: ${data.address}</p>
                  <p>Phone: ${data.phone}</p>
                  <p>Website: ${data.website}</p>
                  <p>Email: ${data.email}</p>
                  <p>Base: ${data.venue}</p>
                </div>
              </div>
            `;
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(`${baseUrl}/teams/${idParam}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": `${token}`
      }
    })
      .then(status)
      .then(json)
      .then((data) => {
        // ... kode lain disembunyikan agar lebih ringkas 
        // Objek JavaScript dari response.json() masuk lewat letiabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let teamHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="responsive-img" src="${data.crestUrl}" alt="img ${data.name}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <p>Address: ${data.address}</p>
              <p>Phone: ${data.phone}</p>
              <p>Website: ${data.website}</p>
              <p>Email: ${data.email}</p>
              <p>Base: ${data.venue}</p>
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      })
      .catch(error);
  });
}

//ambil data team berdasarkan ID
function getPlayersById() {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(`${baseUrl}/players/${idParam}`).then((response) => {
        if (response) {
            response.json().then((data) => {
              // .... kode lain disembunyikan agar lebih ringkas
              let playerHTML = `
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">${data.name}</span>
                    <p>First Name: ${data.firstName}</p>
                    <p>Last Name: ${data.lastName}</p>
                    <p>Date of Birth: ${data.dateOfBirth}</p>
                    <p>Nasionality: ${data.nationality}</p>
                    <p>Position: ${data.position}</p>
                  </div>
                </div>
              `;
              document.getElementById("body-content").innerHTML = playerHTML;
              // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
              resolve(data);
            });
        }
      });
    }
    fetch(`${baseUrl}/players/${idParam}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": `${token}`
      }
    })
      .then(status)
      .then(json)
      .then((data) => { 
        // Objek JavaScript dari response.json() masuk lewat letiabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let playerHTML = `
          <div class="card">
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <p>First Name: ${data.firstName}</p>
              <p>Last Name: ${data.lastName}</p>
              <p>Date of Birth: ${data.dateOfBirth}</p>
              <p>Nasionality: ${data.nationality}</p>
              <p>Position: ${data.position}</p>
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = playerHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      })
      .catch(error);
  });
}

//ambil data top scorers
function getScorers() {
  if ('caches' in window) {
    caches.match(`${baseUrl}/competitions/2021/scorers?limit=10`).then((response) => {
      if (response) {
        response.json().then((data) => {
            let scorersHTML = "";
            data.scorers.forEach((scorer) => {
              scorersHTML += `
                <div class="card">
                  <div class="card-content">
                    <span class="card-title truncate"><a href="./team.html?id=${scorer.team.id}">${scorer.team.name}</a></span>
                    <h2><a href="./player.html?id=${scorer.player.id}">${scorer.player.name}</a></h2>
                    <h3>${scorer.player.position}</h3>
                    <h4>Goals: ${scorer.numberOfGoals}</h4>
                    <h5>Last Updated: ${scorer.player.lastUpdated}</h5>
                  </div>
                </div>
              `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = scorersHTML;
        });
      }
    })
  }
  fetch(`${baseUrl}/competitions/2021/scorers?limit=10`,{
    method: "GET",
    headers: {
      "X-Auth-Token": `${token}`
    }
  })
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel match secara dinamis
      let scorersHTML = "";
      data.scorers.forEach((scorer) => {
          scorersHTML += `
            <div class="card">
              <div class="card-content">
                <span class="card-title truncate"><a href="./team.html?id=${scorer.team.id}">${scorer.team.name}</a></span>
                <h2><a href="./player.html?id=${scorer.player.id}">${scorer.player.name}</a></h2>
                <h3>${scorer.player.position}</h3>
                <h4>Goals: ${scorer.numberOfGoals}</h4>
                <h5>Last Updated: ${scorer.player.lastUpdated}</h5>
              </div>
            </div>
          `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = scorersHTML;
    })
    .catch(error);
}

function getSavedArticles() {
    getAll().then((articles) => {
        console.log(articles);
        // Menyusun komponen card artikel secara dinamis
        let articlesHTML = "";
        articles.forEach((article) => {
            articlesHTML += `
              <div class="card">
                <a href="./team.html?id=${article.id}&saved=true">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img class="responsive-img" src="${article.crestUrl}" />
                    </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.name}</span>
                </div>
              </div>
            `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("body-content").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getSavedArticleById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    getById(idParam).then((article) => {
        articleHTML = '';
        let articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="responsive-img" src="${article.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title">${article.name}</span>
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
    })
    .catch(error);
}