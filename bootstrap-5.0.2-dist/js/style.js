// alert("wo0rking")
$(window).scroll(function () {
    // $('.enquiry_form').toggleClass('show',$(this).scrollTop() > 1000);
    $('header').toggleClass('scrolled', $(this).scrollTop() > 100);
    // $('.scrolltop').toggleClass('show',$(this).scrollTop() > 400);
});


//========== swipper for hot products ============

function initParadoxWay() {
    "use strict";

    if ($(".products-carousel").length > 0) {
        var j2 = new Swiper(".products-carousel .swiper-container", {
            preloadImages: false,
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: true,
            pagination: {
                el: '.tc-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.listing-carousel-button-next',
                prevEl: '.listing-carousel-button-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 1,
                },

            }
        });
    }

    // bubbles -----------------


    // setInterval(function () {
    //     var size = randomValue(sArray);
    //     //console.log(size)
    //     $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
    //     $('.individual-bubble').animate({
    //         'bottom': '100%',
    //         'opacity': '-=0.7'
    //     }, 4000, function () {
    //         $(this).remove()
    //     });
    // }, 350);

}

//   Init All ------------------
$(document).ready(function () {
    initParadoxWay();
});




//================== call api =============
/*  http://localhost:3000/getBanners,
    http://localhost:3000/products ,
    http://localhost:3000/getCategoryMaster 
*/

$(document).ready(function(){
  $(".loadingSpinner").fadeOut();
})


//=== getBannerItem =======
getBanners();
var BannerItem = document.getElementById('bannerItem');
function getBanners() {
    const ajaxReqNew = new XMLHttpRequest(); // create object
    ajaxReqNew.open('GET', "http://localhost:3000/getBanners", 'TRUE'); // open request
    //ajaxReqNew.setRequestHeader('content-type','application/x-www-form-urlencoded')
    ajaxReqNew.send();
    //when req is in progress
    ajaxReqNew.onprogress = () => {
        //console.log("on progress your request in getBanners")
        $(".loadingSpinner").fadeIn();
    }
    //when response is ready
    ajaxReqNew.onload = function () {
        //console.log(this.status)
        if (this.status == 200) {
            $(".loadingSpinner").fadeOut();
            let resp = null;
            BannerItem.innerHTML = '';
            /*banner_id: 3,
            banner_image: 'bannerImage-1644399152536.jpg',
            banner_text: 'Girella Motta Cacao Soft Cake banner 2',
            status: 'Active'*/
            resp = JSON.parse(ajaxReqNew.response)
            //console.log(resp)
            var bannerData = '';
            $.each(resp, function (key, value) {
                //console.log(key + ':' + value.banner_image)
                //var extensn = value.document_name.split('.').pop();
                //console.log("extensn :-"+extensn);                          
                if (key == 0) {
                    bannerData += '<div class="carousel-item active">';
                } else {
                    bannerData += '<div class="carousel-item">';
                }
                bannerData += '<img src="http://localhost:3000/uploadBannerImage/' + value.banner_image + '" class="d-block w-100" alt="">'
                bannerData += '<div class="carousel-caption">'
                bannerData += '<p>COFFEE CREAM & CHOCOLATE</p>'
                bannerData += '<h2>' + value.banner_text + '</h2>'
                bannerData += '<a href="" class="btn btn-sm">Shop Now</a>'
                bannerData += '</div>'
                bannerData += '</div>'
            });
            $('#bannerItem').append(bannerData);
            
        } else {
            console.log("Something went wrong in banners api...")
        }
    }
}


//========== getPopular Category ======

var popularCategory = document.getElementById('popularCategory');
function getPopularCategory() {
    const ajaxReqNew = new XMLHttpRequest(); // create object
    ajaxReqNew.open('GET', "http://localhost:3000/getCategoryMaster", 'TRUE'); // open request
    //ajaxReqNew.setRequestHeader('content-type','application/x-www-form-urlencoded')
    ajaxReqNew.send();
    //when req is in progress
    ajaxReqNew.onprogress = () => {
        //console.log("on progress your request")
        $(".loadingSpinner").fadeIn();
    }
    //when response is ready
    ajaxReqNew.onload = function() {

        if (this.status === 200) {
            //console.log(this.status)
            $(".loadingSpinner").fadeOut();
            let resp = null;
            popularCategory.innerHTML = '';
            /* cat_id: 1
                cat_image: "nutrition"
                cat_name: "Vegetables"
                status: "Active"*/
            //try {
            resp = JSON.parse(ajaxReqNew.response)
            //console.log(resp)
            var popularCategoryData = '';
            $.each(resp, function (key, value) {
                //console.log(key + ':' + value.cat_image)
                //var extensn = value.document_name.split('.').pop();
                //console.log("extensn :-"+extensn);
                popularCategoryData += '<a href="productsByCategory.html" target="_blank" class="p_category">';
                popularCategoryData += '<img src="http://localhost:3000/uploadProductCategoryImage/' + value.cat_image + '" alt="">';
                popularCategoryData += '<div class="p_category_text">';
                popularCategoryData += '<h2>' + value.cat_name + '</h2>';
                popularCategoryData += '<h6>16 Products</h6>';
                popularCategoryData += '<p>Shop Now<i class="fas fa-play-circle"></i></p>';
                popularCategoryData += '</div>';
                popularCategoryData += '</a>';
            });
            $('#popularCategory').append(popularCategoryData);
        } else {
            console.log('Something went wrong in getCategoryMaster...')
        }
    }
}

getPopularCategory();

//==== getNewArrivalProducts =======
var newArrivalProductId = document.getElementById('newArrivalProducts')
var hotProductsContainerId = document.getElementById('hotProducts_container')
function getNewArrivalProducts() {
    const ajaxReqNew = new XMLHttpRequest(); // create object
    ajaxReqNew.open('GET', "http://localhost:3000/products", 'TRUE'); // open request
    //ajaxReqNew.setRequestHeader('content-type','application/x-www-form-urlencoded')
    ajaxReqNew.send();
    //when req is in progress
    ajaxReqNew.onprogress = () => {
        //console.log("on progress your request")
        $(".loadingSpinner").fadeIn();
    }
    //when response is ready
    ajaxReqNew.onload = function() {
    //ajaxReqNew.onreadystatechange = function () {
        //if (ajaxReqNew.readyState == 4 && ajaxReqNew.status == 200) {
        if(this.status === 200){
            $(".loadingSpinner").fadeOut();    
            let resp = null;
            newArrivalProductId.innerHTML = '';
            /*cat_id: 1
            created_At: "2021-10-22T15:22:30.817Z"
            description: "description of our products "
            discount: "20%"
            image: "brocoli.jpg"
            name: "Brocoli"
            price: 40
            price_detail: "40/kg"
            product_id: 1
            quantity: 3
            status: "Active"'*/
            resp = JSON.parse(ajaxReqNew.response)
            //console.log(resp)
            var productData = '';
            var hotProductsData = '';
            $.each(resp, function (key, value) {
                //console.log(key + ':' + value.name)
                //var extensn = value.document_name.split('.').pop();
                //console.log("extensn :-"+extensn); 
                productData += '<div class="products card">';
                productData += '<div class="product_content">'
                productData += '<div class="p_img">'
                productData += '<img src="http://localhost:3000/uploadProducts/' + value.image + '" alt="">'
                productData += '<span>New</span>'
                productData += '</div>'
                productData += '<div class="p_details">'
                productData += '<h6>Studio Design</h6>'
                productData += '<h1>' + value.name + '</h1>'
                productData += '<p class="star">'
                productData += '<i class="fas fa-star active"></i>'
                productData += '<i class="fas fa-star active"></i>'
                productData += '<i class="fas fa-star active"></i>'
                productData += '<i class="fas fa-star active"></i>'
                productData += '<i class="fas fa-star-half-alt active"></i>'
                productData += ' </p>'
                productData += '<h3>'
                productData += '$' + value.price_detail
                productData += '<span>$' + value.price + '<b>-' + value.discount + '</b> </span>'
                productData += '</h3>'
                productData += '</div>'
                productData += '<div class="viewProduct_box">'
                productData += '<div class="centerItemBox">'
                productData += '<a href="viewProducts.html"  class="view_pDetails"></a>'
                productData += '<i class="fas fa-search" data-bs-toggle="modal" data-bs-target="#viewProductModal"></i>'
                productData += '</div>'
                productData += '<div class="addToCart_p">'
                productData += '<a href="" class="btn btn-sm">Add To Cart</a>'
                productData += '<p>'
                productData += '<a href=""><i class="fas fa-random"></i></a>&nbsp;'
                productData += '<a href=""><i class="far fa-heart"></i></a>'
                productData += '</p>'
                productData += '</div>'
                productData += '</div>'
                productData += '</div>'
                productData += '</div>'
                productData += '</div>'



                //============ hotProductsData ========= class="swiper-slide swiper-slide-duplicate swiper-slide-active swiper-slide-duplicate-next"
                hotProductsData += '<div class="swiper-slide">'
                hotProductsData += '<div class="products card text-center p_hot">';
                hotProductsData += '<div class="product_content">'
                hotProductsData += '<div class="p_img">'
                hotProductsData += '<img src="http://localhost:3000/uploadProducts/' + value.image + '" alt="">'
                hotProductsData += '<span>New</span>'
                hotProductsData += '</div>'
                hotProductsData += '<div class="p_details">'
                hotProductsData += '<h6>Studio Design</h6>'
                hotProductsData += '<h1>' + value.name + '</h1>'
                hotProductsData += '<p class="star">'
                hotProductsData += '<i class="fas fa-star active"></i>'
                hotProductsData += '<i class="fas fa-star active"></i>'
                hotProductsData += '<i class="fas fa-star active"></i>'
                hotProductsData += '<i class="fas fa-star active"></i>'
                hotProductsData += '<i class="fas fa-star-half-alt active"></i>'
                hotProductsData += ' </p>'
                hotProductsData += '<h3>'
                hotProductsData += '$' + value.price_detail
                hotProductsData += '<span>$' + value.price + '<b>-' + value.discount + '</b> </span>'
                hotProductsData += '</h3>'
                hotProductsData += '</div>'
                hotProductsData += '<div class="viewProduct_box">'
                hotProductsData += '<div class="centerItemBox">'
                hotProductsData += '<a href="viewProducts.html"  class="view_pDetails"></a>'
                hotProductsData += '<i class="fas fa-search" data-bs-toggle="modal" data-bs-target="#viewProductModal"></i>'
                hotProductsData += '</div>'
                hotProductsData += '<div class="addToCart_p">'
                hotProductsData += '<a href="" class="btn btn-sm">Add To Cart</a>'
                hotProductsData += '<p>'
                hotProductsData += '<a href=""><i class="fas fa-random"></i></a>&nbsp;'
                hotProductsData += '<a href=""><i class="far fa-heart"></i></a>'
                hotProductsData += '</p>'
                hotProductsData += '</div>'
                hotProductsData += '</div>'
                hotProductsData += '</div>'
                hotProductsData += '<div class="p_details_bottom">'
                hotProductsData += '<p class="stock">Availability: <span>297 In Stock</span></p>'
                hotProductsData += '<h4>Hurry Up! Offer ends in :'
                hotProductsData += '<div class="remainingTime">'
                hotProductsData += '<div class="timeBox">'
                hotProductsData += '<span id="days">100</span>Days'
                hotProductsData += '</div>'
                hotProductsData += '<span  class="colan">:</span>'
                hotProductsData += '<div class="timeBox">'
                hotProductsData += '<span id="hours">10</span>Hours'
                hotProductsData += '</div>'
                hotProductsData += '<span  class="colan">:</span>'
                hotProductsData += '<div class="timeBox">'
                hotProductsData += '<span id="minuts">30</span>Minutes'
                hotProductsData += '</div>'
                hotProductsData += '<span class="colan">:</span>'
                hotProductsData += '<div class="timeBox">'
                hotProductsData += '<span id="seconds">50</span>Seconds'
                hotProductsData += '</div>'
                hotProductsData += '</div>'
                hotProductsData += '</h4>'
                hotProductsData += '</div>'
                hotProductsData += '</div>'
                hotProductsData += '</div>'

            });
            $('#newArrivalProducts').append(productData);
            $('#hotProducts_container').append(hotProductsData);
        }
        else{
            alert("Something went wrong...")
        }
    }
}

getNewArrivalProducts();


