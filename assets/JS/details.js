document.addEventListener('DOMContentLoaded', () => {
    const wineId = new URLSearchParams(window.location.search).get('wineId')
    console.log('wineId', wineId);

    const wineURL = 'https://striveschool-api.herokuapp.com/api/product/'

        fetch(wineURL + wineId, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjJlYWYyNjBjYzAwMTVjYzBkZWUiLCJpYXQiOjE3MjE5ODM3MjIsImV4cCI6MTcyMzE5MzMyMn0.wgLHM4z__wtE5otPHelZKEoUCU_JGIT5EnVJF6j3bHs"
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Errore nella chiamata')
            }
        })
        .then((wineData) => {
            console.log('Wine Data', wineData)

            const detailWine = document.getElementById('detailWine')
            detailWine.innerHTML = `
                <div class="col-12 col-md-8 text-center">
                    <div class="card pb-4">
                        <img src="${wineData.imageUrl || 'https://uninuoro.it/wp-content/uploads/2018/08/aditya-chinchure-494048-unsplash.jpg'}" alt="${wineData.name}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${wineData.name}</h5>
                            <p class="card-text">${wineData.description}</p>
                            <p class="card-text">${wineData.brand}</p>
                            <a href="#" class="btn btn-primary">${wineData.price}€ COMPRA</a>
                        </div>
                        <div class="border border-danger border-2 fit-content mx-auto p-3">
                            <h3>TASTI ADMIN</h3>
                            <div>
                                <a href="back-office.html?wineId=${wineData._id}" class="btn btn-warning">MODIFICA</a>
                                <button class="btn btn-danger" onclick="deleteWine()">ELIMINA</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
        .catch((error) => {
            console.error('Errore:', error)
        })
        window.deleteWine = function () {
            if(wineId){
            fetch(wineURL + wineId, {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjJlYWYyNjBjYzAwMTVjYzBkZWUiLCJpYXQiOjE3MjE5ODM3MjIsImV4cCI6MTcyMzE5MzMyMn0.wgLHM4z__wtE5otPHelZKEoUCU_JGIT5EnVJF6j3bHs"
                },
                method: 'DELETE',
            }) 
              .then((response) => {
                if (response.ok) { 

                  alert('Prodotto eliminato')
                  location.assign('index.html')
                } else {
                  throw new Error("Problema nell'eliminazione")
                }
              })
              .catch((err) => {
                console.log('error', err)
              })
          }
    }})
