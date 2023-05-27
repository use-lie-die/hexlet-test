import _ from 'lodash';
export default function solution(content){
  // BEGIN
  const data = content.split(`\n`)
    .map((town) => town.split(','))
    .slice(1, -1)
    .map((eachTown) => {
      const townObj = {
          date: eachTown[0],
          MaxTemperature: eachTown[1],
          MinTemperature: eachTown[2],
          Humidity: eachTown[3],
          Pressure: eachTown[4],
          WindSpeed: eachTown[5],
          WindDirection: eachTown[6],
          CityState: eachTown[7],
          TimeZone: eachTown[8],
        };
        return townObj;
    })

  //STEP 1
    const count = data.length;
    console.log(`Count: ${count}`);

  //STEP 2
    const towns = data.map((town) => town.CityState);
    const uniqTowns = _.uniq(towns);
    const sortTowns = _.sortBy(uniqTowns);
    console.log(`Cities: ${sortTowns.join(', ')}`);

  //STEP 3
    const hum = data.flatMap((town) => town.Humidity);
    const uniqHum = _.uniq(hum);
    const sortUniqHum= _.sortBy(uniqHum);
    console.log(`Humidity: Min: ${sortUniqHum[0]}, Max: ${sortUniqHum.at(-1)}`);

  //STEP 4
    const temp = data.flatMap((town) => {
      return [town.MaxTemperature, town.MinTemperature];
    });
    const uniqTemp = _.uniq(temp);
    const sortUniqTemp = _.sortBy(uniqTemp);
    const cities = data.filter((town) => town.MaxTemperature === sortUniqTemp.at(-1));
    console.log(`HottestDay: ${cities[0]['date']} ${cities[0]['CityState']}`);

  //STEP 5
    const dates = data.map((town) => town.date);
    const uniqDates = _.uniq(dates).sort();
    const countDates = uniqDates.length;

    let result = [];
    for (const city of sortTowns) {
      const maxTemp = data
        .filter(({CityState}) => CityState === city)
        .map(({MaxTemperature}) => MaxTemperature)
        .reduce((acc, temp) => {
          return acc + Number(temp);
        }, 0);
      const avgTemp = maxTemp / countDates;
      result.push([avgTemp, city]);
    };

    const onlyAvg = result.map(([temp, ]) => temp);
    const maxAvgNum = _.max(onlyAvg);
    
    const hotttestCity = result.filter(([temp,]) => temp === maxAvgNum);
    console.log(`HottestCity: ${hotttestCity[0][1]}`);
  // END
}