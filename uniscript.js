function init(){
  var xhr= new XMLHttpRequest();
  xhr.open('GET', '/includes/footer.html', true);
  xhr.onreadystatechange= function() {
      if (this.readyState!==4) return;
      if (this.status!==200) return;
      let footer = document.createElement("div");
      footer.innerHTML = this.responseText
      document.body.appendChild(footer);
  };
  xhr.send();
}

init();
