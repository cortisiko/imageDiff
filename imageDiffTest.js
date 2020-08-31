import Rembrandt from 'rembrandt'
import fs from "fs"

 let firstImage, secondImage, rembrandt

 firstImage ='images/HaroldQApassed.png'
 secondImage = 'images/HaroldQApassed.png',

  rembrandt = new Rembrandt({
    imageA: firstImage,
    imageB: secondImage,
    renderComposition: true,
    compositionMaskColor: Rembrandt.Color.RED, // Color of unmatched pixels
    maxOffset: 0,
    maxThreshold: 0

})

 
// Run the comparison
rembrandt.compare()
  .then(function (result) {

    console.log('Passed:', result.passed)
    console.log('Pixel Difference:', result.differences, 'Percentage Difference', result.percentageDifference, '%')
 
    let buff = result.compositionImage
    fs.writeFileSync(`diffImages/test${Date.now()}.png`, buff);
    
})
  .catch((e) => {
    console.error(e)
  })