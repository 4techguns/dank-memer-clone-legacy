module.exports = {
    generate(min, max) {
        let rand = Math.round(Math.random() * (max - min) + min);

        return rand
    },
    
    genWithoutRound(min, max) {
        let rand = Math.random() * (max - min) + min;

        return rand
    }
}