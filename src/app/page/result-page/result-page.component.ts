import {Component, inject} from '@angular/core';
import {UserStatisticInterface} from "../../data/interfaces/userStatistic.interface";
import {ResultService} from "../../data/services/result/result.service";
import {getUUID} from "../../utilites/uuid.utilites";
import {StatisticComponent} from "../../command-ui/statistic/statistic.component";

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [
    StatisticComponent
  ],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.scss'
})
export class ResultPageComponent {

  resultService = inject(ResultService);

  userStatistic : UserStatisticInterface[] =[]

  ngOnInit(): void {
    this.resultService.loadUserStatistics().subscribe(
      result => {
        this.userStatistic = result;
      }
    );
  }

  protected readonly getUUID = getUUID;
}
