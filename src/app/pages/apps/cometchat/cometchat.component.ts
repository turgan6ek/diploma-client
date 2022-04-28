import {UntilDestroy} from '@ngneat/until-destroy';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';

@UntilDestroy()
@Component({
    selector: 'vex-chat',
    templateUrl: './cometchat.component.html'
})
export class CometchatComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }
}
