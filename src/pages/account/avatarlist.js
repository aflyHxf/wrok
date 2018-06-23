
export default function avatarList() {
    let avatarList = [];
    for (let i = 1; i < 13; i++) {
        avatarList.push({url: `${i}.jpg`})
    }
    return avatarList
}
