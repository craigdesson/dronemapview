var yapromise = $.ajax({
    url: 'http://api.dronestre.am/data',
    dataType: 'JSONP',
    data: {}
});

var masterlist = [];
var currentPage = 1;
var itemsPerPage = 18;



// show page starts // 
function showPage(currentPage, masterlist, itemsPerPage) {

    var start = (currentPage * itemsPerPage) - itemsPerPage;

    var end = (currentPage * itemsPerPage);

    var $container = $(".mapImage");


    var droneContent = "<div class='row'>";


    for (var i = start; i < end; i++) {


        droneContent += "<div class='item'>" + masterlist[i].headline + masterlist[i].image + masterlist[i].narrativeText + "</div>";

        


        if (i === end - 1) {
            droneContent += "</div>";
        } else if ((i + 1) % 3 === 0) {


            droneContent += "<div class='clear'></div></div><div class='row'>";
        };

    };

    $container.append(droneContent);

}
// show page ends 

$.when(yapromise).done(function(droneData) {

    for (var i = droneData.strike.length - 1; i > 0; i--) {

       
        //create var for array data 
        var insta = droneData.strike[i];
        // date info starts
        var hitDate = insta.date;
        // setup date
        var dateDay = new Date(hitDate).getDate()+1;

        var dateYear = new Date(hitDate).getFullYear();

        var monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

        var dateMonth = new Date(hitDate);

        var theMonth = monthNames[dateMonth.getMonth()];

        var newdate = " | " + theMonth + " " + dateDay + ", " + dateYear;

        // date stuff ends // 

        var town;

        if (insta.town) {
            town = insta.town.split('/').pop();
        } else {
            town = insta.location;
        }

        //setup headline and narrative 

        var headline = "<div class='headline'>" + "<p>" + town + ", " + insta.country + " " + newdate + "</p></div>";
        var narrativeText = '<div class="narrativeText">' + '<p>' + insta.narrative + "</p></div>";

        //build the map

        var location;
        if (insta.lat) {
            location = insta.lat + "," + insta.lon;
        } else {
            location = insta.town.split('/').pop() + "," + insta.country;
        }
        var src = "http://maps.googleapis.com/maps/api/staticmap?center=" + location + "&zoom=16&scale=false&size=360x360&maptype=satellite&key=AIzaSyD9DSjqcGi3lzM_PqGZouVmsoybTneVXvM&format=png&visual_refresh=true"

        var image = "<img src='" + src + "'/>";

        // wrap headline, image and narrative text in an object // 

        var obj = {
            headline: headline,
            image: image,
            narrativeText: narrativeText
        };

        masterlist.push(obj);

    };


    showPage(currentPage, masterlist, 18);


$("#more").click(function() {
    currentPage++
    
    showPage(currentPage, masterlist, itemsPerPage);
    });


});









