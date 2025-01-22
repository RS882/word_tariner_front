import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {

  @Input() icon = '';

  private readonly SVG_PATH = 'assets/images/svg';

  get href() {
    return this.icon ? `${this.SVG_PATH}/${this.icon}.svg#${this.icon}` : '';
  }

}
