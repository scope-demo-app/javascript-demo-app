const randomNames = [
  'Sona',
  'Theda',
  'Micheal',
  'Alta',
  'Danny',
  'Silvia',
  'Brain',
  'Muriel',
  'Sheri',
  'Berenice',
  'Edwina',
  'Tristan',
  'Rosanna',
  'Jeannette',
  'Kay',
  'Winter',
  'Tobias',
  'Eliana',
  'Leonie',
  'Maisie',
  'Cari',
  'Bertram',
  'Wilburn',
  'Josie',
  'Bobby',
  'Ardelia',
  'Sharleen',
  'Man',
  'Florence',
  'Zula',
  'Waltraud',
  'Francisca',
  'Kasandra',
  'Jamaal',
  'Marisa',
  'Fernando',
  'Helen',
  'Otelia',
  'Laurinda',
  'Janie',
  'Corina',
  'Vinita',
  'Everette',
  'Gaylene',
  'Jeannine',
  'Larraine',
  'Magaret',
  'Lorenza',
  'Octavia',
  'Lu',
  'Annalee',
  'Shavonne',
  'Shara',
  'Mariano',
  'Elroy',
  'Reiko',
  'Zack',
  'Kathaleen',
  'Bennett',
  'Hannelore',
  'Rickey',
  'Evette',
  'Jasper',
  'Williams',
  'Kandi',
  'Nelia',
  'Addie',
  'Doretha',
  'August',
  'Brice',
]

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

describe('aux tests', () => {
  randomNames.forEach((name, index) => {
    it(`can calculate name for ${name}`, done => {
      if (index < 50) {
        setTimeout(() => {
          expect(true).toBe(true)
          done()
        }, Math.random() * 1000)
      } else {
        setTimeout(() => {
          expect(true).toBe(true)
          done()
        }, getRandomInt(1, 30) * 1000)
      }
    })
  })
})
