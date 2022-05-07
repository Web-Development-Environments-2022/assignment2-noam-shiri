function keyChoose(input){
    $(document).keydown(function(event) {
        if(input.id == "upSelect")
            input.value = event.code;
            // console.log(event.keyCode);
  });
}
