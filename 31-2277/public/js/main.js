$(document).ready(function(){
 $("body").click(function(){
 $.get("/api/quote",function(data,status){
 $('blockquote.quote').text(data.text);
 $('.author').text(data.author)
 });
  $("body").css('background-color', getRandomColor());

 });

});

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}