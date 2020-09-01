import Rembrandt from 'rembrandt'
import fs from "fs"

 let baseImage, secondImage, rembrandt

 baseImage ='images/HaroldQApassed.png'
 secondImage = 'images/HaroldQApassedincorrect.png',

   rembrandt = new Rembrandt({
    imageA: baseImage,
    imageB: secondImage,
    renderComposition: true,
    compositionMaskColor: Rembrandt.Color.RED, // Color of unmatched pixels
    maxOffset: 0,
    maxThreshold: 0

});

let getResults = ((result)=>{
  console.log('Result is:', result.passed)
  console.log('Pixel Difference:', result.differences, `Percentage Difference: ${result.percentageDifference.toFixed(5)}%`)

});

let writeImageDiffToFile = ((result)=>{
  getResults(result)
  let buff = result.compositionImage
  fs.writeFileSync(`diffImages/imageDiff${Date.now()}.png`, buff);
})

 
// Run the comparison
rembrandt.compare()
  .then(function (result) {

    result == 'true' ? getResults(result) : writeImageDiffToFile(result);
    // console.log('Passed:', result.passed)
    // console.log('Pixel Difference:', result.differences, 'Percentage Difference', result.percentageDifference, '%')
 
    // let buff = result.compositionImage
    // fs.writeFileSync(`diffImages/test${Date.now()}.png`, buff);
    
})
  .catch((e) => {
    console.error(e)
  })