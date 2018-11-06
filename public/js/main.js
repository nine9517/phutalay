
$(window).on('resize', function(){
    $(".sidemenu > div").css("height",$(document).height()  +"px");
});
$(document).ready(function(){
    $.get("/getCustomer", function(data, status){
        console.log(data);
        $("#getCus").html();
        data.data.forEach((item,index)=>{  
            $("#getCus").append(
                '<option value="'+item._id+'">'+item.name+'</option>'
            );
        });
    });
    $.get("/getReservation", function(data, status){
        console.log(data);
        data.data.forEach((field,index)=>{
            var event={
                id:field._id ,
                title: field.customer_data[0].name,
                start: new Date(field.dateBooking.dateCheckStart),
                end: new Date(field.dateBooking.dateCheckEnd),
                backgroundColor: "#ec971f",
                borderColor: "#d58512",
                data:field
              };
              if(field.status==2){
                event.backgroundColor = "#999";
                event.borderColor = "#000";
              }else if(field.status==1){
                event.backgroundColor = "#5cb85c";
                event.borderColor = "#4cae4c";
              }
              $('#calendar').fullCalendar('renderEvent', event, true);
        });
        
    });
    $(".sidemenu > div").css("height",$(document).height()  +"px");
    
});
$('#calendar').fullCalendar({
    header: {
      left: 'title',
      center: '',
      right: 'today month,agendaWeek,agendaDay,listMonth prev,next'
    },
    editable: false,
    droppable: false,
    eventClick: function(calEvent, jsEvent, view) {
        console.log(calEvent.data);
        if(calEvent.data.status<1){
            checkinModal(calEvent);
        }
       
        
    }
      
  });
  var checkinModal = (calEvent)=>{

  }

  var checkinModal = (calEvent)=>{
    $.post("/getroombytype", {
        type : calEvent.data.roomType
      }, function(result){
        console.log(result);

        $("#checkInId").val(calEvent.data._id);
        $("#checkin_nameCus").html(calEvent.data.customer_data[0].name);
        $("#checkin_dateS").html(new Date(calEvent.data.dateBooking.dateCheckStart).toLocaleString());
        $("#checkin_dateE").html(new Date(calEvent.data.dateBooking.dateCheckEnd).toLocaleString());
        $("#checkin_price").html(calEvent.data.total.toLocaleString());
        $("#checkin_pay").html((calEvent.data.total-calEvent.data.remaining).toLocaleString());
        $("#checkin_remaining").html(calEvent.data.remaining.toLocaleString());
        $("#checkin_roomtype").html("");
        result.data.forEach((item)=>{
            $("#checkin_roomtype").append("<p>Room Type: "+item._id+"</p>");
            $("#checkin_roomtype").append('<select class="form-control select_'+item.name+'" name="roomchackin">');
            item.room.forEach((Room)=>{
                $(".select_"+item.name).append('<option value="'+Room._id+'">'+Room.name+' - '+Room.detail+'</option>');
            });
            $("#checkin_roomtype").append('</select>');
        });

        $("#checkinModal").modal('show');
  });
  }
  var searchRoom = ()=>{
      var RevDateS = $('#RevDateS').val();
      var RevDateE = $('#RevDateE').val();
        if(RevDateS=="" || RevDateE==""){
            return alert("Date Start or End is null!!");
        }
      console.log(RevDateS);
      console.log(RevDateE);

      var RevDateSM = new Date(RevDateS);
      var RevDateEM = new Date(RevDateE);
    
      console.log(RevDateSM.getTime());
      console.log(RevDateEM.getTime());

      $.post("/getRoomTypeBydate", {
          start : RevDateSM.getTime(),
          end : RevDateEM.getTime()
        }, function(result){
            $("#res_roomType").html("");
            result.data.forEach((item,index) => {
                $("#res_roomType").append(
                    '<tr class="'+item._id+'">'+
                        '<td>'+(index+1)+'</th>'+
                        '<td>'+item.price.toLocaleString()+'</td>'+
                       ' <td>'+item.use+'</td>'+
                       ' <td>'+item.count+'</td>'+
                       '<td><input type="number" name="reV_roomType_amount" min="0" max="'+(item.count-item.use)+'" '+((item.count-item.use<1)?"readonly":"")+' class="form-control" id="amount_'+item._id+'" value="0"/></td>'+
                       '<input type="hidden" name="reV_roomType_name" value="'+item._id+'"/>'+
                       '<input type="hidden" name="reV_roomType_price" value="'+item.price+'"/>'+
                    '</tr>'
                );
            });

        console.log(result);
    });
  }

  var addReservation = ()=>{
      $("#addModal").modal('hide');
    $("#reV_F").submit();
  };