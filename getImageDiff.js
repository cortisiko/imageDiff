import Rembrandt from 'rembrandt'
import fs from "fs"

export default class ImageCompare {

async compareImages(baseImagePath,ScreenShotPath){  
let rembrandt = new Rembrandt({
    imageA: baseImagePath,
    imageB: ScreenShotPath,
    renderComposition: true,
    compositionMaskColor: Rembrandt.Color.RED, // Color of unmatched pixels
    maxOffset: 0,
    maxThreshold: 0
});

let getResults = ((result)=>{
  console.log('Result is:', result.passed);
  console.log('Pixel Difference:', result.differences, `Percentage Difference: ${result.percentageDifference.toFixed(5)}%`);
});

let writeImageDiffToFile = ((result)=>{
  getResults(result)
  let buffer = result.compositionImage
  fs.writeFileSync(`../diffImages/failure-diff${Date.now()}.png`, buffer);
})
// Run the comparison
rembrandt.compare()
  .then(function (result) {
    result.passed == true ? getResults(result) : writeImageDiffToFile(result);  
})
  .catch((e) => {
    console.error(e)
  })
}
}