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

    const editIndex = document.getElementById('productForm').getAttribute('data-edit-index');
    if (editIndex) {
        favorites[editIndex] = product;
        document.getElementById('productForm').removeAttribute('data-edit-index');
    } else {
        favorites.push(product);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
    this.reset();
    document.getElementById('sizeText').style.display = 'none';
    document.getElementById('batchText').style.display = 'none';
    document.getElementById('toggleForm').textContent = '+';
    form.style.display = 'none';
});

document.getElementById('size').addEventListener('change', function() {
    document.getElementById('sizeText').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('batch').addEventListener('change', function() {
    document.getElementById('batchText').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('searchBar').addEventListener('input', function() {
    displayFavorites(this.value);
});

document.addEventListener('DOMContentLoaded', function() {
    displayFavorites();
    const darkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').checked = true;
    }
});

document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', this.checked);
});

function displayFavorites(searchQuery = '') {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const filteredFavorites = favorites.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredFavorites.forEach((product, index) => {
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
            <button class="edit-button" data-index="${index}">Edit</button>
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

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const index = this.getAttribute('data-index');
            editFavorite(index);
        });
    });
}

function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

function editFavorite(index) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const product = favorites[index];

    document.getElementById('name').value = product.name;
    document.getElementById('link').value = product.link;
    document.getElementById('image').value = product.image;
    document.getElementById('price').value = product.price;
    document.getElementById('size').checked = product.size ? true : false;
    document.getElementById('sizeText').value = product.size;
    document.getElementById('batch').checked = product.batch ? true : false;
    document.getElementById('batchText').value = product.batch;

    document.getElementById('sizeText').style.display = product.size ? 'block' : 'none';
    document.getElementById('batchText').style.display = product.batch ? 'block' : 'none';

    document.getElementById('productForm').setAttribute('data-edit-index', index);
    document.getElementById('productForm').style.display = 'block';
    document.getElementById('toggleForm').textContent = '-';
}
