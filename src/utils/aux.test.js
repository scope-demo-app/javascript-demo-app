const randomNames = [
  'Sona',
  'Theda',
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
  'Luis',
  'Marshall',
  'Elsa',
  'Rhodes',
  'Nancy',
  'Floyd',
  'Teri',
  'Hall',
  'Wilbert',
  'Flowers',
  'Craig',
  'Dennis',
  'Paulette',
  'Wolfe',
  'Perry',
  'Hamilton',
  'Peter',
  'Stone',
  'Alberta',
  'Welch',
  'Beverly',
  'Patton',
  'Allan',
  'Gutierrez',
  'Carl',
  'Washington',
  'Shane',
  'Guerrero',
  'Kayla',
  'Potter',
  'Derek',
  'Austin',
  'Salvador',
  'Munoz',
  'Ramona',
  'Sparks',
  'Janis',
  'Perez',
  'Felipe',
  'Rodriquez',
  'Geoffrey',
  'Parsons',
  'Clifford',
  'Norton',
  'Robyn',
  'Copeland',
  'Dana',
  'Stevens',
  'Karl',
  'Gonzalez',
  'Tyrone',
  'Goodman',
  'Lowell',
  'Mullins',
  'Inez',
  'Price',
  'Taylor',
  'Bishop',
  'Brent',
  'Flores',
  'Sherri',
  'Park',
  'Loren',
  'Clarke',
  'Sabrina',
  'Turner',
  'Jean',
  'Knight',
  'Elena',
  'Fowler',
  'Rodney',
  'Nash',
  'Gregory',
  'Daniel',
  'Emilio',
  'Rice',
  'Cornelius',
  'Diaz',
  'Anthony',
  'Porter',
  'Bernard',
  'Tyler',
  'Santos',
  'Frank',
  'Darryl',
  'Casey',
  'Jonathan',
  'Ramsey',
  'Julian',
  'Kim',
  'Jermaine',
  'Chavez',
  'Dexter',
  'Chapman',
  'Hugo',
  'Garner',
  'Terry',
  'Wood',
  'Erma',
  'Obrien',
  'Irvin',
  'Schmidt',
  'Shannon',
  'Hicks',
  'Victor',
  'Owens',
  'Valerie',
  'Burton',
  'Harold',
  'Schultz',
  'Margaret',
  'Martinez',
  'Julius',
  'Armstrong',
  'Kristen',
  'Matthews',
  'Nina',
  'Wilson',
  'Sheldon',
  'Johnston',
  'Jennie',
  'Crawford',
  'Sherry',
  'Cummings',
  'Susan',
  'Bryant',
  'Sylvester',
  'Mason',
  'Darrin',
  'Jefferson',
  'Belinda',
  'Baker',
  'Marjorie',
  'Stevenson',
  'Michael',
  'Oliver',
  'Jim',
  'Watson',
  'Eloise',
  'Mcdaniel',
  'Catherine',
  'Curtis',
  'Charles',
  'Lewis',
  'Noah',
  'Lynch',
  'Steve',
  'Medina',
  'Lydia',
  'Parks',
  'Darrell',
  'Reyes',
  'Terrence',
  'Gibbs',
  'Felicia',
  'Bass',
  'Tim',
  'Ruiz',
  'Frank',
  'Maldonado',
  'Meghan',
  'Walton',
  'Andre',
  'Collier',
  'Alvin',
  'Cruz',
  'Veronica',
  'Owen',
  'Edna',
  'Nunez',
  'Ismael',
  'Horton',
  'Georgia',
  'Newman',
  'Alice',
  'Bowen',
  'Evan',
  'Jacobs',
  'Opal',
  'Wagner',
  'Rosie',
  'Peters',
  'Dorothy',
  'Weaver',
  'Theresa',
  'Graham',
  'Chris',
  'Saunders',
  'Bernadette',
  'Mendoza',
  'Stella',
  'Estrada',
  'Erika',
  'Lee',
  'Luther',
  'Garza',
  'Rolando',
  'Craig',
  'Beth',
  'Barrett',
  'Johnathan',
  'Coleman',
  'Elena',
  'Cobb',
  'Anne',
  'Hodges',
  'Gordon',
  'Morrison',
  'Myrtle',
  'Perez',
  'Joanne',
  'Brewer',
  'Levi',
  'Harper',
  'Dale',
  'Burns',
  'Caleb',
  'Holt',
  'Beth',
  'Medina',
  'Teri',
  'Reese',
  'Cathy',
  'Abbott',
  'Randall',
  'Holmes',
  'Hope',
  'Burgess',
  'Gertrude',
  'Long',
  'Amanda',
  'Dunn',
  'Wendell',
  'Collier',
  'Janie',
  'Carson',
  'Johnnie',
  'Baldwin',
  'Marilyn',
  'Wagner',
  'Mary',
  'Pierce',
  'Alexander',
  'Larson',
  'Shawn',
  'Moore',
  'Derrick',
  'Schultz',
  'Lewis',
  'Shelton',
  'Domingo',
  'Banks',
  'Lindsey',
  'Snyder',
  'Randal',
  'Lowe',
  'Dixie',
  'Harmon',
  'Isaac',
  'Vargas',
  'Cecil',
  'Richards',
  'Garry',
  'Cortez',
  'Harvey',
  'Carlson',
  'Jackie',
  'Graham',
  'Benny',
  'Cook',
  'Elaine',
  'Hernandez',
  'Maria',
  'Lambert',
  'Allen',
  'Maldonado',
  'Marguerite',
  'Parker',
  'Felipe',
  'Adkins',
  'Ora',
  'Reynolds',
  'Felix',
  'Washington',
  'Alberto',
  'Weber',
  'Terrence',
  'Townsend',
  'Cedric',
  'Weaver',
  'Clinton',
  'Rhodes',
  'Eddie',
  'Wood',
  'Julian',
  'Hopkins',
  'Jennie',
  'Murphy',
  'Sonia',
  'Frazier',
  'Johanna',
  'Stone',
  'Bertha',
  'Hicks',
  'Fredrick',
  'Gilbert',
  'Constance',
  'Lamb',
  'Inez',
  'Mcguire',
  'Becky',
  'Barrett',
  'Dallas',
  'Castillo',
  'Erma',
  'Higgins',
  'Cary',
  'Lyons',
  'Jo',
  'Fields',
  'Darla',
  'Klein',
  'Cristina',
  'Sims',
  'Kenny',
  'Perkins',
  'Marco',
  'Roberts',
  'Freda',
  'Glover',
  'Ismael',
  'Estrada',
  'Susan',
  'Boyd',
  'Lloyd',
  'Huff',
  'Megan',
  'Torres',
  'Jack',
  'Figueroa',
  'Penny',
  'Adams',
  'Philip',
  'Pratt',
  'Melanie',
  'Brown',
  'Kerry',
  'Ramsey',
  'Louise',
  'Clayton',
  'Mona',
  'Walsh',
  'Elvira',
  'Cruz',
  'Randolph',
  'Romero',
  'Jan',
  'Bowman',
  'Jeanne',
  'Grant',
  'Kristi',
  'Ford',
  'Orlando',
  'Howell',
  'Cecelia',
  'Nash',
  'Claude',
  'Jacobs',
  'Lynne',
  'Scott',
  'Emily',
  'Rodgers',
  'Leona',
  'Jennings',
  'Dexter',
  'Mcdonald',
  'Denise',
  'Ellis',
  'Elijah',
  'Wells',
  'Moses',
  'Stevenson',
  'Woodrow',
  'Berry',
  'Clifford',
  'Chandler',
  'Natalie',
  'Dawson',
  'Rufus',
  'Norton',
  'Lyle',
  'Mcdaniel',
  'Geneva',
  'Watson',
  'Emma',
  'Park',
  'Francis',
  'Thompson',
  'Perry',
  'Page',
  'Lionel',
  'Barrett',
  'Patsy',
  'Jimenez',
  'Ivan',
  'Phelps',
  'Misty',
  'Allison',
  'Pat',
  'Grant',
  'Kurt',
  'Miller',
  'Marcella',
  'Moran',
  'Sherman',
  'Norton',
  'Ramiro',
  'Christensen',
  'Candace',
  'Stanley',
  'Nicholas',
  'French',
  'Clyde',
  'Blake',
  'Isabel',
  'Newman',
  'Lynn',
  'Hale',
  'Theodore',
  'Saunders',
  'Yolanda',
  'Berry',
  'Jonathon',
  'Watson',
  'James',
  'Watkins',
  'Pete',
  'Rice',
  'Agnes',
  'Roberson',
  'Drew',
  'Perry',
  'Willard',
  'Green',
  'Tiffany',
  'Holmes',
  'Edwin',
  'Hubbard',
  'Ed',
  'Hammond',
  'Faith',
  'Houston',
  'Beulah',
  'Wong',
  'Edward',
  'Mccarthy',
  'Stuart',
  'Lawson',
  'Dallas',
  'Shelton',
  'Erik',
  'Robertson',
  'Thelma',
  'Ford',
  'Jorge',
  'Reed',
  'Rosemarie',
  'Lynch',
  'Maryann',
  'Sutton',
  'Louis',
  'Mcbride',
  'John',
  'Warner',
  'Irene',
  'Walton',
  'Willie',
  'Ellis',
  'Ebony',
  'Owen',
  'Darren',
  'Bass',
  'Ethel',
  'Fowler',
  'Earl',
  'Brock',
  'Rosie',
  'Swanson',
  'Matt',
  'Wilkerson',
  'Percy',
  'Wilkins',
  'Janis',
  'Murphy',
  'Cecilia',
  'Farmer',
  'Mindy',
  'Gray',
  'Dennis',
  'Stephens',
  'Jessie',
  'Miles',
  'Robin',
  'Jennings',
  'Oliver',
  'Schwartz',
  'Christie',
  'Conner',
  'Dana',
  'Mack',
  'Ella',
  'Norris',
  'Nathaniel',
  'Mckenzie',
  'Ryan',
  'Hicks',
  'Kathleen',
  'Romero',
  'Justin',
  'Roy',
  'Henry',
  'Tate',
  'Winston',
  'Cummings',
  'Andres',
  'Evans',
  'Brittany',
  'Mason',
  'Jeffery',
  'Poole',
  'Alexander',
  'Tucker',
  'Pamela',
  'Weaver',
  'Abel',
  'Bennett',
  'Marguerite',
  'Ballard',
  'Leo',
  'Schultz',
  'Lora',
  'Gill',
  'Harry',
  'Lewis',
  'Kathy',
  'Long',
  'Tracy',
  'Fleming',
  'Rochelle',
  'Young',
  'Aaron',
  'Tran',
  'Daryl',
  'Marsh',
  'Robert',
  'Medina',
  'Donnie',
  'Hunt',
  'Marco',
  'Mccoy',
  'Jackie',
  'Goodman',
  'Darrell',
  'Hodges',
  'Melanie',
  'Hudson',
  'Peggy',
  'Hunter',
  'Casey',
  'Thornton',
  'Freddie',
  'Peters',
  'Rex',
  'Jordan',
  'Michele',
  'Mullins',
  'Elsa',
  'Austin',
  'Ida',
  'Owens',
  'Hilda',
  'Valdez',
  'Mona',
  'Armstrong',
  'Hazel',
  'Mitchell',
  'Roosevelt',
  'Anderson',
  'Cathy',
  'Bryan',
  'Harvey',
  'Carr',
  'Darnell',
  'Daniel',
  'Alexis',
  'Patton',
  'Angel',
  'Banks',
  'Timmy',
  'Brooks',
  'Caroline',
  'French',
  'Al',
  'Lynch',
  'Sherman',
  'Freeman',
  'Thomas',
  'Vargas',
  'Jackie',
  'Park',
  'Kara',
  'Phelps',
  'Ray',
  'Sandoval',
  'Rex',
  'Fields',
  'Pete',
  'Carpenter',
  'Jay',
  'Mathis',
  'Timmy',
  'Weber',
  'Darryl',
  'Benson',
  'Edna',
  'Ramsey',
  'Ian',
  'Vaughn',
  'Shelley',
  'Hayes',
  'Gina',
  'Willis',
  'Harvey',
  'Sullivan',
  'Ernesto',
  'Hodges',
  'Cathy',
  'Meyer',
  'Derrick',
  'Hampton',
  'Whitney',
  'Roberts',
  'Nichole',
  'Townsend',
  'Emma',
  'Mckinney',
  'Shelly',
  'Pope',
  'Pedro',
  'Patterson',
  'George',
  'Harrington',
  'Dan',
  'Graves',
  'Jamie',
  'Gibson',
  'Ora',
  'Hudson',
  'Domingo',
  'Fernandez',
  'Vicky',
  'Gomez',
  'Kirk',
  'Shaw',
  'Michelle',
  'Wong',
  'Carl',
  'Scott',
  'Roberto',
  'White',
  'Warren',
  'Hawkins',
  'Nancy',
  'Terry',
  'Sophia',
  'Nguyen',
  'Elbert',
  'Mills',
  'Johnny',
  'Schultz',
  'Laura',
  'Jacobs',
  'Virgil',
  'Gill',
  'Chelsea',
  'Bowen',
  'Albert',
  'Gibbs',
  'Toby',
  'Jenkins',
  'Edith',
  'Warren',
  'Darla',
  'Fisher',
  'Malcolm',
  'Bates',
  'Luz',
  'Harmon',
  'Mitchell',
  'Logan',
  'Paula',
  'Norris',
  'Anita',
  'Jennings',
  'Craig',
  'Carson',
  'Gregg',
  'Morton',
  'Sabrina',
  'Robertson',
  'Jason',
  'Allen',
  'Kim',
  'Figueroa',
  'Cecelia',
  'Rose',
  'Clyde',
  'Hansen',
  'Lionel',
  'Wells',
  'Stanley',
  'Payne',
  'Jean',
  'Lyons',
  'Marlon',
  'Anderson',
  'Monique',
  'Osborne',
  'Gerardo',
  'Hoffman',
  'Ernest',
  'Chapman',
  'Miranda',
  'Allison',
  'Allan',
  'Reyes',
  'Raquel',
  'Rodriguez',
  'Kenny',
  'Wagner',
  'Sylvester',
  'Gilbert',
  'Cynthia',
  'Andrews',
  'Leroy',
  'Roy',
  'Tammy',
  'Love',
  'Lyle',
  'Davis',
  'Brandon',
  'Bryant',
  'Doug',
  'Wright',
  'Theodore',
  'Grant',
  'Wayne',
  'Taylor',
  'Jeffrey',
  'Waters',
  'Regina',
  'Shelton',
  'Lisa',
  'Wilkins',
  'Lloyd',
  'Manning',
  'Carole',
  'Weaver',
  'Daniel',
  'Pittman',
  'Alberto',
  'Mccarthy',
  'Sherry',
  'Williamson',
  'Lee',
  'Carr',
  'Shirley',
  'Larson',
  'Kari',
  'Moran',
  'Arthur',
  'Lamb',
  'Sheryl',
  'Holt',
  'Maggie',
  'Ruiz',
  'Estelle',
  'Rogers',
  'Donnie',
  'Thomas',
  'Jaime',
  'Gonzales',
  'Della',
  'Burgess',
  'Lewis',
  'Lane',
  'Roosevelt',
  'Blake',
  'Olga',
  'Gutierrez',
  'Lindsey',
  'Rivera',
  'Clarence',
  'Hampton',
  'Holly',
  'Blake',
  'Ella',
  'Alvarez',
  'Aaron',
  'Pearson',
  'Judith',
  'Douglas',
  'Marcus',
  'Hardy',
  'Olivia',
  'Stevens',
  'Bryant',
  'Russell',
  'Joey',
  'Rogers',
  'Cody',
  'Bradley',
  'Cecilia',
  'Greer',
  'Lorena',
  'Rose',
  'Isabel',
  'Gardner',
  'Freda',
  'Morales',
  'Colleen',
  'Jefferson',
  'Valerie',
  'Dennis',
  'Lorraine',
  'Bishop',
  'Glenn',
  'Stone',
  'Erick',
  'Watkins',
  'Courtney',
  'Garrett',
  'Neal',
  'Davidson',
  'Kristen',
  'Nguyen',
  'Jon',
  'Norton',
  'Harry',
  'Ramsey',
  'Dan',
  'Brady',
  'Marian',
  'Stokes',
  'Gwen',
  'Schmidt',
  'Gail',
  'Alvarado',
  'Mildred',
  'Ortega',
  'Ted',
  'Martin',
  'Jose',
  'Bell',
  'Patty',
  'Perez',
  'Deanna',
  'Blair',
  'Ricardo',
  'Hoffman',
  'Homer',
  'Schultz',
  'Michael',
  'Nunez',
  'Brendan',
  'Ballard',
  'Verna',
  'Morton',
  'Bernard',
  'Taylor',
  'Alejandro',
  'Figueroa',
  'Rosalie',
  'Keller',
  'Armando',
  'Gutierrez',
  'Melvin',
  'Chambers',
  'Lori',
  'Hicks',
  'Seth',
  'Waters',
  'Lena',
  'Daniels',
  'Linda',
  'Dawson',
  'Garry',
  'Poole',
  'Chester',
  'Cohen',
  'Frank',
  'Garner',
  'Rick',
  'Hawkins',
  'Donna',
  'Howell',
  'Andrea',
  'Jennings',
  'Conrad',
  'Potter',
  'Irma',
  'Sanders',
  'Marion',
  'Smith',
  'Lila',
  'Hanson',
  'Madeline',
  'Foster',
  'Clint',
  'Meyer',
  'Jodi',
  'Graves',
  'Frances',
  'Fletcher',
  'Mack',
  'Castillo',
  'Patti',
  'Tucker',
  'Lynda',
  'Hamilton',
  'Nellie',
  'Kelley',
  'Vicky',
  'Buchanan',
  'Candice',
  'Mann',
  'Krista',
  'Webster',
  'Wayne',
  'Robinson',
  'Jan',
  'Welch',
  'Willie',
  'Kennedy',
  'Jeff',
  'Medina',
  'Paula',
  'Sparks',
  'Micheal',
  'Sims',
  'Velma',
  'Shelton',
  'Kathy',
  'Freeman',
  'Howard',
  'Wilson',
  'Billy',
  'Harrison',
  'Claire',
  'Carter',
  'Wallace',
  'Goodwin',
  'Jimmie',
  'Schwartz',
  'Robin',
  'Hart',
  'Leigh',
  'Paul',
  'Rhonda',
  'George',
  'Flora',
  'Grant',
  'Chris',
  'Richards',
  'Ignacio',
  'Huff',
  'Roberta',
  'Obrien',
  'Ivan',
  'Green',
  'Aubrey',
  'Cooper',
  'Helen',
  'Banks',
  'Dwayne',
  'Pittman',
  'Charlene',
  'Garcia',
  'Suzanne',
  'Walters',
  'Hugh',
  'Mcdaniel',
  'Rickey',
  'Lloyd',
  'Mona',
  'Mendoza',
  'Lionel',
  'Morris',
  'Carla',
  'Stevenson',
]

const removeRepeated = names => {
  const newNames = []
  for (let name of names) {
    if (newNames.includes(name)) {
      continue
    }
    newNames.push(name)
  }
  return newNames
}

function wait(sec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, sec * 1000)
  })
}

function normalRandom() {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) return normalRandom() // resample between 0 and 1
  return num
}

describe('dummy', () => {
  const cleanRandomNames = removeRepeated(randomNames)
  cleanRandomNames.forEach((name, index) => {
    it(`can calculate name for ${name}`, async () => {
      await wait(normalRandom())
      expect(true).toBe(true)
    })
  })
})
