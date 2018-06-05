$(function(){
$(window).scroll(function() {
var top = $(document).scrollTop();
if (top < 66) $("#Container_01").css({top: '0', width: '100%', position: 'relative'});
else $("#Container_01").css({top: '0', width: '100%', position: 'fixed'});
});
});
