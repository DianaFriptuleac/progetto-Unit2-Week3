document.addEventListener('DOMContentLoaded', () => {
    const wineId = new URLSearchParams(window.location.search).get('wineId')
    console.log('wineId:', wineId)

    const urlOfWine = 'https://striveschool-api.herokuapp.com/api/product/'

    if (wineId) {
        fetch(urlOfWine + wineId, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjJlYWYyNjBjYzAwMTVjYzBkZWUiLCJpYXQiOjE3MjE5ODM3MjIsImV4cCI6MTcyMzE5MzMyMn0.wgLHM4z__wtE5otPHelZKEoUCU_JGIT5EnVJF6j3bHs"
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Errore nel recupero del prodotto')
            }
        })
        .then((singleProduct) => {
            console.log('Single Product', singleProduct)
            document.getElementById('name').value = singleProduct.name
            document.getElementById('description').value = singleProduct.description
            document.getElementById('brand').value = singleProduct.brand
            document.getElementById('imageUrl').value = singleProduct.imageUrl
            document.getElementById('price').value = singleProduct.price
        })
        .catch((err) => {
            console.log('Errore:', err)
        });
    }

    class WineProduct {
        constructor(_name, _description, _brand, _imageUrl, _price) {
            this.name = _name
            this.description = _description
            this.brand = _brand;
            this.imageUrl = _imageUrl
            this.price = _price
        }
    }

    const productForm = document.getElementById('product-form')
    if (productForm) {
        productForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('name')
            const descriptionInput = document.getElementById('description')
            const brandInput = document.getElementById('brand')
            const imageUrlInput = document.getElementById('imageUrl')
            const priceInput = document.getElementById('price')

            const nameValue = nameInput.value
            const descriptionValue = descriptionInput.value
            const brandValue = brandInput.value
            const imageUrlValue = imageUrlInput.value
            const priceValue = priceInput.value

            const newWineProduct = new WineProduct(
                nameValue,
                descriptionValue,
                brandValue,
                imageUrlValue,
                priceValue
            );

            console.log('New Wine Product:', newWineProduct)

            let methodToUse
            if (wineId) {
                methodToUse = 'PUT'
            } else {
                methodToUse = 'POST'
            }

            const URLProduct = 'https://striveschool-api.herokuapp.com/api/product/'
            let urlToUse;
            if (wineId) {
                urlToUse = URLProduct + wineId
            } else {
                urlToUse = URLProduct
            }

            fetch(urlToUse, {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjJlYWYyNjBjYzAwMTVjYzBkZWUiLCJpYXQiOjE3MjE5ODM3MjIsImV4cCI6MTcyMzE5MzMyMn0.wgLHM4z__wtE5otPHelZKEoUCU_JGIT5EnVJF6j3bHs",
                    'Content-Type': 'application/json'
                },
                method: methodToUse,
                body: JSON.stringify(newWineProduct)
            })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Errore nella richiesta')
                }
            })
            .then((data) => {
                console.log('Success:', data)
                alert ('Prodotto salvato!')
                window.location.href = 'index.html'
            })
            .catch((error) => {
                console.error('Errore:', error)
            })
        })
    } else{
        console.log('form non trovato')
    }
})
