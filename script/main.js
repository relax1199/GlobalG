$(document).ready(function(){
$( 'textarea.editor' ).ckeditor();
$(".news").click(function(){
        $("#news_item").css({"display":"block"});
        $("#update_item").css({"display":"none"});
    })
    $(".update").click(function(){
        $("#update_item").css({"display":"block"});
        $("#news_item").css({"display":"none"});
    })
})
