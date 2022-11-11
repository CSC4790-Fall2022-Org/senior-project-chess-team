const {cards} = require('./effects/cards.js')

function CardProvider() {
    this.frequencyCount = getTotalFrequencyCount()
    this.getCard = () => {
        return this.selectRandomCard()
    }

    this.getTotalFrequencyCount = () => {
        let sum = 0
        cards.forEach(item => {
            sum += item.frequency
        })
        return sum
    }

    this.selectRandomCard = () => {
        let randomNum = Math.floor(Math.random() * (this.frequencyCount) + 1)
        console.log(randomNum, this.frequencyCount)
        let i = 0;
        while (randomNum > 0) {
            randomNum -= cards[i].frequency
            i += 1
        }
        return {...cards[i-1]}
    }

}

const getTotalFrequencyCount = () => {
    let sum = 0
        cards.forEach(item => {
            sum += item.frequency
        })
    return sum
}
exports.CardProvider = CardProvider