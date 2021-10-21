import {decode, encode} from "./index.js"
let mappings = "AAAA,IAAIA,EAAY"

let vlqs = mappings.split(';').map(line => line.split(','));
let decoded = vlqs.map(line => line.map(decode))
let sourceFileIndex = 0;   // second field
let sourceCodeLine = 0;    // third field
let sourceCodeColumn = 0;  // fourth field
let nameIndex = 0;         // fifth field

decoded = decoded.map(line => {
  let generatedCodeColumn = 0; // first field - reset each time

  return line.map(segment => {
    generatedCodeColumn += segment[0];

    const result = [generatedCodeColumn];

    if (segment.length === 1) {
      // only one field!
      return result;
    }

    sourceFileIndex  += segment[1];
    sourceCodeLine   += segment[2];
    sourceCodeColumn += segment[3];

    result.push(sourceFileIndex, sourceCodeLine, sourceCodeColumn);

    if (segment.length === 5) {
      nameIndex += segment[4];
      result.push(nameIndex);
    }

    return result;
  });
});
console.log(JSON.stringify(decoded))