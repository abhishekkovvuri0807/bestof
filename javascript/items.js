// document event is triggered when the document is ready.
$(document).ready(function () {
    // set logged in user name in header
    setUserName();
    // loading log out on click event.
    $(document).on("click", ".user-logout", function () {
        logoutUser();
    });
    // loading item on click event.
    $(document).on("click", ".item", function () {
        let categoryId = $(this).attr('data-categoryId');
        let itemId = $(this).attr('data-itemId');
        navigateToItem(categoryId, itemId);
    });
    loadItemsHtml();
});

// loading items html.
function loadItemsHtml() {
    $(".container").empty();
    let category = getCategoryData();
    $('.container-header h2').text("Top " + category.categoryName);
    let itemsHtml = '';
    for (var i = 0; i < category.items.length; i++) {
        itemsHtml += "<div class='item' data-categoryId = " + category.categoryId  + " " + "data-itemId=" + category.items[i].itemId + " >" +
            "<img src='" + category.items[i].photos[0].source + "' alt='" + category.items[i].photos[0].alt + "' />" +
            "<div class = 'item-name-loc font-size-22'>" + category.items[i].name + "</div>" +
            "<div class = 'item-name-loc font-size-12'>" + category.items[i].location + "</div>" +
            "<div class = 'item-name-loc font-size-12'>" + getStarRatingHtml(category.items[i].rating) + "</div>" +
            "</div>";
    }
    $(".container").append(itemsHtml);
}

// to get categoryId from url.
function getCategoryId() {
    var path = document.location.href;
    var url = new URL(path);
    var categoryId = url.searchParams.get("categoryId");
    return categoryId;
}

// get category date from categoryId.
function getCategoryData() {
    let categoryId = getCategoryId();
    for (var i = 0; i < categories.data.length; i++) {
        if (categoryId == categories.data[i].categoryId) {
            return categories.data[i];
        }
    }
}

// navigate to item page.
function navigateToItem(categoryId, itemId) {
    window.location.href = "item.html?categoryId=" + categoryId + "&&itemId=" + itemId;
}

// calculating star rating and return html.
function getStarRatingHtml(rating) {
    let starHtml = '';
    absoluteRating = Math.floor(rating);
    decimalRating = rating - absoluteRating;
    for (let i = 0; i < absoluteRating; i++) {
        starHtml += '<i class="fas fa-star color-yellow"></i>';
    }
    if(decimalRating == 0) {
        starHtml += '';
    }
    if(decimalRating >= 0.2 && decimalRating <= 0.7) {
        starHtml += '<i class="fas fa-star-half-alt color-yellow"></i>';
    } else if(decimalRating > 0.7) {
        starHtml += '<i class="fas fa-star color-yellow"></i>';
    }
    return starHtml;
}

