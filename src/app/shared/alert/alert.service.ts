import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { alertDurationDefault } from './alert.constants';

@Injectable()
export class AlertService {

  private duration = alertDurationDefault;

  constructor(
    private matSnackBar: MatSnackBar
  ) {}

  /**
   * Shows an alert with the requested message.
   * @param {string} message
   * @param {string} [borderColor]
   * @param {number} [duration]
   */
  show(message: string, borderColor?: string, duration?: number) {
    if (!message) {
      throw new Error(`AlertService: A message is required to properly show an alert.`);
    }

    this.matSnackBar.open(message, '', {
      duration: duration || this.duration,
      panelClass: ['bf-elevated-4', `bf-${borderColor}-border-top`]
    });
  }

  /**
   * Gets the current alert duration.
   * @returns {number}
   */
  getDuration(): number {
    return this.duration;
  }

}
