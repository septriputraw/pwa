var dbPromised = idb.open("footballq", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", { unique: false });
});

function checkData(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
          var tx = db.transaction("articles", "readonly");
          var store = tx.objectStore("articles");
          return store.get(id);
        })
      .then((article) => {
        if (article !== undefined){
          resolve("Saved")
        } else{
          reject("not saved")
        }
          
        });
  });
}
function saveForLater(article) {
  dbPromised
      .then(function(db) {
        var tx = db.transaction("articles", "readwrite");
        var store = tx.objectStore("articles");
        console.log(article);
        store.add(article);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
        document.getElementById("saveDel").innerHTML = "favorite"
        M.toast({
          html: 'Artikel berhasil di simpan'
        });
      });
}
function getById(id) {
  return new Promise((resolve, reject) => {
      dbPromised
        .then((db) => {
            var tx = db.transaction("articles", "readonly");
            var store = tx.objectStore("articles");
            return store.get(id);
          })
        .then((article) => {
            resolve(article);
          });
    });
}
//fungsi hapus data
function delById(id) {
  return new Promise((resolve, reject) => {
      dbPromised
        .then((db) => {
            var tx = db.transaction("articles", "readwrite");
            var store = tx.objectStore("articles");
            store.delete(id);
            console.log(id);
            return tx.complete;
          })
          .then(function() {
            console.log("Artikel berhasil di Hapus.");
            document.getElementById("saveDel").innerHTML = "save"
            M.toast({
              html: 'Artikel telah dihapus!'
            });
          }).catch(()=>{
            M.toast({
              html: 'error'
            });
          });
    });
}
function getAll() {
  return new Promise((resolve, reject) => {
          dbPromised
              .then((db) => {
                      var tx = db.transaction("articles", "readonly");
                      var store = tx.objectStore("articles");
                      return store.getAll();
                  })
              .then((articles) => {
                      resolve(articles);
                  });
      });
}