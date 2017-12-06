
function init(){
  blendColors();

  // TO UPPER CASE ON INPUT
  let color_inputs = document.getElementsByClassName('color_input');
  for(color_input in color_inputs){
    let input = color_inputs[color_input];
    input.oninput = function(){
      input.value = input.value.toUpperCase();
      blendColors();
    }
  }

  var rSlider1 = document.getElementById("rRange1");
  var gSlider1 = document.getElementById("gRange1");
  var bSlider1 = document.getElementById("bRange1");

  // Update the current slider value (each time you drag the slider handle)
  rSlider1.oninput = function() {
      rangeChange();
  }

  gSlider1.oninput = function() {
      rangeChange();
  }

  bSlider1.oninput = function() {
      rangeChange();
  }

  var rSlider2 = document.getElementById("rRange2");
  var gSlider2 = document.getElementById("gRange2");
  var bSlider2 = document.getElementById("bRange2");

  rSlider2.oninput = function() {
      rangeChange();
  }

  gSlider2.oninput = function() {
      rangeChange();
  }

  bSlider2.oninput = function() {
      rangeChange();
  }

  let color_picker_button1 = document.getElementById('color_picker_button1');
  color_picker_button1.addEventListener("click",function(){
    toggleSliders1();
  });

  let color_picker_button2 = document.getElementById('color_picker_button2');
  color_picker_button2.addEventListener("click",function(){
    toggleSliders2();
  });

  let color_picker_close1 = document.getElementById('color_picker_close1');
  color_picker_close1.addEventListener("click",function(){
    toggleSliders1();
    color_picker_close1.style.pointerEvents ="none";
  });

  let color_picker_close2 = document.getElementById('color_picker_close2');
  color_picker_close2.addEventListener("click",function(){
    toggleSliders2();
    color_picker_close2.style.pointerEvents ="none";
  });
}


function toggleSliders1(){
  let color_inputs = document.getElementsByClassName('color_input');
  let color_picker1 = document.getElementById("slidecontainer1");
  var rSlider1 = document.getElementById("rRange1");
  var gSlider1 = document.getElementById("gRange1");
  var bSlider1 = document.getElementById("bRange1");
  if(color_picker1.style.opacity == "1"){
    color_picker1.style.opacity = "0";
    rSlider1.disabled = true;
    gSlider1.disabled = true;
    bSlider1.disabled = true;

    color_picker_close1.style.pointerEvents ="none";
  }else{
    rSlider1.value = getRed(color_inputs[0].value);
    gSlider1.value = getGreen(color_inputs[0].value);
    bSlider1.value = getBlue(color_inputs[0].value);
    color_picker1.style.opacity = "1";
    rSlider1.disabled = false;
    gSlider1.disabled = false;
    bSlider1.disabled = false;

    color_picker_close1.style.pointerEvents ="auto";
  }
}

function toggleSliders2(){
  let color_inputs = document.getElementsByClassName('color_input');
  let color_picker2 = document.getElementById("slidecontainer2");
  var rSlider2 = document.getElementById("rRange2");
  var gSlider2 = document.getElementById("gRange2");
  var bSlider2 = document.getElementById("bRange2");
  if(color_picker2.style.opacity == "1"){
    color_picker2.style.opacity = "0";
    rSlider2.disabled = true;
    gSlider2.disabled = true;
    bSlider2.disabled = true;

    color_picker_close2.style.pointerEvents ="none";
  }else{
    rSlider2.value = getRed(color_inputs[1].value);
    gSlider2.value = getGreen(color_inputs[1].value);
    bSlider2.value = getBlue(color_inputs[1].value);
    color_picker2.style.opacity = "1";
    rSlider2.disabled = false;
    gSlider2.disabled = false;
    bSlider2.disabled = false;

    color_picker_close2.style.pointerEvents ="auto";
  }
}

function getRed(col){
  let red;
  if(col[0] == "#"){
    red = parseInt(col.slice(1,3),16);
  }else if(col.slice(0,4) == "RGB("){
    red = col.slice(4,col.length-1).split(",")[0];
  }
  return red;
}

function getGreen(col){
  let green;
  if(col[0] == "#"){
    green = parseInt(col.slice(3,5),16);
  }else if(col.slice(0,4) == "RGB("){
    green = col.slice(4,col.length-1).split(",")[1];
  }
  return green;
}

function getBlue(col){
  let blue;
  if(col[0] == "#"){
    blue = parseInt(col.slice(5,7),16);
  }else if(col.slice(0,4) == "RGB("){
    blue = col.slice(4,col.length-1).split(",")[2];
  }
  return blue;
}

function rangeChange(){
  var rSlider1 = document.getElementById("rRange1");
  var gSlider1 = document.getElementById("gRange1");
  var bSlider1 = document.getElementById("bRange1");

  var rSlider2 = document.getElementById("rRange2");
  var gSlider2 = document.getElementById("gRange2");
  var bSlider2 = document.getElementById("bRange2");

  let inp1 = document.getElementsByClassName('color_input')[0];
  let inp2 = document.getElementsByClassName('color_input')[1];

  inp1.value = "RGB(" + rSlider1.value + "," + gSlider1.value + "," + bSlider1.value + ")";
  inp2.value = "RGB(" + rSlider2.value + "," + gSlider2.value + "," + bSlider2.value + ")";

  if(tooBright(inp1.value)){
    document.getElementById('color_slider_title1').style.color = "#212121";
  }else{
    document.getElementById('color_slider_title1').style.color = "#eee";
  }

  if(tooBright(inp2.value)){
    document.getElementById('color_slider_title2').style.color = "#212121";
  }else{
    document.getElementById('color_slider_title2').style.color = "#eee";
  }

  blendColors();
}

function blendColors(){
  // GET FIRST COLOR
  let _inp1 = document.getElementsByClassName('color_input')[0];
  let _col1 = _inp1.value;

  // GET SECOND COLOR
  let _inp2 = document.getElementsByClassName('color_input')[1];
  let _col2 = _inp2.value;

  document.getElementById('color_slider_title1').style.background = _col1;
  document.getElementById('color_slider_title2').style.background = _col2;

  let result_string;
  let result_string_dark;

  // DETERMINE COLOR FORMAT
  if((_col1[0] == parseInt(_col1[0]) && _col2[0] == parseInt(_col2[0]) && _col1.split(",").length > 1 && _col2.split(",").length > 1) || _col1.slice(0,4) == "RGB(" && _col2.slice(0,4) == "RGB("){
    result_string = getFromRGB(_col1,_col2);
    if(result_string != undefined){
      result_string_dark = getDarkerRGB(result_string);
    }
  }else if(_col1[0] == "#" || _col2[0] == "#"){

    // ADD '#' IF MISSING
    if(_col1[0] != "#"){
      _inp1.value = "#" + _inp1.value;
    }

    if(_col2[0] != "#"){
      _inp2.value = "#" + _inp2.value;
    }

    result_string = getFromHEX(_col1,_col2,false);
    if(result_string != undefined){
      result_string_dark = getDarkerHEX(result_string);
    }
  }else{
    return;
  }

  if(result_string == undefined){
    // DISPLAY INVALID INPUT MSG
    document.getElementById('result_text').innerHTML = "Invalid input";
    return;
  }

  if(tooBright(result_string)){
    document.getElementById('blend_area').className = "darkText";
  }else{
    document.getElementById('blend_area').className = "lightText";
  }

  // CHANGE BODY BACKGROUND TO RESULT COLOR
  document.body.style.background = result_string;
  document.getElementById("main_header_div").style.background = result_string_dark;
  // DISPLAY RESULT TEXT
  document.getElementById('result_text').innerHTML = result_string;
}

function getFromHEX(col1,col2,display){
  let inp1 = document.getElementsByClassName('color_input')[0];

  // CHECK FOR SHORT HEX VERSION (#eeeeee --> #eee)
  if(col1.length == 4){
    col1 = "#" + col1[1] + col1[1] + col1[2] + col1[2] + col1[3] + col1[3];
    if(display){
      inp1.value = col1;
    }
  }

  // GET RGB HEX VALUES
  let r1_str = col1.slice(1,3);
  let g1_str = col1.slice(3,5);
  let b1_str = col1.slice(5,7);

  // CONVERT TO DECIMAL
  let r1 = parseInt(r1_str,16);
  let g1 = parseInt(g1_str,16);
  let b1 = parseInt(b1_str,16);


  let inp2 = document.getElementsByClassName('color_input')[1];

  // CHECK FOR SHORT HEX VERSION (#eeeeee --> #eee)
  if(col2.length == 4){
    col2 = "#" + col2[1] + col2[1] + col2[2] + col2[2] + col2[3] + col2[3];
    if(display){
      inp2.value = col2;
    }
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

  if(isNaN(rx_10) || isNaN(gx_10) || isNaN(bx_10)){
    return undefined;
  }

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

function getFromRGB(_col1,_col2){
  let col1 = _col1;
  let col2 = _col2;

  let inp1 = document.getElementsByClassName('color_input')[0];
  let inp2 = document.getElementsByClassName('color_input')[1];

  if(col1.slice(0,4) == "RGB("){
    col1 = col1.slice(4);
    col1 = col1.slice(0,col1.length-1);
  }

  if(col2.slice(0,4) == "RGB("){
    col2 = col2.slice(4);
    col2 = col2.slice(0,col2.length-1);
  }

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

  let result_string = "RGB(" + rx + "," + gx + "," + bx + ")";

  return result_string;
}

function getDarkerHEX(col){
  return getFromHEX(col,"#000",false);
}

function getDarkerRGB(col){
  return getFromRGB(col,"0,0,0");
}

function tooBright(col){
  let red = getRed(col);
  let green = getGreen(col);
  let blue = getBlue(col);

  if((red*0.299 + green*0.587 + blue*0.114) > 186){
    return true;
  }
  return false;
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

window.onload = function(){
  init();
}
