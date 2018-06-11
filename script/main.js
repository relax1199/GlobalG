$(document).ready(function(){
$( 'textarea.editor' ).ckeditor();
    $(".news").click(function(){
        $("#news_item").css({"display":"block"});
        $("#update_item").css({"display":"none"});
        $("#news_item_edit_delete").css({"display":"none"});
        $("#update_item_edit_delete").css({"display":"none"});
    })
    $(".update").click(function(){
        $("#update_item").css({"display":"block"});
        $("#news_item").css({"display":"none"});
        $("#news_item_edit_delete").css({"display":"none"});
        $("#update_item_edit_delete").css({"display":"none"});
    })
    $('#decNews').click(function(){
        $("#update_item").css({"display":"none"});
        $("#news_item").css({"display":"none"});
        $("#update_item_edit_delete").css({"display":"none"});
        $("#news_item_edit_delete").css({"display":"block"});
    })
    decUpdate
    $('#decUpdate').click(function(){
        $("#update_item").css({"display":"none"});
        $("#news_item").css({"display":"none"});
        $("#news_item_edit_delete").css({"display":"none"});
        $("#update_item_edit_delete").css({"display":"block"});
    })
    $('.btn.addNews').click(function(){
        var file = $('#newsImg')[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            $.ajax({
                url:'/addNews',
                type:'POST',
                data:{
                    newsTitle:$('#title_news').val(),
                    newsContent:$('#contentNews').val(),
                    newsTime:formatDate(),
                    fileName:file.name,
                    data:reader.result
                }
            }).done(function(res){
                if(res){
                    alert("News send done!");
                    location.reload();
                }
            })
        }
    })

    $('.btn.addUpdate').click(function(){
        $.ajax({
            url:'/addUpdate',
            type:'POST',
            data:{
                updateTitle:$('#title_update').val(),
                updateContent:$('#contantUpdate').val(),
                updateTime:formatDate()
            }
        }).done(function(res){
            if(res){
                alert("Update send done!");
                location.reload();
            }
        })
    })

    $('.btn.deleteNews').click(function(){
        $.ajax({
            url:'/newsDelete',
            type:'POST',
            data:{
                id:$(this).attr('data-id')
            }
        }).done(function(res){
            if(res){
                alert("News delete done!");
                location.reload();
            }
        })
    })

    $('.btn.deleteUpdate').click(function(){
        $.ajax({
            url:'/updateDelete',
            type:'POST',
            data:{
                id:$(this).attr('data-id')
            }
        }).done(function(res){
            if(res){
                alert("Update delete done!");
                location.reload();
            }
        })
    })

    $('.btn.editUpdate').click(function(){
       $('.edit_forma').css({display:"block"});
       $('#edit_update_item').css({display:"block"});
       $('#edit_news_item').css({display:"none"});
       var id = $(this).attr('data-id');
       $.ajax({
           url:'/getUpdate',
           type:'POST',
           data:{
               id:id
           }
       }).done(function(res){
           if(res){
               $('#title_edit_update').val(res[0].title);
               $('#contantEditUpdate').val(res[0].content);
               $('.editSendUpdate').click(function(){
                    $.ajax({
                        url:'/updateUpdate',
                        type:'POST',
                        data:{
                            title:$('#title_edit_update').val(),
                            content:$('#contantEditUpdate').val(),
                            time:formatDate(),
                            id:id
                        }
                    }).done(function(res){
                    if(res)
                        location.reload();
                    })
                })
            }
       })
    })

    $('.btn.editNews').click(function(){
        $('.edit_forma').css({display:"block"});
        $('#edit_update_item').css({display:"none"});
        $('#edit_news_item').css({display:"block"});
        var id = $(this).attr('data-id');
        $.ajax({
            url:'/getNews',
            type:'POST',
            data:{
                id:id
            }
        }).done(function(res){
            if(res){
                $('#title_edit_news').val(res[0].title);
                $('#contentEditNews').val(res[0].content);
                $('.editSendNews').click(function(){
                    var file = $('#updateNewsImg')[0].files[0];
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function(){
                        $.ajax({
                            url:'/updateNews',
                            type:'POST',
                            data:{
                                title:$('#title_edit_news').val(),
                                content:$('#contentEditNews').val(),
                                time:formatDate(),
                                fileName:file.name,
                                id:id,
                                data:reader.result
                            }
                        }).done(function(res){
                            if(res)
                                location.reload();
                        })
                    }
                })
            }
        })
     })
     

    $('.btn.editNews').click(function(){
        $('.edit_forma').css({display:"block"});
        $('#edit_update_item').css({display:"none"});
        $('#edit_news_item').css({display:"block"});
    
     })
     
    $('.close').click(function(){
        $('.edit_forma').css({display:"none"})
    })

    function formatDate() {
        var date = new Date();
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        var yy = date.getFullYear() % 100;
        yy = '20' + yy;
        return  time = dd + '.' + mm + '.' + yy;
      }
})
