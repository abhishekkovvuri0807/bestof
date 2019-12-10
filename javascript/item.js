// document event is triggered when the document is ready.
$(document).ready(function () {
    // set logged in user name in header
    setUserName();
    // loading log out on click event.
    $(document).on("click", ".user-logout", function () {
        logoutUser();
    });

    // to get item details.
    let item = getItem();
 
    // to get item first image.
    let itemImage = getItemFirstImage(item);
    if (itemImage) {
        $(".item-image").attr("src", itemImage.source);
        $(".item-image").attr("photoId", itemImage.photoId);
    }

    $(".prev-image").click(function () {
        let previousImage = getPreviousImage(getItem(), $(".item-image").attr("photoId"));
        $(".item-image").attr("src", previousImage.source);
        $(".item-image").attr("photoId", previousImage.photoId);
    });

    $(".next-image").click(function () {
        let nextImage = getNextImage(getItem(), $(".item-image").attr("photoId"));
        $(".item-image").attr("src", nextImage.source);
        $(".item-image").attr("photoId", nextImage.photoId);
    });

    // binding data to html.
    if(item) {
        $('.item-name').text(item.name);
        $('.item-rating').html(getStarRatingHtml(item.rating));
        $('.item-overview-description').text(item.overview);
        $('.item-overall-rating').text(item.rating);
        getUserReviewOfAnItem();
    }
    
});

// to get item from dataset.
function getItem() {
    let pageParameters = getPageParameters();
    for (let i = 0; i < categories.data.length; i++) {
        if (pageParameters.categoryId == categories.data[i].categoryId) {
            for (let j = 0; j < categories.data[i].items.length; j++) {
                if (pageParameters.itemId == categories.data[i].items[j].itemId) {
                    return categories.data[i].items[j];
                }
            }
        }
    }
}

// to get next image.
function getNextImage(item, photoId) {
    if (item.photos && item.photos[photoId]) {
        return item.photos[photoId];
    }
    return item.photos[photoId - 1];
}

// to get previous image.
function getPreviousImage(item, photoId) {
    if (item.photos && item.photos[photoId - 2]) {
        return item.photos[photoId - 2];
    }
    return item.photos[photoId - 1];
}

// to get item first image.
function getItemFirstImage(item) {
    if (item && item.photos) {
        return item.photos[0];
    }
}

// to get page parameters.
function getPageParameters() {
    let path = document.location.href;
    let url = new URL(path);
    let category = url.searchParams.get("categoryId");
    let item = url.searchParams.get("itemId");
    return { "categoryId": category, "itemId": item };
}

// to get and bind reviews of a user.
function getUserReviewOfAnItem() {
    $(".user-reviews").empty();
    let item = getItem();
    let reviewHtml = "";
    for (let i = 0; i < item.reviews.length; i++) {
        reviewHtml += "<p class = 'review-summary'>" + item.reviews[i].summary + "</p><p>";
        reviewHtml += getStarRatingHtml(item.reviews[i].userRating);
        reviewHtml += "</p>" +
            "<p class = 'review-user'>by <strong>" + item.reviews[i].userName +
            "</strong> <br/> on " + item.reviews[i].date + "</p>" +
            "<p>" + item.reviews[i].comments + "</p>" +
            "<hr class = 'line-spacing line-width-50' />";
    }

    $(".user-reviews").append(reviewHtml);
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