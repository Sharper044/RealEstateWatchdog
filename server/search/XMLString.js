// Changes XML to JSON
module.exports = {
  stringSlicer : ( str1, str2, str3 ) => {
    let iStart = str1.indexOf( str2 ) + str2.length;
    let iEnd = str1.indexOf( str3, iStart );
    let strFinal = str1.slice( iStart, iEnd );
    return strFinal;
  }
}