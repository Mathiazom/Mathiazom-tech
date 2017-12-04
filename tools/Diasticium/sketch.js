var sampletxt;

function textAreaAdjust(o) {
  o.style.height = "1px";
  o.style.height = (25+o.scrollHeight)+"px";
}

function runDiasticify(){

  var textInput = document.getElementById('textinput').value;
  var textInputLength = textInput.length;
  var seedInput = (document.getElementById('seedinput').value).toLowerCase();
  var seedInputLength = seedInput.length;

  makeWords = function(str){
    str = str.toLowerCase();
    return str.trim().split(/[\s,]+/);
  };

  words = makeWords(textInput);


  console.log(words);

  var wordsLength = words.length;


  var maxLength = 0;
  var maxLenghtWord = "";

  for(k=0;k<wordsLength;k++){
    var temp_length = words[k].length;
    if(temp_length > maxLength){
      maxLength = temp_length;
      maxLenghtWord = words[k];
    }
  }

  if(maxLength < seedInputLength || seedInputLength < 1){
    document.getElementById('seedinput').className += " boxShadow";
    console.log("test");
    return;
  }

  var diasticWords = [];
  var diasticString = "";

  var buffer = 1;

  for(i=0;i<seedInputLength;i++){
    for(j=0;j<wordsLength;j++){
      if(seedInput[i] == (words[j])[i] && words[j].length > i){
        diasticWords.push(words[j]);
        diasticString = diasticString + " " + words[j];
        i = i + 1;
      }
    }
    if(diasticWords.length < i+buffer && i<seedInputLength){
      diasticString = diasticString + " ... ";
      buffer = buffer + 1;
      console.log(buffer);
    }
  }

  if(diasticWords.length != seedInputLength){
      document.getElementById('errorLabel').style.display = "block";
  }

  var resultText = document.getElementById('resultText');
  var resultDIV = document.getElementById('resultDIV');
  resultText.innerHTML = diasticString;
  document.getElementById('resultDIV').style.display = "block";
  document.getElementById('textInputLabel').style.display = "none";
  document.getElementById('seedInputDIV').style.display = "none";
  document.getElementById('usedInputDIV').style.display = "none";
  document.getElementById('sampleButton').style.display = "none";
  document.getElementById('runButton').style.display = "none";
  document.getElementById('showUsedInput').style.display = "block";
}

function useSampleText(){
  document.getElementById('textinput').style.display = "none";
  document.getElementById('sampleLoadImg').style.display = "block";

  lipsum = new LoremIpsum();
  sampletext = lipsum.generate(1000);
  document.getElementById('textinput').value = sampletext;

  document.getElementById('textinput').style.display = "block";
  textAreaAdjust(document.getElementById('textinput'));
  document.getElementById('sampleLoadImg').style.display = "none";
  document.getElementById('runButton').style.display = "inline";
}

function showUsedInput(){
  $('#usedInputDIV').toggle();
  if(document.getElementById('showUsedInput').innerHTML == "Show used input"){
    document.getElementById('showUsedInput').innerHTML = "Hide used input";
  }else{
    document.getElementById('showUsedInput').innerHTML = "Show used input";
  }

}

function showRun(inputtemp){
  if(inputtemp.value.length < 1){
    document.getElementById('runButton').style.display = "none";
  }else{
    document.getElementById('runButton').style.display = "inline";
  }
}
