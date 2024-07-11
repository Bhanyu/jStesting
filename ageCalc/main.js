const userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];
const calc = document.querySelector(".calc");
const result = document.getElementById("result")

calc.addEventListener("click", calculateAges)

function calculateAges(){
    const birthDate = new Date(userInput.value);
    const day1 = birthDate.getDate();
    const month1 = birthDate.getMonth() + 1;
    const year1 = birthDate.getFullYear()


    const currentDate = new Date();

    const day2 = currentDate.getDate();
    const month2 = currentDate.getMonth() + 1;
    const year2 = currentDate.getFullYear()


    let d3, m3, y3;

    y3 = year2 - year1;
    if (month2 >= month1){
       m3 =  month2 - month1
    }
    else{
        y3-- 
        m3 = 12 - month1 + month2

    }
    if (day2 >= day1) {
        d3 = day2 - day1
    }
    else{
m3--;
d3 = getDaysInMonth(year1,month1) + day2 - day1
    }
    if (m3 < 0) {
        m3 = 11;
        y3--;
    }
    console.log(y3, m3, d3);
    console.log(year1, month1,day1);
    console.log(year2, month2, day2)
    result.innerHTML = `${y3} years , ${m3} month , ${d3} days old`
}
const getDaysInMonth = (year,month)=>{
return new Date(year, month, 0).getDate()
}

