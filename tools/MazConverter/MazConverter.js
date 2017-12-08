let base_unit = "Length";
let convertFrom = "Meter";
let convertTo = "Centimeter";

let unitDict;


function init(){
  let input_from = document.getElementById('conversion_from_input');
  let input_to = document.getElementById('conversion_to_input');

  input_from.oninput = function(){
    let convertFromExp = unitDict[base_unit][convertFrom];
    let convertToExp = unitDict[base_unit][convertTo];

    input_to.value = input_from.value*(Math.pow(10,convertFromExp-convertToExp));
  }

  input_to.oninput = function(){
    let convertFromExp = unitDict[base_unit][convertFrom];
    let convertToExp = unitDict[base_unit][convertTo];

    input_from.value = input_to.value*(Math.pow(10,convertToExp-convertFromExp));
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
    if(unitDict[base_unit].hasOwnProperty(key)) {
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
  })(unit);

  }

  unitChange();
}

function unitChange(){
  document.getElementById('conversion_from_unit').innerText = convertFrom;
  document.getElementById('conversion_to_unit').innerText = convertTo;

  let convertFromExp = unitDict[base_unit][convertFrom];
  let convertToExp = unitDict[base_unit][convertTo];

  let input_from = document.getElementById('conversion_from_input');
  let input_to = document.getElementById('conversion_to_input');

  input_to.value = input_from.value*(Math.pow(10,convertFromExp-convertToExp));
}

window.onload = function(){
  getDictJSON();
}
