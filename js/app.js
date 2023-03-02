
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
         const {image_url, title, details, author, total_view, _id} = news;
        // console.log(news, categoryName)
        cardsContainer.innerHTML += `
        
            <div class="card mb-3">
                <div class="row align-items-center g-0">
                    <div class="col-md-4">
                        <img class="img-fluid rounded-start" src="${image_url}" alt="...">
                    </div>
                    <div class="col-md-8 d-flex flex-column">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${details.slice(0, 200)}...</p>                       
                        </div>
                        <div class="card-footer d-flex  align-items-center justify-content-between border-0 bg-body">

                            <div class="d-flex gap-2">
                            <img width="40" height="40" class="img-fluid rounded-circle" src="${author.img}" alt="Author-image">
                            <div>
                                    <h6 class="m-0">${author.name ? author.name: 'No Author Found'}</h6>
                                    <p class="m-0">${author.published_date}</p>
                            </div>
                            </div>

                            <div class="d-flex gap-1 align-items-center">
                                <i class="fa-solid fa-eye"></i>
                                <p class="m-0">${total_view}</p>
                            </div>

                            <div>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half"></i>
                            </div>

                            <div class="" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                                <i style="cursor: pointer" onclick="fetchNewsDetails('${_id}')" class="fa-solid fa-arrow-right cursor-pointer"></i>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        `;
    })
}

// news details data loading
const fetchNewsDetails = async newsId => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
        const data = await res.json();
        showNewsDetails(data.data[0]);
    }
     catch (error) {
       console.log(error); 
    }
}

// show the details
const showNewsDetails = newsDetails => {
    console.log(newsDetails)
    const {image_url, title, details, author, total_view, _id} = newsDetails;
    document.getElementById('modal-body').innerHTML = `
        <div class="card mb-3">
            <div class="row align-items-center p-2 g-0">
                <div class="col-md-12 text-center">
                    <img class="img-fluid rounded-start" src="${image_url}" alt="...">
                </div>
                <div class="col-md-12">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${details}</p>                       
                    </div>
                    <div class="card-footer d-flex  align-items-center justify-content-between border-0 bg-body">

                        <div class="d-flex gap-2">
                        <img width="40" height="40" class="img-fluid rounded-circle" src="${author.img}" alt="Author-image">
                        <div>
                            <h6 class="m-0">${author.name ? author.name: 'No Author Found'}</h6>
                            <p class="m-0">${author.published_date}</p>
                        </div>
                        </div>

                        <div class="d-flex gap-1 align-items-center">
                            <i class="fa-solid fa-eye"></i>
                            <p class="m-0">${total_view}</p>
                        </div>

                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `
}
