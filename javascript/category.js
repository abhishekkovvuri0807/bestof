// document event is triggered when the document is ready.
$(document).ready(function () {
    setUserName();
    $(document).on("click", ".user-logout", function () {
        logoutUser();
    });
    $('.breadcrumb').css('margin-top', document.getElementsByTagName("header")[0].offsetHeight + 'px');
    $(document).on("click", ".category-item", function () {
        let categoryId = $(this).attr('data-categoryId');
        navigateToItems(categoryId);
    });
    loadCategoryHtml();
});

// loading categories html from dataset.
function loadCategoryHtml() {
    $(".category-container").empty();
    let categories = getCategories();
    let categoriesHtml = '';
    for (var i = 0; i < categories.length; i++) {
        categoriesHtml += "<div class='category-item' data-categoryId =" + categories[i].categoryId  + " " +
        "style=\"background-image: url('" + categories[i].categoryPhoto + "');\">" +
        "<div>" + categories[i].categoryName + "</div>" +
        "</div>"; 
    }
    $(".category-container").append(categoriesHtml);
}

// to navigate to respective items page.
function navigateToItems(categoryId) {
    window.location.href = "./html/items.html?categoryId=" + categoryId;
}

// to get categories from data.
function getCategories() {
    return categories.data;
}

