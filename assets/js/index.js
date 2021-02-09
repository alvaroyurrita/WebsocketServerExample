import * as CrComLib from "@crestron/ch5-crcomlib";
import { bridgeReceiveIntegerFromNative, bridgeReceiveBooleanFromNative, bridgeReceiveStringFromNative, bridgeReceiveObjectFromNative } 
    from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib';
window['bridgeReceiveIntegerFromNative'] = bridgeReceiveIntegerFromNative;
window['bridgeReceiveBooleanFromNative'] = bridgeReceiveBooleanFromNative;
window['bridgeReceiveStringFromNative'] = bridgeReceiveStringFromNative;
window['bridgeReceiveObjectFromNative'] = bridgeReceiveObjectFromNative;

let buttonState = false;
let buttonValue = 0;

const button=document.querySelector(".demo");


CrComLib.subscribeState("n",11,(val)=>{
    console.log(`received value 11 ${val}`);
})

CrComLib.subscribeState("b",16,(state)=>{
    console.log(`received b-16 state ${state}`);
    if (state){
        button.className="demoActive";
    }
    else{
        button.className="demo";
    }
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