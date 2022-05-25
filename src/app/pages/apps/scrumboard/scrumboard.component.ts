import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { ScrumboardList } from './interfaces/scrumboard-list.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ScrumboardCard } from './interfaces/scrumboard-card.interface';
import { trackById } from '../../../../@vex/utils/track-by';
import { scrumboards, scrumboardUsers } from '../../../../static-data/scrumboard';
import icNotifications from '@iconify/icons-ic/twotone-notifications';
import icInsertComment from '@iconify/icons-ic/twotone-insert-comment';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import { MatDialog } from '@angular/material/dialog';
import { ScrumboardDialogComponent } from './components/scrumboard-dialog/scrumboard-dialog.component';
import {concatAll, filter, last, map, switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Scrumboard } from './interfaces/scrumboard.interface';
import icAdd from '@iconify/icons-ic/twotone-add';
import { PopoverService } from '../../../../@vex/components/popover/popover.service';
import icClose from '@iconify/icons-ic/twotone-close';
import { FormControl } from '@angular/forms';
import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import {stagger40ms, stagger80ms} from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import {CardService} from "../../../services/card.service";
import {AuthService} from "../../../services/auth.service";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icSearch from "@iconify/icons-ic/twotone-search";
import {fadeInRight400ms} from "../../../../@vex/animations/fade-in-right.animation";
import {scaleIn400ms} from "../../../../@vex/animations/scale-in.animation";
import {Observable, of, Subscription} from "rxjs";
@Component({
  selector: 'vex-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss'],
})
export class ScrumboardComponent implements OnInit, AfterContentInit, AfterViewInit {

  static nextId = 100;

  board$: Observable<any>;

  addCardCtrl = new FormControl();
  addListCtrl = new FormControl();

  trackById = trackById;
  icNotifications = icNotifications;
  icInsertComment = icInsertComment;
  icAttachFile = icAttachFile;
  icDelete = icDelete;
  icAdd = icAdd;
  icClose = icClose;
  icStar = icStar;
  icStarBorder = icStarBorder;
  icMagnifier = icSearch;
  roles: any;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private popover: PopoverService,
              private cardService: CardService,
              private authService: AuthService) { }

  ngOnInit() {
    this.roles = this.authService.currentUserValue.roles[0];
    this.board$ = this.route.paramMap.pipe(
        map(paramMap => +paramMap.get('email')),
        map(scrumboardId => scrumboards.find(board => board.id === 1)),
    );
  }
  getCards(): void {
    this.board$.subscribe(board => {
      board.children[0].children = [];
      board.children[1].children = [];
      board.children[2].children = [];
      board.children[3].children = [];
    })
    this.cardService.getAllCardsByUser(JSON.parse(localStorage.getItem('currentUser')).id).subscribe(
        res => {
          for(let c of res) {
            switch (c.status) {
              case 'NEW':
                this.board$.subscribe(board => {
                  if (!board.children[0].children.includes(c)) {
                    board.children[0].children.push(c);
                  }
                })
                break;
              case 'IN_PROGRESS':
                this.board$.subscribe(board => {
                  if (!board.children[1].children.includes(c)) {
                    board.children[1].children.push(c);
                  }
                })
                break;
              case 'TEST':
                this.board$.subscribe(board => {
                  if (!board.children[2].children.includes(c)) {
                    board.children[2].children.push(c);
                  }
                })
                break;
              case 'DONE':
                this.board$.subscribe(board => {
                  if (!board.children[3].children.includes(c)) {
                    board.children[3].children.push(c);
                  }
                })
                break;
            }
          }
        }
    );
  }
  open(board: Scrumboard, list?: ScrumboardList, card?: ScrumboardCard) {
    console.log("open")
    this.addCardCtrl.setValue(null);
    if (list) {
      this.dialog.open(ScrumboardDialogComponent, {
        data: { board, list, card},
        width: '700px',
        maxWidth: '100%',
        disableClose: true
      }).beforeClosed().pipe(
          filter<ScrumboardCard>(Boolean)
      ).subscribe(value => {
        const index = list.children.findIndex(child => child.id === card.id);
        if (index > -1) {
          list.children[index] = value;
        }
      });
    } else {
      this.dialog.open(ScrumboardDialogComponent, {
        data: { board },
        width: '700px',
        maxWidth: '100%',
        disableClose: true
      }).beforeClosed().pipe(
          filter<ScrumboardCard>(Boolean)
      ).subscribe(value => {
        this.board$.subscribe(back => {
          back.children[0].children.push(value);
        });
      });
    }
  }

  drop(event: CdkDragDrop<ScrumboardCard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      switch (event.container.id) {
        case '1':
          this.cardService.changeStatus(event.item.data.id, "NEW").subscribe();
          break;
        case '2':
          this.cardService.changeStatus(event.item.data.id, "IN_PROGRESS").subscribe();
          break;
        case '3':
          this.cardService.changeStatus(event.item.data.id, "TEST").subscribe();
          break;
        case '4':
          this.cardService.changeStatus(event.item.data.id, "DONE").subscribe();
          break;
      }

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropList(event: CdkDragDrop<ScrumboardList[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getConnectedList(board: Scrumboard) {
    return board.children.map(x => `${x.id}`);
  }

  openAddCard(list?: ScrumboardList, content?: TemplateRef<any>, origin?: HTMLElement) {
    this.popover.open({
      content,
      origin,
      position: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
      ]
    });
  }

  openAddList(board: Scrumboard, content: TemplateRef<any>, origin: HTMLElement) {
    this.popover.open({
      content,
      origin,
      position: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
      ]
    });
  }


  createList(board: Scrumboard, close: () => void) {
    if (!this.addListCtrl.value) {
      return;
    }

    board.children.push({
      id: ScrumboardComponent.nextId++,
      label: this.addListCtrl.value,
      children: []
    });

    close();

    this.addListCtrl.setValue(null);
  }

  toggleStar(board: Scrumboard) {
    board.starred = !board.starred;
  }

  ngAfterContentInit(): void {
    this.getCards();
  }
  delete(card, list): void {
    const index: number = list.children.indexOf(card);
    if (index !== -1) {
      list.children.splice(index, 1);
    }
    this.cardService.deleteCard(card.id).subscribe();
  }

  ngAfterViewInit(): void {
  }



}
