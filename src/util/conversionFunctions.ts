interface Units {
  height: string,
  weight: string
}


// Imperial Conversions

export const convertDecimetersToFeet = (decimeters: number): string => {
  const inches: number = decimeters * 3.937;
  const feet: number = inches / 12;
  // console.log("FEET", feet, inches);
  return `${feet.toFixed()}' ${(inches % 12).toFixed()}"`;
};

export const convertHectogramsToPounds = (hectograms: number): string => {
  const ounces: number = hectograms * 3.527;
  const pounds: number = ounces / 16;
  return `${pounds.toFixed(1)} lbs`;
};

export const convertImperial = (decimeters: number, hectograms: number): Units => {
  return {
    height: convertDecimetersToFeet(decimeters),
    weight: convertHectogramsToPounds(hectograms)
  }
}

// Metric Conversions
export const convertDecimetersToMeters = (decimeters: number): string => {
  const meters: number = decimeters / 10;
  return `${meters.toFixed(2)} meters`;
}

export const convertHectogramsToKilograms = (hectograms: number): string => {
  const kilograms: number = hectograms / 10;
  return `${kilograms.toFixed(2)} kg`
}

export const convertMetric = (decimeters: number, hectograms: number): Units => {
  return {
    height: convertDecimetersToMeters(decimeters),
    weight: convertHectogramsToKilograms(hectograms)
  }
}

// All Conversions 
export const convertUnits = (decimeters: number, hectograms: number): Units[] => {
  return [{
    height: convertDecimetersToMeters(decimeters),
    weight: convertHectogramsToKilograms(hectograms)
  },{
    height: convertDecimetersToFeet(decimeters),
    weight: convertHectogramsToPounds(hectograms)
  }
  ]
  // Returns Array where [0: Metric Units, 1: Imperial Units]
}
// export const convertUnitsObject = (decimeters: number, hectograms: number): {} => {
//   return {
//     metric: {
//       height: convertDecimetersToMeters(decimeters),
//       weight: convertHectogramsToKilograms(hectograms)
//     },
//     imperial: {
//       height: convertDecimetersToFeet(decimeters),
//       weight: convertHectogramsToPounds(hectograms)
//     }
//   }
  
//   // Returns object where {metric: Metric Units, imperial: Imperial Units}
// }