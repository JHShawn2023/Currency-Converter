const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const fromTo = document.querySelectorAll(".fromTo select");
const btn = document.querySelector(".mainDiv button");
const currFrom = document.querySelector(".from select")
const currTo = document.querySelector(".To select")
const msg = document.querySelector(".msg");
const Date = document.querySelector(".date");

for(let select of fromTo){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        // console.log(newOption)
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "BDT"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSc;
}
btn.addEventListener("click", (evt)=>{
    // evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async()=>{
    let amount = document.querySelector(".mainDiv input");
    console.log(amount)
    let finalinput = amount.value;
    if(finalinput ==="" || finalinput<1){
        finalinput = 1;
        amount.value = 1;
    }
    const finalURL = `${URL}/${currFrom.value.toLowerCase()}/${currTo.value.toLowerCase()}.json`;
    let response = await fetch(finalURL);
    let data = await response.json();
    let rate = data[currTo.value.toLowerCase()];
    let r = data.date;
    console.log(r);
    Date.innerText = `Last update: ${r}`;
    
    let finalAmount = finalinput * rate;
    msg.innerText = `${finalinput} ${currFrom.value} = ${finalAmount} ${currTo.value}`;
    console.log(data)


}