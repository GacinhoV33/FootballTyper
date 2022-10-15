const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
export default groupLetters;

export let CountryDict = new Map<string , string>();
CountryDict.set('Poland', 'PL')
CountryDict.set('United States', 'US')
CountryDict.set('Ecuador', 'EC')
CountryDict.set('Netherlands', 'NL')
CountryDict.set('Qatar', 'QA')
CountryDict.set('Senegal', 'SN')



export const groupTableData = {
  groups: [
    {
    name: "A",
    data: [
      {
        countryName: "Poland",
        points: 7,
        win: 2,
        draw: 1,
        loss: 0,
      },
      {
        countryName: "Poland",
        points: 7,
        win: 2,
        draw: 1,
        loss: 0,
      },
      {
        countryName: "Poland",
        points: 7,
        win: 2,
        draw: 1,
        loss: 0,
      },
      {
        countryName: "Poland",
        points: 7,
        win: 2,
        draw: 1,
        loss: 0,
      }]
  },
  {
    name: "B",
    data: [
      {
        countryName: "Denmark",
        points: 7,
        win: 2,
        draw: 1,
        loss: 0,
      },
      {
        countryName: "USA",
        points: 7,
        win: 2,
        draw: 1,
        loss: 0,
      },
      {
        countryName: "Greece",
        points: 7,
        win: 2,
        draw: 1,
        loss: 0,
      },
      {
        countryName: "Netherland",
        points: 7,
        win: 2,
        draw: 1,
        loss: 0,
      }]
  }
  ]
}

export const dummyRanking = {
  data: [
    {
      userName: "TestUser",
      points: 50, 
      // TODO 
    },
    {
      userName: "TestUser2",
      points: 40, 
      // TODO 
    },
    {
      userName: "testUser3",
      points: 30, 
      // TODO 
    }
  ]
}