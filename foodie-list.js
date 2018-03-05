// sort restaurants by rating

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
            console.log(ratings);

            for (i = 0; i < ratings.length; i++) {
                var order = ratings[i].my_rating;
                ratings.sort(function(a, b) {
                  return a.my_rating - b.my_rating;
                  
              });

              console.log(order);

              listRestaurants.innerHTML+= `<div>${ratings[i].restaurant}</div>`;

            };
          });

    }




// sort restaurants by city

function cities(){
  // console.log('get ratings individual call'); 
return new Promise((resolve,reject) => {
  var cityInfo = `https://cities-foodie.firebaseio.com/cities.json`;
  console.log(cityInfo);
  var cityData = new XMLHttpRequest();
  
  cityData.addEventListener('load', function(){
    var cities = JSON.parse(this.responseText);
    resolve(cities);
  });
  cityData.addEventListener('error', function(){
    reject();
  });
  cityData.open("GET", cityInfo);
  cityData.send();
});
}

var listRestaurants = document.getElementById("restaurantList");
var citySelect = document.getElementById("cities");
var nash = document.getElementById("nashville");

citiesPrint();

// populate selection tool

function citiesPrint(){
  listRestaurants.innerHTML = ``;
  cities()
    .then(
      function(cities) {
          console.log(cities);

          for (i = 0; i < cities.length; i++) {
              var order = cities[i];

            console.log(order);

            citySelect.innerHTML+= `<option value="${cities[i].id}">${cities[i].city}</option>`;

          };

// select cities and restaurants

    ratings()
      .then(
        function(ratings) {
          console.log("log", cities, ratings);
          var citySelect = document.getElementById("cities");
          citySelect.addEventListener("change", function(){

            listRestaurants.innerHTML = "";
            nash.innerHTML = "";


            console.log(citySelect.id);
            if (citySelect.value == "all") {
              for (i = 0; i < ratings.length; i++) {
                var order = ratings[i];
              listRestaurants.innerHTML += `<div>${ratings[i].restaurant}</div>`;

            }
          }

            for (i = 0; i < ratings.length; i++) {
              var order = ratings[i];


            if (order.city_id == citySelect.value) {
              console.log("cities", citySelect.value);
              listRestaurants.innerHTML += `<div>${ratings[i].restaurant}</div>`;
            }

            if (citySelect.value == 7) {
              nash.innerHTML = `<div>(HOMETOWN)<div>`;
            }

            }

        });

      });
    });
    }


    // add Restaurant

    addRestaurantButton = document.getElementById("submit");

    addRestaurantButton.addEventListener("submit", savedata());


    var messagesRef = new Firebase('https://restaurants-foodie.firebaseio.com/restaurants.json');
        
    var messageField = document.getElementById('messageInput');

    // Save data to firebase
    function savedata(){
      var message = messageField.value;

      messagesRef.push({fieldName:'messageField', text:message});
      messageField.value = '';
    }

//     // Get a reference to the database service
// var database = firebase.database();


//     function addRestaurant(uid, username, picture, title, body) {
//       // A post entry.
//       var postData = {
//         author: username,
//         uid: uid,
//         body: body,
//         title: title,
//         starCount: 0,
//         authorPic: picture
//       };
    
//       // Get a key for a new Post.
//       var newPostKey = firebase.database().ref().child('posts').push().key;
    
//       // Write the new post's data simultaneously in the posts list and the user's post list.
//       var updates = {};
//       updates['/posts/' + newPostKey] = postData;
//       updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    
//       return firebase.database().ref().update(updates);
//     }



    // function addStore(){
    //   var database = firebase.database();
    //   var rootRef = `https://restaurants-foodie.firebaseio.com/restaurants.json`;
    //   var storesRef = rootRef.child('restaurants');
    //   var newStoreRef = storesRef.push();
    //   newStoreRef.set({
    //     name: "Cars",
    //     "pageId": "23",
    //     "storeURL": "/app/cars/gallery"
    //   });
    // }


  //   buildRestaurantObj();

  //   function buildRestaurantObj() {
  //     let RestaurantObj = {
  //     restaurant: $("#form--title").val(),
  //     city_id: $("#form--artist").val(),
  //     date_visited: $("#form--album").val(),
  //     my_rating: $("#form--year").val()
  //   };
  //   return restaurantObj;
  //   console.log("restOb", restaurantObj);
  // }
  

  //   function addSong(songFormObj) {
  //     return $.ajax({
  //       url: `${firebase.getFBsettings().databaseURL}/songs.json`,
  //       type: 'POST',
  //       data: JSON.stringify(songFormObj),
  //       dataType: 'json' 
  //     }).done((songID) => {
  //       console.log("what is the new id?", songID);
  //       return songID;
  //     });
  //   }