let formats = ["HEX","RGB","HSL"];

let from_format;
let to_format;


function init(){
  let convert_from_options = document.getElementById('convert_from_dropdown').children;
  for(c in convert_from_options){
    let child = convert_from_options[c];
    child.onclick = function(){
      changeFromFormat(child.innerText);
    }
  }
  let convert_to_options = document.getElementById('convert_to_dropdown').children;
  for(c in convert_to_options){
    let child = convert_to_options[c];
    child.onclick = function(){
      changeToFormat(child.innerText);
    }
  }

  let convert_from_input = document.getElementById('convert_from_input');
  let convert_to_input = document.getElementById('convert_to_input');

  convert_from_input.oninput = function(){
    convert_to_input.value = convert();
  }

  document.getElementById('convert_from_input_R').oninput = function(){
    convert_to_input.value = convert();
  }

  document.getElementById('convert_from_input_G').oninput = function(){
    convert_to_input.value = convert();
  }

  document.getElementById('convert_from_input_B').oninput = function(){
    convert_to_input.value = convert();
  }

  document.getElementById('convert_from_input_H').oninput = function(){
    convert_to_input.value = convert();
  }

  document.getElementById('convert_from_input_S').oninput = function(){
    convert_to_input.value = convert();
  }

  document.getElementById('convert_from_input_L').oninput = function(){
    convert_to_input.value = convert();
  }

  changeFromFormat("HEX");
  changeToFormat("RGB");

  updateDropdowns();
}

function updateDropdowns(){
  let convert_from_dropdown = document.getElementById('convert_from_dropdown');
  let convert_to_dropdown = document.getElementById('convert_to_dropdown');

  while (convert_from_dropdown.hasChildNodes()) {
    convert_from_dropdown.removeChild(convert_from_dropdown.firstChild);
  }

  while (convert_to_dropdown.hasChildNodes()) {
    convert_to_dropdown.removeChild(convert_to_dropdown.firstChild);
  }

  for(o=0;o<formats.length;o++){(function(o){
    if(formats[o] != from_format){
      let from_option = document.createElement("p");
      from_option.innerText = formats[o];
      from_option.addEventListener("click",function(){
        changeFromFormat(formats[o]);
      });
      convert_from_dropdown.appendChild(from_option);
    }
    if(formats[o] != to_format){
      let to_option = document.createElement("p");
      to_option.innerText = formats[o];
      to_option.addEventListener("click",function(){
        changeToFormat(formats[o]);
      });
      convert_to_dropdown.appendChild(to_option);
    }
  })(o);
  }

  convert_to_input.value = convert();
}

function changeFromFormat(f){
  if(f == to_format){
    _from_format = from_format;
    from_format = f;
    changeToFormat(_from_format);
  }
  if(f == "RGB"){
    document.getElementById('convert_from_input').style.display = "none";
    document.getElementById('convert_from_input_RGB').style.display = "block";
    document.getElementById('convert_from_input_HSL').style.display = "none";
  }else if(f == "HSL"){
    document.getElementById('convert_from_input').style.display = "none";
    document.getElementById('convert_from_input_HSL').style.display = "block";
    document.getElementById('convert_from_input_RGB').style.display = "none";
  }else{
    document.getElementById('convert_from_input').style.display = "block";
    document.getElementById('convert_from_input_RGB').style.display = "none";
    document.getElementById('convert_from_input_HSL').style.display = "none";
  }
  from_format = f;
  document.getElementById('convert_from_title').innerText = f;
  updateDropdowns();
}

function changeToFormat(f){
  if(f == from_format){
    _to_format = to_format;
    to_format = f;
    changeFromFormat(_to_format);
  }
  to_format = f;
  document.getElementById('convert_to_title').innerText = f;
  updateDropdowns();
}

function convert(){

  let convert_from_input = document.getElementById('convert_from_input');
  let convert_to_input = document.getElementById('convert_to_input');

  switch (to_format) {
    case "HEX":
      let hex = toHEX(convert_from_input.value);
      return hex;
    case "RGB":
      return toRGB(convert_from_input.value);
    case "CMYK":
      return toCMYK(convert_from_input.value);
    case "HSL":
      return toHSL(convert_from_input.value);
  }
}

function toHEX(color){
  let hex_value;

  // CHECK FROM FORMAT
  switch (from_format) {
    case "HEX":
      hex_value = fromHEXtoHEX(color);
      break;
    case "RGB":
      hex_value = fromRGBtoHEX(
        document.getElementById('convert_from_input_R').value,
        document.getElementById('convert_from_input_G').value,
        document.getElementById('convert_from_input_B').value);
      break;
    case "CMYK":
      hex_value = fromCMYKtoHEX(color);
      break;
    case "HSL":
      hex_value = fromHSLtoHEX(
        document.getElementById('convert_from_input_H').value,
        document.getElementById('convert_from_input_S').value,
        document.getElementById('convert_from_input_L').value);
      break;
  }

  document.body.style.background = hex_value;

  return hex_value;
}

function fromHEXtoHEX(color){
  // FORMAT CHECK
  return color[0] == "#" ? (color.length == 4  ? color + color.slice(1,4) : (color.length == 7 ? color : "")) : "";
}

function fromRGBtoHEX(r,g,b){

  // EXCEPTION: CHECK IF RGB VALUES HAVE BEEN ENTERED
  if(r.length < 1 || g.length < 1 || b.length < 1){
    return "";
  }

  // EXCEPTION: CHECK IF RGB VALUES ARE OUT OF RANGE OR NAN
  if((r > 255 || r < 0) || (g > 255 || g < 0) || (b > 255 || b < 0)){
    return "";
  }

  // RETURN IF NO EXCEPTIONS
  return "#" + parseInt(r).toString(16) + parseInt(g).toString(16) + parseInt(b).toString(16);
}

function fromCMYKtoHEX(color){

}

function fromHSLtoHEX(h,s,l){
  let H = h/360;
  let S = s/100;
  let L = l/100;

  let temporary_1;

  if(L < 0.5){
    temporary_1 = L * (1.0+S);
  }else{
    temporary_1 = L + S - L * S;
  }

  let temporary_2 = 2 * L - temporary_1;

  let temporary_R = H + 0.333;
  temporary_R = temporary_R > 1 ? temporary_R - 1 : temporary_R;

  let temporary_G = H;

  let temporary_B = H - 0.333;

  temporary_B = temporary_B < 0 ? temporary_B + 1 : temporary_B;

  let R;
  let G;
  let B;

  if((6*temporary_R)<1){
    R = temporary_2 + (temporary_1 - temporary_2) * 6 * temporary_R;
  }else if(2*temporary_R<1){
    R = temporary_1;
  }else if(3*temporary_R<2){
    R = temporary_2 + (temporary_1 - temporary_2) * (0.666 - temporary_R) * 6;
  }else{
    R = temporary_2;
  }

  R*=255;

  if((6*temporary_G)<1){
    G = temporary_2 + (temporary_1 - temporary_2) * 6 * temporary_G;
  }else if(2*temporary_G<1){
    G = temporary_1;
  }else if(3*temporary_G<2){
    G = temporary_2 + (temporary_1 - temporary_2) * (0.666 - temporary_G) * 6;
  }else{
    G = temporary_2;
  }

  G*=255;

  if((6*temporary_B)<1){
    B = temporary_2 + (temporary_1 - temporary_2) * 6 * temporary_B;
  }else if(2*temporary_B<1){
    B = temporary_1;
  }else if(3*temporary_B<2){
    B = temporary_2 + (temporary_1 - temporary_2) * (0.666 - temporary_B) * 6;
  }else{
    B = temporary_2;
  }

  B*=255;

  let r_hex = Math.round(R).toString(16);
  let g_hex = Math.round(G).toString(16);
  let b_hex = Math.round(B).toString(16);

  return "#" + r_hex + g_hex + b_hex;
}

function toRGB(color){
  let hex_value = toHEX(color);

  let r = parseInt(hex_value.slice(1,3),16);
  let g = parseInt(hex_value.slice(3,5),16);
  let b = parseInt(hex_value.slice(5,7),16);

  if(!isNaN(r) && !isNaN(g) && !isNaN(b)){
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  return "";
}

function toCMYK(color){
  let hex_value = toHEX(color);
}

function toHSL(color){
  let hex_value = toHEX(color);

  let r = parseInt(hex_value.slice(1,3),16);
  let g = parseInt(hex_value.slice(3,5),16);
  let b = parseInt(hex_value.slice(5,7),16);

  let r_8bit = r/255;
  let g_8bit = g/255;
  let b_8bit = b/255;

  let arr = [r_8bit,g_8bit,b_8bit];
  let max = Math.max(...arr);
  let min = Math.min(...arr);

  let L = (max+min)/2;

  let S;

  if(max == min){
    S = 0;
  }else{
    if(L < 0.5){
      S = (max-min)/(max+min);
    }else{
      S = (max-min)/(2.0-max-min);
    }
  }

  L = Math.round(L*100);
  S = Math.round(S*100);

  let H;

  if(max == min){
    H = 0;
  }
  else if(max == r_8bit){
    H = (g_8bit-b_8bit)/(max-min);
  }else if(max == g_8bit){
    H = 2.0 + (b_8bit-r_8bit)/(max-min);
  }else{
    H = 4.0 + (r_8bit-g_8bit)/(max-min);
  }

  H *= 60;

  H = H < 0 ? H+360 : H;

  H = Math.round(H);

  if(isNaN(H) || isNaN(S) || isNaN(L)){
    return "";
  }

  return "hsl(" + H + "," + S + "%," + L + "%)";

}

window.onload = function(){
  init();
}
