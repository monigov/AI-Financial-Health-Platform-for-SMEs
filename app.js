let hindi=false;

function toggleLang(){
hindi=!hindi;
alert(hindi ? "हिंदी मोड चालू" : "English Mode");
}

function analyze(){

let revenue = Number(document.getElementById("revenue").value);
let expenses = Number(document.getElementById("expenses").value);
let loans = Number(document.getElementById("loans").value);
let receivables = Number(document.getElementById("receivables").value);
let inventory = Number(document.getElementById("inventory").value);
let industry = document.getElementById("industry").value;

if(!revenue || !expenses){
alert("Enter financial data");
return;
}

let profit = revenue-expenses;
let margin = (profit/revenue)*100;
let debtRatio = loans/revenue;
let liquidity = (receivables+inventory)/expenses;

let score = Math.round(
(margin*0.4) +
((1-debtRatio)*30) +
(liquidity*30)
);

if(score>100) score=95;
if(score<10) score=15;

document.getElementById("score").innerText = score+"/100";

let risk = score>75?"Low Risk 🟢":score>50?"Medium Risk 🟡":"High Risk 🔴";
document.getElementById("risk").innerText=risk;

generateChart(revenue,expenses,loans);
generateRecommendations(score,margin,debtRatio,industry);
}

function generateChart(r,e,l){
new Chart(document.getElementById("chart"),{
type:"bar",
data:{
labels:["Revenue","Expenses","Loans"],
datasets:[{label:"Financial Overview",data:[r,e,l]}]
}
});
}

function generateRecommendations(score,margin,debt,industry){
let rec=document.getElementById("recommendations");
rec.innerHTML="";

let list=[];

if(margin<20) list.push("Reduce operational costs by 15%");
if(debt>0.5) list.push("Consider loan refinancing via NBFC");
if(score>70) list.push("Eligible for Business Expansion Loan");
if(industry=="Retail") list.push("Optimize inventory turnover");
if(industry=="Manufacturing") list.push("Improve supply chain efficiency");

list.push("Automate GST filing & bookkeeping");
list.push("Start AI cashflow forecasting");

list.forEach(r=>{
let li=document.createElement("li");
li.innerText=r;
rec.appendChild(li);
});
}
