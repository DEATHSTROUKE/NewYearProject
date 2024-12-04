export const getPermutationIndexes = (arr1: unknown[], arr2: unknown[]) => {
  const mismatchIndexes: number[] = []

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      mismatchIndexes.push(i)
    }
  }

  return mismatchIndexes
}
