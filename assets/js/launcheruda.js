import * as eruda from 'eruda'

console.log("loading launcheruda");

document.getElementById("RunEruda").addEventListener("click", () => {
  RunEruda()
})


const el = document.createElement('div');
document.body.appendChild(el);

function RunEruda() {
  console.log("Runngin Eruda Script");
  var script = document.createElement('script');
  script.src = "node_modules/eruda/eruda.js";
  document.body.appendChild(script);
  script.onload = function () {
    console.log("Script Loaded, runing Eruda")
    eruda.init({
      container: el,
      tool: ['console', 'network'],
      useShadowDom: true,
      autoScale: true,
      defaults: {
        displaySize: 50,
        transparency: 0.9,
        theme: 'Monokai Pro'
      }
    })
  }
}