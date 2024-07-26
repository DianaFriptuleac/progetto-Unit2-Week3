const getFetch = function () {
    const URL = 'https://striveschool-api.herokuapp.com/api/product/'
    fetch(URL, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjJlYWYyNjBjYzAwMTVjYzBkZWUiLCJpYXQiOjE3MjE5ODM3MjIsImV4cCI6MTcyMzE5MzMyMn0.wgLHM4z__wtE5otPHelZKEoUCU_JGIT5EnVJF6j3bHs"
        }
    })
    .then((response) => {
        console.log(response)
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Errore nella chiamata')
        }
    })
    .then((arrayElements) => {
        console.log('Wine Elements', arrayElements)

        arrayElements.forEach((wine) => {
            const newProduct = `
                <div class="col">
                    <div class="card">
                        <img
                            src="${wine.imageUrl || 'https://uninuoro.it/wp-content/uploads/2018/08/aditya-chinchure-494048-unsplash.jpg'}
                            class="card-img-top"
                            alt="wine pic"
                        />
                        <div class="card-body text-center">
                            <h5 class="card-title title-overflow">${wine.name}</h5>
                            <p class="card-text"></p>
                            <p class="card-text">${wine.brand}</p>
                            <a href="details.html?wineId=${wine._id}" class="btn btn-primary w-100">Vai ai dettagli</a>
                        </div>
                    </div>
                </div>
            `
            
            const wineCard = document.getElementById('wineCard')
            wineCard.innerHTML = wineCard.innerHTML + newProduct
        })
    })
    .catch((error) => {
        console.error('Errore:', error)
    })
}

getFetch()


