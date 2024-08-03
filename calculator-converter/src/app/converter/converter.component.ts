import { Component } from '@angular/core';

enum ConvertType {
  Length,
  Weight,
  Temperature
}

enum LengthUnit {
  Meter = 'meter',
  Kilometer = 'kilometer',
  Centimeter = 'centimeter',
  Millimeter = 'millimeter',
  Inch = 'inch',
  Foot = 'foot',
  Yard = 'yard',
  Mile = 'mile'
}

enum WeightUnit {
  Gram = 'gram',
  Kilogram = 'kilogram',
  Milligram = 'milligram',
  Pound = 'pound',
  Ounce = 'ounce'
}

enum TemperatureUnit {
  Celsius = 'celsius',
  Fahrenheit = 'fahrenheit',
  Kelvin = 'kelvin'
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  ConvertType = ConvertType; // Expose enum to template
  convertType: ConvertType = ConvertType.Length;
  lengthUnits = Object.values(LengthUnit);
  weightUnits = Object.values(WeightUnit);
  temperatureUnits = Object.values(TemperatureUnit);

  fromUnit: LengthUnit | WeightUnit | TemperatureUnit = LengthUnit.Meter;
  toUnit: LengthUnit | WeightUnit | TemperatureUnit = LengthUnit.Kilometer;
  inputValue: number = 0;
  outputValue: number = 0;

  getUnits(): string[] {
    switch (this.convertType) {
      case ConvertType.Length:
        return this.lengthUnits;
      case ConvertType.Weight:
        return this.weightUnits;
      case ConvertType.Temperature:
        return this.temperatureUnits;
      default:
        return [];
    }
  }
  
  onConvert() {
    if (this.fromUnit && this.toUnit && !isNaN(this.inputValue)) {
      switch (this.convertType) {
        case ConvertType.Length:
          this.outputValue = this.convertLength(this.inputValue, this.fromUnit as LengthUnit, this.toUnit as LengthUnit);
          break;
        case ConvertType.Weight:
          this.outputValue = this.convertWeight(this.inputValue, this.fromUnit as WeightUnit, this.toUnit as WeightUnit);
          break;
        case ConvertType.Temperature:
          this.outputValue = this.convertTemperature(this.inputValue, this.fromUnit as TemperatureUnit, this.toUnit as TemperatureUnit);
          break;
      }
    } else {
      this.outputValue = 0;
    }
  }
  
  updateDefaultValues() {
    switch (this.convertType) {
      case ConvertType.Length:
        this.fromUnit = LengthUnit.Meter;
        this.toUnit = LengthUnit.Kilometer;
        break;
      case ConvertType.Weight:
        this.fromUnit = WeightUnit.Gram;
        this.toUnit = WeightUnit.Kilogram;
        break;
      case ConvertType.Temperature:
        this.fromUnit = TemperatureUnit.Celsius;
        this.toUnit = TemperatureUnit.Fahrenheit;
        break;
    }
    
    this.inputValue = 0;
    this.outputValue = 0;
  }  

  convertLength(value: number, fromUnit: LengthUnit, toUnit: LengthUnit): number {
    const conversionFactors: { [key: string]: number } = {
      [LengthUnit.Meter]: 1,
      [LengthUnit.Kilometer]: 1000,
      [LengthUnit.Centimeter]: 0.01,
      [LengthUnit.Millimeter]: 0.001,
      [LengthUnit.Inch]: 0.0254,
      [LengthUnit.Foot]: 0.3048,
      [LengthUnit.Yard]: 0.9144,
      [LengthUnit.Mile]: 1609.344
    };

    const meters = value * conversionFactors[fromUnit];
    return meters / conversionFactors[toUnit];
  }

  convertWeight(value: number, fromUnit: WeightUnit, toUnit: WeightUnit): number {
    const conversionFactors: { [key: string]: number } = {
      [WeightUnit.Gram]: 1,
      [WeightUnit.Kilogram]: 1000,
      [WeightUnit.Milligram]: 0.001,
      [WeightUnit.Pound]: 453.592,
      [WeightUnit.Ounce]: 28.3495
    };

    const grams = value * conversionFactors[fromUnit];
    return grams / conversionFactors[toUnit];
  }

  convertTemperature(value: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number {
    if (fromUnit === toUnit) {
      return value;
    }

    let celsius: number;

    // Convert from source unit to Celsius
    switch (fromUnit) {
      case TemperatureUnit.Fahrenheit:
        celsius = (value - 32) * (5 / 9);
        break;
      case TemperatureUnit.Kelvin:
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target unit
    switch (toUnit) {
      case TemperatureUnit.Fahrenheit:
        return (celsius * (9 / 5)) + 32;
      case TemperatureUnit.Kelvin:
        return celsius + 273.15;
      default:
        return celsius;
    }
  }
}
