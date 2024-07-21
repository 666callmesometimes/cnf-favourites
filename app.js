document.getElementById('toggleForm').addEventListener('click', function() {
    const form = document.getElementById('productForm');
    const toggleButton = document.getElementById('toggleForm');
    if (form.style.display === 'none') {
        form.style.display = 'block';
        toggleButton.textContent = '-';
    } else {
        form.style.display = 'none';
        toggleButton.textContent = '+';
    }
});

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const link = document.getElementById('link').value;
    const image = document.getElementById('image').value;
    const price = document.getElementById('price').value;
    const size = document.getElementById('size').checked ? document.getElementById('sizeText').value : '';
    const batch = document.getElementById('batch').checked ? document.getElementById('batchText').value : '';

    const product = { name, link, image, price, size, batch };

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(product);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    displayFavorites();
    this.reset();
    document.getElementById('sizeText').style.display = 'none';
    document.getElementById('batchText').style.display = 'none';
    document.getElementById('toggleForm').textContent = '+';
    form.style.display = 'none';
});

function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${product.link}" target="_blank" class="item-link">
                <img src="${product.image}" alt="${product.name}">
                <span>
                <h4>${product.name}</h4>
                <p>Price: <b>¥${product.price}</b></p>
                ${product.size ? `<p>Size: <b>${product.size}</b></p>` : ''}
                ${product.batch ? `<p>Batch:<b> ${product.batch}</b></p>` : ''}
                </span>
            </a>
            <button class="remove-button" data-index="${index}">Remove</button>
        `;
        favoritesList.appendChild(li);
    });

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const index = this.getAttribute('data-index');
            removeFavorite(index);
        });
    });
}

function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

document.getElementById('size').addEventListener('change', function() {
    document.getElementById('sizeText').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('batch').addEventListener('change', function() {
    document.getElementById('batchText').style.display = this.checked ? 'block' : 'none';
});

document.addEventListener('DOMContentLoaded', displayFavorites);



/*document.addEventListener("DOMContentLoaded", function() {
    var elements = document.querySelectorAll('h4');
    elements.forEach(function(element) {
        var maxLength = element.getAttribute('data-maxlength');
        if (element.textContent.length > maxLength) {
            element.textContent = element.textContent.substring(0, maxLength) + '...';
        }
    });
});*/
