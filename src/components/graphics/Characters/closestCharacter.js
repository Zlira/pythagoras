import characterAlignments from './index'


function getClosestCharacter(lawfullness, goodness) {
    let minDistance = Infinity, distance, closestChar
    for (const char of Object.values(characterAlignments)) {
        distance = Math.sqrt(
            (lawfullness - char.vals[0]) ** 2 +
            (goodness - char.vals[1]) ** 2
        )
        if (distance < minDistance) {
            minDistance = distance
            closestChar = char
        }

    }
    return closestChar
}


export default getClosestCharacter