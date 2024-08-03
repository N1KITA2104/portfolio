import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  displayValue: string = '0';
  private currentInput: string = '';

  append(value: string) {
    if (this.displayValue === '0' || this.currentInput) {
      this.displayValue = value;
      this.currentInput = '';
    } else {
      this.displayValue += value;
    }
  }

  clear() {
    this.displayValue = '0';
    this.currentInput = '';
  }

  toggleSign() {
    if (this.displayValue.startsWith('-')) {
      this.displayValue = this.displayValue.substring(1);
    } else {
      this.displayValue = '-' + this.displayValue;
    }
  }

  calculate() {
    try {
      // Replace '%' with '/100' for percentage calculation
      const sanitizedValue = this.displayValue.replace(/%/g, '/100');
  
      // Evaluate the expression safely
      this.displayValue = this.evaluateExpression(sanitizedValue);
  
      // Reset current input
      this.currentInput = '';
    } catch (error) {
      this.displayValue = 'Error';
    }
  }
  
  // Simple parser for arithmetic expression
  evaluateExpression(expression: string): string {
    try {
      const result = new Function('return ' + expression)();
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  }
}
