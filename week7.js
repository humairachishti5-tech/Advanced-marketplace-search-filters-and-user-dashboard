// CODIORA WEEK 7 JAVASCRIPT

// Sample marketplace services
const services = [
    {
        id: 1,
        title: "Professional Website Development",
        freelancer: "Ali Ahmed",
        category: "Web Development",
        price: 5000,
        rating: 4.8,
        delivery: 3,
        experience: "Expert",
        popular: 95,
        newest: 5,
        skills: "HTML CSS JavaScript"
    },
    {
        id: 2,
        title: "Creative Logo Design",
        freelancer: "Sara Khan",
        category: "Graphic Design",
        price: 2000,
        rating: 4.5,
        delivery: 2,
        experience: "Beginner",
        popular: 80,
        newest: 4,
        skills: "Photoshop Illustrator"
    },
    {
        id: 3,
        title: "AI Chatbot Development",
        freelancer: "Usman Ali",
        category: "AI",
        price: 8000,
        rating: 5,
        delivery: 7,
        experience: "Expert",
        popular: 100,
        newest: 3,
        skills: "Python AI Machine Learning"
    },
    {
        id: 4,
        title: "Content Writing Service",
        freelancer: "Ayesha Noor",
        category: "Content Writing",
        price: 1500,
        rating: 4.2,
        delivery: 3,
        experience: "Intermediate",
        popular: 65,
        newest: 2,
        skills: "Writing SEO Blogs"
    },
    {
        id: 5,
        title: "Responsive Frontend Website",
        freelancer: "Hassan Raza",
        category: "Web Development",
        price: 4000,
        rating: 4.7,
        delivery: 5,
        experience: "Intermediate",
        popular: 90,
        newest: 1,
        skills: "HTML CSS JavaScript"
    },
    {
        id: 6,
        title: "Social Media Graphics",
        freelancer: "Fatima Noor",
        category: "Graphic Design",
        price: 2500,
        rating: 4.6,
        delivery: 4,
        experience: "Beginner",
        popular: 70,
        newest: 6,
        skills: "Canva Design Graphics"
    }
];

// Get saved favorites from LocalStorage
let favorites = JSON.parse(
    localStorage.getItem("codioraFavorites") || "[]"
);

// Save favorites
function saveFavorites() {
    localStorage.setItem(
        "codioraFavorites",
        JSON.stringify(favorites)
    );
}

// Display services
function displayServices(list, containerId, isFavoritePage = false) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    list.forEach(service => {

        const isSaved = favorites.includes(service.id);

        const card = document.createElement("div");

        card.className = "service-card";

        card.innerHTML = `
            <h3>${service.title}</h3>

            <p>Freelancer: ${service.freelancer}</p>

            <p>Category: ${service.category}</p>

            <p>Skills: ${service.skills}</p>

            <p>Rating: ⭐ ${service.rating}</p>

            <p>Delivery: ${service.delivery} Days</p>

            <p>Experience: ${service.experience}</p>

            <p class="price">Rs. ${service.price}</p>

            <button class="favorite-btn"
                data-id="${service.id}">
                ${isSaved ? "♥ Remove Favorite" : "♡ Add Favorite"}
            </button>
        `;

        container.appendChild(card);
    });

    // Add favorite button events
    container.querySelectorAll(".favorite-btn").forEach(button => {

        button.addEventListener("click", function() {

            const id = Number(this.dataset.id);

            if (favorites.includes(id)) {

                favorites = favorites.filter(item => item !== id);

            } else {

                favorites.push(id);

            }

            saveFavorites();

            if (isFavoritePage) {
                showFavorites();
            } else {
                filterServices();
            }

        });

    });
}

// Search and filter services
function filterServices() {

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const deliveryFilter = document.getElementById("deliveryFilter");
    const experienceFilter = document.getElementById("experienceFilter");
    const sortFilter = document.getElementById("sortFilter");

    if (!searchInput) return;

    const search = searchInput.value.toLowerCase();

    const category = categoryFilter.value;
    const maxPrice = Number(priceFilter.value);
    const minRating = Number(ratingFilter.value);
    const delivery = deliveryFilter.value;
    const experience = experienceFilter.value;
    const sort = sortFilter.value;

    let filtered = services.filter(service => {

        const matchesSearch =
            service.title.toLowerCase().includes(search) ||
            service.freelancer.toLowerCase().includes(search) ||
            service.skills.toLowerCase().includes(search) ||
            service.category.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" ||
            service.category === category;

        const matchesPrice =
            priceFilter.value === "" ||
            service.price <= maxPrice;

        const matchesRating =
            service.rating >= minRating;

        const matchesDelivery =
            delivery === "all" ||
            service.delivery <= Number(delivery);

        const matchesExperience =
            experience === "all" ||
            service.experience === experience;

        return matchesSearch &&
            matchesCategory &&
            matchesPrice &&
            matchesRating &&
            matchesDelivery &&
            matchesExperience;

    });

    // Sorting
    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "popular") {
        filtered.sort((a, b) => b.popular - a.popular);
    }

    if (sort === "newest") {
        filtered.sort((a, b) => b.newest - a.newest);
    }

    displayServices(filtered, "serviceContainer");

    const count = document.getElementById("resultCount");
    const empty = document.getElementById("emptyMessage");

    if (count) {
        count.textContent = filtered.length + " Services Found";
    }

    if (empty) {
        empty.hidden = filtered.length !== 0;
    }
}

// Display favorite services
function showFavorites() {

    const favoriteServices = services.filter(service =>
        favorites.includes(service.id)
    );

    displayServices(
        favoriteServices,
        "favoriteContainer",
        true
    );

    const empty = document.getElementById("favoriteEmpty");

    if (empty) {
        empty.hidden = favoriteServices.length !== 0;
    }
}

// Dashboard statistics
function showDashboard() {

    const totalServices = document.getElementById("totalServices");

    if (totalServices) {
        totalServices.textContent = services.length;
    }

}

// Run when page loads
document.addEventListener("DOMContentLoaded", function() {

    // Marketplace page
    if (document.getElementById("serviceContainer")) {

        const searchBtn = document.getElementById("searchBtn");

        searchBtn.addEventListener("click", filterServices);

        document.getElementById("searchInput")
            .addEventListener("input", filterServices);

        document.getElementById("categoryFilter")
            .addEventListener("change", filterServices);

        document.getElementById("priceFilter")
            .addEventListener("input", filterServices);

        document.getElementById("ratingFilter")
            .addEventListener("change", filterServices);

        document.getElementById("deliveryFilter")
            .addEventListener("change", filterServices);

        document.getElementById("experienceFilter")
            .addEventListener("change", filterServices);

        document.getElementById("sortFilter")
            .addEventListener("change", filterServices);

        filterServices();
    }

    // Favorites page
    if (document.getElementById("favoriteContainer")) {
        showFavorites();
    }

    // Dashboard page
    showDashboard();

});