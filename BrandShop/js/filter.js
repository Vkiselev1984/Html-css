document.addEventListener('DOMContentLoaded', function () {
    let products = [
        {
            "category": "Accessories",
            "brand": "AtributikClub",
            "trend": "Color",
            "size": "M",
            "price": "21.00",
            "title": "AtributikClub",
            "description": "Your fingers will shine in rings from the designers of the brand shop",
            "image": "img/accessories_2.jpg"
        },
        {
            "category": "Accessories",
            "brand": "AtributikClub",
            "trend": "Form",
            "size": "XS",
            "price": "24.00",
            "title": "AtributikClub",
            "description": "The trend of the current year in amazing ring shapes from the brand shop to surprise and inspire",
            "image": "img/accessories_5.jpg"
        },
        {
            "category": "Accessories",
            "brand": "AtributikClub",
            "trend": "Materials",
            "size": "L",
            "price": "23.00",
            "title": "AtributikClub",
            "description": "To make rings, brand shop masters use only modern technologies and materials from the best suppliers",
            "image": "img/accessories_3.jpg"
        },
        {
            "category": "Bags",
            "brand": "BagIndustries",
            "trend": "Color",
            "size": "XS",
            "price": "30.00",
            "title": "BagIndustries",
            "description": "The bright and saturated color not only attracts attention, but also adds expressiveness to any image, be it everyday or evening situation",
            "image": "img/bag_color.jpg"
        },
        {
            "category": "Bags",
            "brand": "BagIndustries",
            "trend": "Form",
            "size": "M",
            "price": "25.00",
            "title": "BagIndustries",
            "description": "The unconventional silhouette creates a visual accent that is impossible to ignore, setting your fashion standards to a new level",
            "image": "img/bag_form.jpg"
        },
        {
            "category": "Bags",
            "brand": "BagIndustries",
            "trend": "Materials",
            "size": "M",
            "price": "26.00",
            "title": "BagIndustries",
            "description": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
            "image": "img/bag_materials.jpg"
        },
        {
            "category": "Hoodies & Sweatshirts",
            "brand": "HoodiesMag",
            "trend": "Color",
            "size": "M",
            "price": "26.00",
            "title": "HoodiesMag",
            "description": "The bright and saturated color not only attracts attention, but also adds expressiveness to any image, be it everyday or evening situation",
            "image": "img/sweet_color.jpg"
        },
        {
            "category": "Hoodies & Sweatshirts",
            "brand": "HoodiesMag",
            "trend": "Form",
            "size": "L",
            "price": "27.00",
            "title": "HoodiesMag",
            "description": "The unconventional silhouette creates a visual accent that is impossible to ignore, setting your fashion standards to a new level",
            "image": "img/sweet_form.jpg"
        },
        {
            "category": "Hoodies & Sweatshirts",
            "brand": "HoodiesMag",
            "trend": "Materials",
            "size": "L",
            "price": "27.00",
            "title": "HoodiesMag",
            "description": "Variety and quality of materials from leading suppliers with a worldwide reputation",
            "image": "img/sweet_materials.jpg"
        },
        {
            "category": "Jackets & Coats",
            "brand": "JacketsFabric",
            "trend": "Color",
            "size": "M",
            "price": "26.00",
            "title": "Jackets",
            "description": "The bright and saturated color not only attracts attention, but also adds expressiveness to any image, be it everyday or evening situation",
            "image": "img/jackets_color.jpg"
        },
        {
            "category": "Jackets & Coats",
            "brand": "JacketsFabric",
            "trend": "Form",
            "size": "L",
            "price": "27.00",
            "title": "Jackets",
            "description": "The unconventional silhouette creates a visual accent that is impossible to ignore, setting your fashion standards to a new level",
            "image": "img/jackets_form.jpg"
        },
        {
            "category": "Jackets & Coats",
            "brand": "JacketsFabric",
            "trend": "Materials",
            "size": "L",
            "price": "27.00",
            "title": "Jackets",
            "description": "Variety and quality of materials from leading suppliers with a worldwide reputation",
            "image": "img/jackets_materials.jpg"
        }
    ];

    const productContainer = document.querySelector('.goods__list'); // Container for display products
    const selectionMessage = document.createElement('div'); // Element for display user selection
    selectionMessage.className = 'selection_message';
    productContainer.parentNode.insertBefore(selectionMessage, productContainer); // Insert message before product container

    let selectedCategory = null; // Variable for storing selected category
    const selectedTrends = new Set(); // Using Set to store unique selected trends
    const selectedSizes = new Set(); // Use Set to store unique selected sizes
    const selectedPriceRange = new Set(); // Using Set to store unique selected price ranges
    let selectedBrand = new Set();

    const itemsPerPage = 9; // Number of products per page
    let currentPage = 1;

    // Product display function
    const renderProducts = (filteredProducts) => {
        productContainer.innerHTML = ''; // Сontainer сleaning
        const totalProducts = filteredProducts.length;
        const totalPages = Math.ceil(totalProducts / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

        if (productsToDisplay.length === 0) {
            const noProductsMessage = document.createElement('div');
            noProductsMessage.className = 'no_products_message';
            noProductsMessage.textContent = 'Sorry, we can\'t offer products from the selected category at the moment.';
            productContainer.appendChild(noProductsMessage);
        } else {
            productsToDisplay.forEach(product => {
                const listItem = document.createElement('li');
                listItem.className = 'goods__item product';
                listItem.setAttribute('data-category', product.category);
                listItem.setAttribute('data-trend', product.trend);
                listItem.setAttribute('data-size', product.size);
                listItem.setAttribute('data-price', product.price);

                listItem.innerHTML = `
                    <div class="product__image-wrapper">
                        <img class="product__image" src="${product.image}" alt="">
                        <button class="product__add">Add to Cart</button>
                    </div>
                    <div class="product__content">
                        <h3 class="product__title">${product.title}</h3>
                        <p class="product__description">${product.description}</p>
                        <p class="product__price">${product.price}</p>
                    </div>
                `;
                productContainer.appendChild(listItem);
            });
        }
        renderPagination(totalPages);
    };

    // Function for display pagination
    const renderPagination = (totalPages) => {
        const paginationContainer = document.querySelector('.pagination');
        if (!paginationContainer) {
            console.warn('Pagination container not found.'); // Debugging message
            return;
        }
        paginationContainer.innerHTML = '';

        if (totalPages > 1) { // Check if there is more than one page
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.className = 'page-button';
                if (i === currentPage) {
                    pageButton.classList.add('active'); // Add active class for current page
                }
                pageButton.addEventListener('click', () => {
                    currentPage = i; // Set current page
                    updateDisplayedProducts(); // Update displayed products
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                paginationContainer.appendChild(pageButton);
            }
        }
    };

    // Product filter function
    const filterProducts = () => {
        return products.filter(product => {
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const matchesBrand = selectedBrand.size > 0 ? selectedBrand.has(product.brand) : true;
            const matchesTrend = selectedTrends.size > 0 ? selectedTrends.has(product.trend.trim()) : true;
            const matchesSize = selectedSizes.size > 0 ? selectedSizes.has(product.size) : true;
            const price = parseFloat(product.price);
            const matchesPrice = selectedPriceRange.size > 0 ? (
                selectedPriceRange.has("up to $100") && price <= 100 ||
                selectedPriceRange.has("up to $1000") && price <= 1000 ||
                selectedPriceRange.has("more than $1000") && price > 1000
            ) : true;

            return matchesCategory && matchesBrand && matchesTrend && matchesSize && matchesPrice;
        });
    };

    // Update displayed products based on selected category, trends, sizes and prices
    const updateDisplayedProducts = () => {
        const filteredProducts = filterProducts();
        renderProducts(filteredProducts);
        updateSelectionMessage(filteredProducts.length); // Update selection message
    };

    // Function to update user selection message
    const updateSelectionMessage = (totalFiltered) => {
        let message = `Products found: ${totalFiltered}. Rules: `;
        if (selectedCategory) {
            message += `${selectedCategory} / `;
        }
        if (selectedTrends.size > 0) {
            message += `${Array.from(selectedTrends).join(', ')} / `;
        }
        if (selectedSizes.size > 0) {
            message += `${Array.from(selectedSizes).join(', ')} / `;
        }
        if (selectedPriceRange.size > 0) {
            message += `${Array.from(selectedPriceRange).join(', ')}`;
        }
        selectionMessage.textContent = message;
    };

    // Display all products when page loads
    renderProducts(products);

    // Handle clicks on elements with summary__dropdown_link class
    const dropdownLinks = document.querySelectorAll('.summary__dropdown_link');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Preventing link clicks
            const selectedValue = this.textContent; // Get link text that matches
            // Check if select value is category or brand
            if (this.closest('.summary__item').querySelector('.summary__item_link').textContent.trim() === 'Category') {
                selectedCategory = selectedValue; // Set selected category
                console.log("Вы выбрали категорию:", selectedCategory); // Debugging message
            } else {
                selectedBrand.clear(); // Clear previous values
                selectedBrand.add(selectedValue); // Set selected brand as Set
                console.log("Вы выбрали бренд:", Array.from(selectedBrand).join(', ')); // Debugging message
            }

            currentPage = 1; // Reset current page when change category or brand
            updateDisplayedProducts(); // Update displayed products
        });
    });

    // Handle clicks on elements with class for select trends
    let isProcessingClick = false; // Flag to prevent multiple clicks

    const trendItems = document.querySelectorAll('.filters__dropdown_item, .filters__dropdown_trend .trend-item');

    trendItems.forEach(item => {
        const handleClick = function (event) {
            event.stopPropagation(); // Предотвращаем всплытие события

            // Логика дебаунса
            if (isProcessingClick) return; // Игнорируем, если уже обрабатываем
            isProcessingClick = true;

            const trendValue = this.textContent.replace(/\s+/g, ' ').trim(); // Удаляем лишние пробелы и символы новой строки
            console.log(`Тренд выбран: '${trendValue}'`); // Сообщение для отладки

            console.log(`Состояние selectedTrends до изменения: ${Array.from(selectedTrends)}`);

            if (selectedTrends.has(trendValue)) {
                selectedTrends.delete(trendValue); // Удаляем тренд, если он уже выбран
                console.log(`Тренд удален: '${trendValue}'`); // Сообщение для отладки
            } else {
                selectedTrends.add(trendValue); // Добавляем тренд, если он не выбран
                console.log(`Тренд добавлен: '${trendValue}'`); // Сообщение для отладки
            }

            console.log(`Состояние selectedTrends после изменения: ${Array.from(selectedTrends)}`);

            currentPage = 1; // Сбрасываем текущую страницу при изменении фильтров
            updateDisplayedProducts(); // Обновляем отображаемые продукты

            // Сбрасываем флаг после небольшой задержки
            setTimeout(() => {
                isProcessingClick = false;
            }, 200); // Set up delay
        };

        // Remove previous handlers
        item.removeEventListener('click', handleClick);
        // Add new handler
        item.addEventListener('click', handleClick);
    });

    // Handle clicks on size checkboxes
    const sizeCheckboxes = document.querySelectorAll('.filters__dropdown_size input[type="checkbox"]');
    sizeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const sizeValue = this.value;
            if (this.checked) {
                selectedSizes.add(sizeValue); // Add size if select
            } else {
                selectedSizes.delete(sizeValue); // Remove size if it is not select
            }
            currentPage = 1; // Reset current page when changing filters
            updateDisplayedProducts(); // Update displayed products
        });
    });
    // Process clicks on price checkboxes
    const priceCheckboxes = document.querySelectorAll('.filters__dropdown_price input[type="checkbox"]');
    priceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const priceValue = this.value;
            if (this.checked) {
                selectedPriceRange.add(priceValue); // Add price range if select
            } else {
                selectedPriceRange.delete(priceValue); // Remove price range if it is not select
            }
            currentPage = 1; // Reset current page when change filters
            updateDisplayedProducts(); // Update displayed products
        });
    });


    // Process input in search field
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase(); // Get value of search field and convert it to lowercase
        const filteredProducts = products.filter(product => {
            return product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm);
        });
        currentPage = 1; // Reset current page when searching
        renderProducts(filteredProducts); // Update displayed products based on search result
        updateSelectionMessage(filteredProducts.length); // Update user selection message
    });
});