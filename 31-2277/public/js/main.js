$(document).ready(function(){
 $("body").click(function(){
 $.get("/api/quote",function(data,status){
 $("body").css('backgroud-color', 'blue')
 $('blockquote.quote').text(data.text);
 $('.author').text(data.author)
 });
 });

});