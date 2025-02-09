import {Component, inject, Input} from '@angular/core';
import {UserStatisticInterface} from "../../data/interfaces/userStatistic.interface";
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {ResultService} from "../../data/services/result/result.service";
import {Router} from "@angular/router";

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

  resultService = inject(ResultService);
  route = inject(Router);

  computeSuccessRate(): string {
    const {attempts, successfulAttempts = 0} = this.userStatistic || {};

    return attempts && attempts > 0
      ? `${(successfulAttempts / attempts * 100).toFixed(2)}%`
      : '0%';
  }

  moreClick() {
    if (this.userStatistic) {
      const sourceLanguage = this.userStatistic.sourceLanguage;
      const targetLanguage = this.userStatistic.targetLanguage;
      this.resultService.loadUserResults(
        sourceLanguage,
        targetLanguage,
        0).subscribe(
        result => {
          console.log(result);
          this.resultService.translationsSourceLanguage = this.userStatistic ? sourceLanguage : null;
          this.resultService.translationsTargetLanguage = this.userStatistic ? targetLanguage : null;
          this.route.navigate(['/translations-result'])
        }
      )
    }
  }
}
