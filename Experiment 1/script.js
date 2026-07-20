let chart;



function calculate(){



let x=document.getElementById("xInput")
.value
.trim()
.split(",")
.map(Number);



let y=document.getElementById("yInput")
.value
.trim()
.split(",")
.map(Number);



if(x.length!==y.length){

alert("X and Y values must have same length");

return;

}




let n=x.length;



// Least Square Method


let sumX=0;

let sumY=0;

let sumXY=0;

let sumX2=0;



for(let i=0;i<n;i++){


sumX += x[i];

sumY += y[i];

sumXY += x[i]*y[i];

sumX2 += x[i]*x[i];


}




let m=

(n*sumXY - sumX*sumY)

/

(n*sumX2 - sumX*sumX);





let c=

(sumY-m*sumX)/n;





// Prediction


let yPred=[];



for(let i=0;i<n;i++){


yPred.push(m*x[i]+c);


}




// Error


let error=[];


for(let i=0;i<n;i++){


error.push(y[i]-yPred[i]);


}





// Metrics


let mse=0;

let mae=0;



for(let i=0;i<n;i++){


mse += error[i]*error[i];


mae += Math.abs(error[i]);


}



mse=mse/n;


mae=mae/n;


let rmse=Math.sqrt(mse);





let meanY=sumY/n;


let ssRes=0;

let ssTot=0;



for(let i=0;i<n;i++){


ssRes += error[i]*error[i];


ssTot += (y[i]-meanY)**2;


}



let r2=1-(ssRes/ssTot);






// Display Result


document.getElementById("equation").innerHTML=

"Regression Equation : Y = "

+m.toFixed(3)

+" X + "

+c.toFixed(3);




document.getElementById("metrics").innerHTML=

`

MAE = ${mae.toFixed(4)}

<br>

MSE = ${mse.toFixed(4)}

<br>

RMSE = ${rmse.toFixed(4)}

<br>

R² = ${r2.toFixed(4)}

`;







// Graph



if(chart){

chart.destroy();

}





chart=new Chart(

document.getElementById("chart"),

{


type:"scatter",



data:{


datasets:[


{


label:"Data Points",


data:x.map((value,index)=>({


x:value,

y:y[index]


}))


},




{


label:"Regression Line",


type:"line",


data:x.map((value,index)=>({


x:value,

y:yPred[index]


}))


},





{


label:"Intercept Point",


data:[{


x:0,

y:c


}]


}



]


},




options:{


scales:{


x:{


title:{


display:true,

text:"X"


}


},



y:{


title:{


display:true,

text:"Y"


}


}


}



}


}



);



}








function resetPage(){



document.getElementById("xInput").value="";


document.getElementById("yInput").value="";



document.getElementById("equation").innerHTML="";


document.getElementById("metrics").innerHTML="";



if(chart){


chart.destroy();


}


}