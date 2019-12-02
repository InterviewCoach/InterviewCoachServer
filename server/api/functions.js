export function findFrequencies(transcript, buzzWords) {
  //initiate frequencies
  const frequencies = {}
  buzzWords.forEach(word => (frequencies[word.toLowerCase()] = 0))

  //loop through transcript, add frequencies to object
  transcript[0].split(' ').forEach(word => {
    const lowerCase = word.toLowerCase()

    //update count if word found
    if (frequencies[lowerCase] >= 0) frequencies[lowerCase]++
    else if (frequencies[lowerCase.slice(0, -1)] >= 0)
      frequencies[lowerCase.slice(0, -1)]++
  })
  return frequencies
}
