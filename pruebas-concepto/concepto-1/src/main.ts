import './style.css'

const animals = ['dog', 'cat', 'horse', 'bird']

console.log("Default array of animals:")
console.log(animals)


function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
}

const shuffledArray = shuffleArray(animals);

console.log("Shuffled array of animals:")
console.log(shuffledArray)