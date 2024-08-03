import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
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

  partClear() {
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = '0';
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

  // Enhanced parser for arithmetic expression and functions
  evaluateExpression(expression: string): string {
    try {
      // Create a new function to evaluate the expression
      const result = new Function('Math', 'return ' + expression)(Math);
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  }

  // Define a mapping of key presses to methods
  private keyMap: { [key: string]: () => void | string } = {
    'Backspace': () => this.partClear(),
    'Enter': () => this.calculate(),
    '=': () => this.calculate(),
    'Escape': () => this.clear(),
    'C': () => this.clear(),
    '+': () => this.append('+'),
    '-': () => this.append('-'),
    '*': () => this.append('*'),
    '/': () => this.append('/'),
    '.': () => this.append('.'),
    '(': () => this.append('('),
    ')': () => this.append(')'),
    '%': () => this.append('%'),
    '0': () => this.append('0'),
    '1': () => this.append('1'),
    '2': () => this.append('2'),
    '3': () => this.append('3'),
    '4': () => this.append('4'),
    '5': () => this.append('5'),
    '6': () => this.append('6'),
    '7': () => this.append('7'),
    '8': () => this.append('8'),
    '9': () => this.append('9'),
  };

  // Handle global keydown events
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const action = this.keyMap[event.key];
    if (action) {
      if (typeof action === 'string') {
        this.append(action);
      } else {
        action();
      }
    }
  }
}
