const handleCategory = async () =>{
    const res = await fetch(" https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const categories = data.data;

    const btnContainer = document.getElementById('btn-container');
    
    categories.forEach((category) => {
        const button = document.createElement("button");
        button.innerHTML = `
        <button onclick = "handleLoadCategories('${category.category_id}')" class="btn text-black active:bg-red-600">${category.category}</button>
        `;
        btnContainer.appendChild(button);
    });
    // console.log(categories);
};

const handleLoadCategories = async (categoryId) =>{
    const res = await fetch(`
    https://openapi.programming-hero.com/api/videos/category/${categoryId}
    `);
    const data = await res.json();

    const videoContainer = document.getElementById('videos-container');

    videoContainer.textContent = '';

    data.data.forEach((videos) =>{
        const seconds = videos.others.posted_date;

        function secondsToHoursMinutes(seconds){
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
          
            return `${hours} hrs ${minutes} min ago`;
        }

        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure class="relative px-5 pt-5">
        <img src="${videos.thumbnail}" alt="Shoes" class="rounded-xl h-52" />
        <p class="absolute bottom-2 right-10 text-white bg-black rounded-lg p-1"> 
        ${videos.others.posted_date ? secondsToHoursMinutes(seconds) : ""}
        </p>
        </figure>
        <div class="card-body flex flex-row">
            <div>
                <img src="${videos.authors[0].profile_picture}" alt="" class="rounded-full h-8 w-8">
            </div>
            <div>
                <h3 class="font-bold">${videos.title}</h3>
                <div class="flex flex-row">
                   <p>${videos.authors[0].profile_name}</p>
                   <p>${videos.authors[0].verified ? '<img src="img/ticks.svg" alt="" class="rounded-full h-6 w-6 pl-2">' : ""}</p>
                </div>

                <p>${videos.others.views}</p>
            </div>
        </div>
      </div>
        `;
        videoContainer.appendChild(div);
    });
};


handleCategory();
handleLoadCategories("1000");