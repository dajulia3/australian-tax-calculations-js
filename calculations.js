function australianIncomeTax(income){
  var tax = 0;
  var taxBrackets = [
    {limit: 18200, rate: 0},
    {limit: 37000, rate: .19},
    {limit: 87000, rate: .325},
    {limit: 180000, rate: .37},
    {limit: Infinity, rate: .45}
  ];

  for(var i = 1; i< taxBrackets.length; i++){
    var lowerBound = taxBrackets[i-1].limit;
    var upperBound = taxBrackets[i].limit;
    var rate = taxBrackets[i].rate;
    if(income > lowerBound){
      var incomeInBracket = Math.min(income - lowerBound, upperBound - lowerBound);
      tax += incomeInBracket * rate
    }    
  }
  return tax;
}

describe("australianIncomeTax", function(){

  describe("marginal tax brackets", function(){
 var taxBracketExamples = [
   {income: 0, tax: 0},
   {income: 18200, tax: 0},
   {income: 37000, tax: 3572.00},
   {income: 37001, tax: 3572.32},
   {income: 87000, tax: 19822.00},
   {income: 87001, tax: 19822.37},
   {income: 180000, tax: 54232.00},
   {income: 180001, tax: 54232.45},
   {income: 270000, tax: 94732.00},
]  
   describe("it should respect all of the marginal tax brackets, according to the following examples", function(){
      for(var i=0; i<taxBracketExamples.length; i++){
        var example = taxBracketExamples[i];
        it("Income:  $"+example.income + " -> Tax: $"+example.tax+"", function(){
          
        var result = australianIncomeTax(example.income);
        expect(result).toBeCloseTo(example.tax, 2);
          
        });
      }
    })
  })
  
});
