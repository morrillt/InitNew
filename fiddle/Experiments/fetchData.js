function outerFunction() {
  let outerLet = "outer let variable";
  var outerVar = "outer var variable";
  const outerConst = "outer const variable";


  

  (() => {
    let x = 1;
    var y = 2;
    let innerLet = "inner let variable";
    var innerVar = "inner var variable";
    const innerConst = " inner const variable";

    console.log("Inner function");
    console.log(innerLet);
    console.log(innerVar);
    console.log(innerConst);
    console.log(outerVar);
    console.log(outerLet);
    console.log(outerConst);

  })();

  console.log("Poo");

}


outerFunction();
console.log("shit");