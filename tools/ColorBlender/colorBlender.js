
function init(){
  let blend_button = document.getElementById('blend_colors_button');
  blend_button.onclick = function(){

    // GET FIRST COLOR
    let _inp1 = document.getElementsByClassName('color_input')[0];
    let _col1 = _inp1.value;

    // GET SECOND COLOR
    let _inp2 = document.getElementsByClassName('color_input')[1];
    let _col2 = _inp2.value;

    let result_string;

    // DETERMINE COLOR FORMAT
    if(_col1[0] == parseInt(_col1[0]) && _col2[0] == parseInt(_col2[0]) && _col1.split(",").length > 1 && _col2.split(",").length > 1){
      result_string = getFromRGB();
    }else if(_col1[0] == "#" || _col2[0] == "#"){

      // ADD '#' IF MISSING
      if(_col1[0] != "#"){
        _inp1.value = "#" + _inp1.value;
      }

      if(_col2[0] != "#"){
        _inp2.value = "#" + _inp2.value;
      }

      result_string = getFromHEX();
    }

    // CHANGE BODY BACKGROUND TO RESULT COLOR
    document.body.style.background = result_string;

    // DISPLAY RESULT TEXT
    document.getElementById('result_text').innerHTML = result_string;

  };

  // TO UPPER CASE ON INPUT
  let color_inputs = document.getElementsByClassName('color_input');
  for(color_input in color_inputs){
    let input = color_inputs[color_input];
    input.oninput = function(){
      input.value = input.value.toUpperCase();
    }
  }
}

function getFromHEX(){
  // GET FIRST COLOR
  let inp1 = document.getElementsByClassName('color_input')[0];
  let col1 = inp1.value;

  // CHECK FOR SHORT HEX VERSION (#eeeeee --> #eee)
  if(col1.length == 4){
    col1 = "#" + col1[1] + col1[1] + col1[2] + col1[2] + col1[3] + col1[3];
    inp1.value = col1;
  }

  // GET RGB HEX VALUES
  let r1_str = col1.slice(1,3);
  let g1_str = col1.slice(3,5);
  let b1_str = col1.slice(5,7);

  // CONVERT TO DECIMAL
  let r1 = parseInt(r1_str,16);
  let g1 = parseInt(g1_str,16);
  let b1 = parseInt(b1_str,16);

  // GET SECOND COLOR
  let inp2 = document.getElementsByClassName('color_input')[1];
  let col2 = inp2.value;

  // CHECK FOR SHORT HEX VERSION (#eeeeee --> #eee)
  if(col2.length == 4){
    col2 = "#" + col2[1] + col2[1] + col2[2] + col2[2] + col2[3] + col2[3];
    inp2.value = col2;
  }

  // CONVERT TO DECIMAL
  let r2_str = col2.slice(1,3);
  let g2_str = col2.slice(3,5);
  let b2_str = col2.slice(5,7);

  let r2 = parseInt(r2_str,16);
  let g2 = parseInt(g2_str,16);
  let b2 = parseInt(b2_str,16);

  // COLOR BLENDING
  let rx_10 = Math.round((r1+r2)/2);
  let gx_10 = Math.round((g1+g2)/2);
  let bx_10 = Math.round((b1+b2)/2);

  // CONVERT BACK TO HEXADECIMAL
  let rx = addZero(rx_10.toString(16));
  rx = rx.toUpperCase();
  let gx = addZero(gx_10.toString(16));
  gx = gx.toUpperCase();
  let bx = addZero(bx_10.toString(16));
  bx = bx.toUpperCase();

  // CREATE AND RETURN FINAL STRING
  let result_string = "#" + rx + gx + bx;
  return result_string;


}

function addZero(s){
  let n;
  if(s.length == 1){
    n = "0" + s;
  }else{
    n = s;
  }
  return n
}

function getFromRGB(){
  let inp1 = document.getElementsByClassName('color_input')[0];
  let col1 = inp1.value;

  let inp2 = document.getElementsByClassName('color_input')[1];
  let col2 = inp2.value;

  let vals1 = col1.split(",");
  let vals2 = col2.split(",");

  let r1 = parseInt(vals1[0]);
  let g1 = parseInt(vals1[1]);
  let b1 = parseInt(vals1[2]);

  let r2 = parseInt(vals2[0]);
  let g2 = parseInt(vals2[1]);
  let b2 = parseInt(vals2[2]);

  let rx = Math.round((r1+r2)/2);
  let gx = Math.round((g1+g2)/2);
  let bx = Math.round((b1+b2)/2);

  let result_color = rx + "," + gx + "," + bx;

  console.log(result_color);

  let result_string = "rgb(" + result_color + ")";

  return result_string;
}

window.onload = function(){
  init();
}
