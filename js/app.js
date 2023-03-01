
//  load the categories List bar    
const loadCategories = async() => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        displayCategories(data);
    } catch (error) {
        console.log(error);
    }
}

// display the categories list 

const displayCategories = categories => {
    const categoryContainer = document.getElementById('category-container');
    // forEach loop to get the list items 
    categories.data.news_category.forEach(category => {
        // console.log(category)
        const li = document.createElement('li');
        li.innerHTML = `
            <a onclick="fetchCategoryNews('${category.category_id}', '${category.category_name}')" class="text-decoration-none text-dark" href="#"> ${category?.category_name} </a>            
        `;
        categoryContainer.appendChild(li);
    })
}

// fetch all newses available in a category
const fetchCategoryNews = async(categoryId, categoryName ) => {
    try {
        const res = await fetch(` https://openapi.programming-hero.com/api/news/category/${categoryId}`);
        const data = await res.json();
        displayNewses(data.data, categoryName);
    } 
    catch (error) {
        console.log(error);
    }
}

// show all the newses of same category
const displayNewses = (newses, categoryName) => {
    document.getElementById('news-count').innerText = newses.length;
    document.getElementById('category-name').innerText = categoryName;

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    newses.forEach(news => {
        console.log(news, categoryName)
        cardsContainer.innerHTML += `
        
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img class="img-fluid" src="${news.image_url}" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>

        `
    })
}