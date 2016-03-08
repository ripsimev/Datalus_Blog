var month = 2;
var year = 2015;
  
            
function creditCardExpired (month, year) {
  var today = new Date();
  var expiredDate = new Date(year, month);

      if (expiredDate < today) {
         return false;
         document.write("Credit Card has expired");
      } else {
         return true;
         document.write("Credit Card is valid");
      }
  }
  
  creditCardExpired(month, year);
