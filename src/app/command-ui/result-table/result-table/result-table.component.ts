import {Component, inject, Input, SimpleChanges} from '@angular/core';
import {ResultsCountInterface} from "../../../data/interfaces/resultsCount.interface";
import {ResultService} from "../../../data/services/result/result.service";

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [],
  templateUrl: './result-table.component.html',
  styleUrl: './result-table.component.scss'
})
export class ResultTableComponent {
  @Input() resultsCount: ResultsCountInterface={attemptsCount: 0, successfulAttemptsCount: 0};
}
