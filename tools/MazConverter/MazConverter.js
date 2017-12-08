let base_unit = "Length";
let convertFrom = "Meter";
let convertTo = "Centimeter";

let unitDict;


function init(){
  let input_from = document.getElementById('conversion_from_input');
  let input_to = document.getElementById('conversion_to_input');



  input_from.oninput = function(){
    input_to.value = input_from.value*getConvertedValue();
  }

  input_to.oninput = function(){
    input_from.value = input_to.value*getConvertedValue();
  }

  // BASE UNIT
  let base_unit_dropdown = document.getElementById('base_unit_dropdown');
  let base_children = base_unit_dropdown.children;

  for(n=0;n<base_children.length;n++){
    let node = base_children[n]; // DROPDOWN OPTION NODE
    node.onclick = function(){
      base_unit = node.innerText;
      baseUnitChange()
    };
  }

  // CONVERT FROM
  let unit_dropdown_from = document.getElementById('conversion_from_dropdown');
  let from_children = unit_dropdown_from.children;

  for(n=0;n<from_children.length;n++){
    let node = from_children[n]; // DROPDOWN OPTION NODE
    node.onclick = function(){
      convertFrom = node.innerText;
      unitChange();
    };
  }


  // CONVERT TO
  let unit_dropdown_to = document.getElementById('conversion_to_dropdown');
  let to_children = unit_dropdown_to.children;

  for(n=0;n<to_children.length;n++){
    let node = to_children[n]; // DROPDOWN OPTION NODE
    node.onclick = function(){
      convertTo = node.innerText;

      unitChange();
    };
  }

  baseUnitChange();
}

function getDictJSON(){
  var xhr= new XMLHttpRequest();
  xhr.open('GET', 'unitDict.json', true);
  xhr.onreadystatechange= function() {
      if (this.readyState!==4) return;
      if (this.status!==200) return;
      unitDict = JSON.parse(this.responseText);
      init();
  };
  xhr.send();
}

function baseUnitChange(){
  document.getElementById('base_unit').innerText = base_unit;
  for(var key in unitDict[base_unit]) {
    if(unitDict[base_unit].hasOwnProperty(key) && unitDict[base_unit][key] != "div") {
      console.log(key);
        convertFrom = key;
        break;
    }
  }
  convertTo = convertFrom;

  let from_dropdown = document.getElementById('conversion_from_dropdown');
  let to_dropdown = document.getElementById('conversion_to_dropdown');

  from_dropdown.innerHTML = "";
  to_dropdown.innerHTML = "";

  for(var unit in unitDict[base_unit]){(function(unit){
    if(unitDict[base_unit][unit] == "div"){
      var divider_from = document.createElement("h1");
      divider_from.innerText = unit;

      from_dropdown.appendChild(divider_from);

      var divider_to = document.createElement("h1");
      divider_to.innerText = unit;

      to_dropdown.appendChild(divider_to);
    }else{
      var item_from = document.createElement("p");
      item_from.innerText = unit;
      item_from.onclick =
        function(){
          convertFrom = unit;
          unitChange();
        };

      from_dropdown.appendChild(item_from);

      var item_to = document.createElement("p");
      item_to.innerText = unit;
      item_to.onclick =
        function(){
          convertTo = unit;
          unitChange();
        };
      to_dropdown.appendChild(item_to);
    }
  })(unit);

  }

  unitChange();
}

function getConvertedValue(){
  let convertFromFactor = eval(unitDict[base_unit][convertFrom]);
  let convertToFactor = eval(unitDict[base_unit][convertTo]);

  var _cf = (function() {
    function _shift(x) {
      var parts = x.toString().split('.');
      return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length);
    }
    return function() {
      return Array.prototype.reduce.call(arguments, function (prev, next) { return prev === undefined || next === undefined ? undefined : Math.max(prev, _shift (next)); }, -Infinity);
    };
  })();

  Math.a = function () {
    var f = _cf.apply(null, arguments); if(f === undefined) return undefined;
    function cb(x, y, i, o) { return x + f * y; }
    return Array.prototype.reduce.call(arguments, cb, 0) / f;
  };

  Math.s = function (l,r) { var f = _cf(l,r); return (l * f - r * f) / f; };

  Math.m = function () {
    var f = _cf.apply(null, arguments);
    function cb(x, y, i, o) { return (x*f) * (y*f) / (f * f); }
    return Array.prototype.reduce.call(arguments, cb, 1);
  };

  Math.d = function (l,r) { var f = _cf(l,r); return (l * f) / (r * f); };

  return Math.d(convertFromFactor,convertToFactor);
}

function unitChange(){
  document.getElementById('conversion_from_unit').innerText = convertFrom;
  document.getElementById('conversion_to_unit').innerText = convertTo;

  let input_from = document.getElementById('conversion_from_input');
  let input_to = document.getElementById('conversion_to_input');

  input_to.value = input_from.value*getConvertedValue();
}

window.onload = function(){
  getDictJSON();
}
