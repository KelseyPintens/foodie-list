

function ratings(){
    // console.log('get ratings individual call'); 
  return new Promise((resolve,reject) => {
    var info = `https://restaurants-foodie.firebaseio.com/restaurants.json`;
    console.log(info);
    var ratingData = new XMLHttpRequest();
    
    ratingData.addEventListener('load', function(){
      var ratings = JSON.parse(this.responseText);
      resolve(ratings);
    });
    ratingData.addEventListener('error', function(){
      reject();
    });
    ratingData.open("GET", info);
    ratingData.send();
  });
  }

  var listRestaurants = document.getElementById("restaurantList");

ratingsPrint();

  function ratingsPrint(){
    listRestaurants.innerHTML = ``;
    ratings()
      .then(
        function(ratings) {
            console.log(ratings.my_rating);
          Object.keys(ratings).forEach((item)=>{
            var list = (ratings[item]);

            console.log(list);

            // console.log(list.my_rating.orderBy(value));

            
            // var orderedRatings = [];
            // for (i = 0; i < list.length; i++) {
            //     var order = list.my_rating;
            //     var orderArray = order.sort();
            //     console.log(orderedRatings.push(orderArray));
            // };


            
            listRestaurants.innerHTML+= `<div>${list.restaurant}</div>`;
          });
        },
      );
    }



//   function ratingsPrint(){
//     listRestaurants.innerHTML = ``;
//     ratings()
//       .then(
//         function(ratings) {
//           ratingsList = ratings;
//           console.log("ratings list ", ratingsList);
//           Object.keys(ratings).forEach((item)=>{
//             var list = (ratings[item]);
//             console.log(list.id);
//             listRestaurants.innerHTML+= `<div class="restaurantList"></div>`;
//           });
//         },
//       );
//     }