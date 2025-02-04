import {Component, Input} from '@angular/core';
import {UserStatisticInterface} from "../../data/interfaces/userStatistic.interface";
import {SvgIconComponent} from "../svg-icon/svg-icon.component";

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent {
  @Input() userStatistic: UserStatisticInterface | null = null;

  computeSuccessRate(): string {
    const { attempts, successfulAttempts= 0 } = this.userStatistic || {};

    return attempts && attempts > 0
      ? `${(successfulAttempts / attempts * 100).toFixed(2)}%`
      : '0%';
  }

  moreClick() {
console.log('Languages : ', this.userStatistic?.sourceLanguage, this.userStatistic?.targetLanguage);
  }
}
