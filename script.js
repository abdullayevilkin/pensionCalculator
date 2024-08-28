
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
let span = document.querySelector("#sualSay");
let sualSayi = 0;

const t1Start = document.querySelector("#t1_start");
const t1End = document.querySelector("#t1_end");
const t2Start = document.querySelector("#t2_start");
const t2End = document.querySelector("#t2_end");
const t3Start = document.querySelector("#t3_start");
const t3End = document.querySelector("#t3_end");
const t4Start = document.querySelector("#t4_start");
const t4End = document.querySelector("#t4_end");
const minPension = document.querySelector("#min_pension");
const maxPension = document.querySelector("#max_pension");
const minSigorta = document.querySelector("#min_sigorta");
const maxSigorta = document.querySelector("#max_sigorta");
let t1Val, t2Val, t3Val, t4Val, pensionVal, sigortaVal;

const t1date = document.querySelector("#t1date");
const t2date = document.querySelector("#t2date");
const t3date = document.querySelector("#t3date");
const t4date = document.querySelector("#t4date");
const pensVal = document.querySelector("#pensVal");
const sigVal = document.querySelector("#sigVal");
// getting random date month/day/year

// start = new Date(2001, 0, 1);
// end = new Date();

function randomDate(start, end) {
    start = new Date(
        moment(start, "DD.MM.YYYY").year(),
        moment(start, "DD.MM.YYYY").month(),
        moment(start, "DD.MM.YYYY").day()
    );
    end = new Date(
        moment(end, "DD.MM.YYYY").year(),
        moment(end, "DD.MM.YYYY").month(),
        moment(end, "DD.MM.YYYY").day()
    );

    let newDate = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return moment(newDate).format("DD.MM.YYYY");
}

function randomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
// function monthDiff(st, en) {
//   function getAbsoluteMonths(momentDate) {
//     var months = Number(momentDate.format("MM"));
//     var years = Number(momentDate.format("YYYY"));
//     return months + years * 12;
//   }

//   var startMonths = getAbsoluteMonths(moment(st, "DD.MM.YYYY"));
//   var endMonths = getAbsoluteMonths(moment(en, "DD.MM.YYYY"));

//   return endMonths - startMonths;
// }

//
// function monthDiffWithoutMoment(d1, d2) {
//   // d1 = new Date(d1);
//   d1 = moment(d1, "DD.MM.YYYY");
//   // d2 = new Date(d2);
//   d2 = moment(d2, "DD.MM.YYYY");
//   var months;
//   months = (d2.year() - d1.year()) * 12;
//   months -= d1.month();
//   months += d2.month();

//   months = d1.day() <= d2.day() ? months : months - 1;
//   return months <= 0 ? 0 : months;
// }

function monthDiff(a, b) {
    const di = moment(b, "DD.MM.YYYY").diff(
        moment(a, "DD.MM.YYYY"),
        "months",
        true
    );
    return Math.floor(di);
}
//

function createValues() {
    t1Val = randomDate(t1Start.value, t1End.value);
    t3Val = randomDate(t3Start.value, t3End.value);
    t2End.value = t3Val;
    t2Val = randomDate(t2Start.value, t2End.value);
    t4Val = randomDate(t4Start.value, t4End.value);
    //

    pensionVal = randomInt(
        Number(minPension.value),
        Number(maxPension.value)
    );
    pensionVal = Math.floor(pensionVal / 10) * 10;
    pensionVal = pensionVal.toFixed(2);
    sigortaVal = randomInt(
        Number(minSigorta.value),
        Number(maxSigorta.value)
    );
    sigortaVal = Math.floor(sigortaVal / 100) * 100;
    sigortaVal = sigortaVal.toFixed(2);

    t1date.innerHTML = "<i>" + t1Val + "</i>";
    t2date.innerHTML = "<i>" + t2Val + "</i>";
    t3date.innerHTML = "<i>" + t3Val + "</i>";
    t4date.innerHTML = "<i>" + t4Val + "</i>";
    pensVal.innerHTML = "<i>" + pensionVal + "</i>";
    sigVal.innerHTML = "<i>" + sigortaVal + "</i>";
}

const btn = document.querySelector("button");
btn.addEventListener("click", function () {
    span.innerText = ++sualSayi;

    createValues();

    const list = document.querySelector("#list");
    const element = document.createElement("LI");
    const quest = document.createElement("h3");
    quest.innerText = showQuestion();
    const variants = document.createElement("h4");
    // answer here
    function mixing() {
        let unique = false;
        while (!unique) {
            let realAnswer = showAnser()[1];
            let variantB = randomInt(realAnswer - 100, realAnswer + 100);
            variantB = Math.floor(variantB);

            let variantC = randomInt(realAnswer - 100, realAnswer + 100);
            variantC = Math.floor(variantC);

            let variantD = randomInt(realAnswer - 100, realAnswer + 100);
            variantD = Math.floor(variantD);

            const decimalPart = Math.round(realAnswer * 100) % 100;

            if (
                variantB !== realAnswer &&
                variantC !== realAnswer &&
                variantD !== realAnswer &&
                variantB !== variantC &&
                variantB !== variantD &&
                variantC !== variantD
            ) {
                unique = true;
                const decimalPart = Math.round(realAnswer * 100) % 100;

                // Update HTML content
                variants.innerHTML = `a) ${realAnswer.replace(
                    ".",
                    ","
                )} <br> b) ${variantB},${decimalPart}  <br>  c) ${variantC},${decimalPart}   <br> d) ${variantD},${decimalPart} `;
            }
        }
    }
    mixing();

    const answ = document.createElement("p");
    answ.innerText = showAnser()[0];
    element.append(quest);
    element.append(variants);
    element.append(answ);
    // question.innerText = showQuestion();
    // answer.innerText = showAnser();
    list.append(element);
});

function showQuestion() {
    let questionZero = `${t1Val} il təvəllüdlü şəxsə (kişi) ${t2Val} il tarixindən
          hərbi qulluqçu güzəştli şərtlərlə yaşa görə əmək pensiyası təyin edilib.
          Sonrakı artımlar nəzərə alınmaqla indiki pensiyası ${pensionVal.replace(
        ".",
        ","
    )} manat təşkil edir.
          Mülki sahədə ${t3Val} il tarixindən əmək fəaliyyətinə başlayıb.
          Bu müddət ərzində ${sigortaVal.replace(
        ".",
        ","
    )} pensiya sığorta kapitalı toplayıb.
          Pensiyasının yenidən hesablanması üçün ${t4Val} il tarixində müraciət edib
          və həmin tarixdə işdən çıxıb. Yenidən hesablamadan sonra pensiyası neçə manat təşkil edəcək?`;

    return questionZero;
}

function showAnser() {
    let B = toNumber(monthDiff(t1Val, t4Val));
    let C = 780 - B;
    let D = C + 144;
    let Y = toNumber(monthDiff(t3Val, t4Val));
    let Y2 = Y > 72 ? 72 : Y;
    let X = toNumber(D - Y);
    let Z = toNumber(sigortaVal) / X;
    let ansDigit = Math.round(Z * 100) / 100;
    ansDigit = Number(ansDigit.toFixed(2)) + Number(pensionVal);
    ansDigit = ansDigit.toFixed(2);
    let answerZero = `1. ${t4Val} - ${t1Val} il çıxılır. ${B} ay.   => B
                2. 780 ay - ${B} ay = ${C} ay   => C
                3. C + 144 ay = ${D} ay   => D
                4. T4 - T3 = ${Y} ay   => Y
                5. 72-dən böyükdürsə 72 kimi götür. Y = ${Y2} ay
                6. D - Y = ${X}  =>  X
                7. ${sigortaVal} / X = ${Z}  => Z
                8. Cavab  => ${ansDigit} `;

    // return answerZero;
    return [answerZero, ansDigit];
}
