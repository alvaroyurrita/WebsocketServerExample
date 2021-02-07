import * as CrComLib from "./cr-com-lib";

let buttonState = false;
let buttonValue = 0;

const button=document.querySelector(".demo");

CrComLib.subscribeState("n","12",(value)=>{
    document.getElementById('theSlider').value = value;
})


button.addEventListener("click",() =>{
    buttonState = !buttonState
    console.log(`We pressed the button. State is: ${buttonState}`);
    CrComLib.publishEvent("b","1",buttonState);
    CrComLib.publishEvent("n","1",++buttonValue%10);
    if (buttonState){
        button.className="demoActive";
        CrComLib.publishEvent("s","1","Button Pressed");
    }
    else{
        button.className="demo";
        CrComLib.publishEvent("s","1","Button Release");
    }
});