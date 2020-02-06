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

function wait(sec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, sec * 1000)
  })
}

describe('aux tests', () => {
  randomNames.forEach((name, index) => {
    it(`can calculate name for ${name}`, async () => {
      if (index < 50) {
        await wait(Math.random())
        expect(true).toBe(true)
      } else {
        await wait(getRandomInt(1, 3))
        expect(true).toBe(true)
      }
    })
  })
})
