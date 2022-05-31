import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScrumboardCard } from '../../interfaces/scrumboard-card.interface';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import icAssignment from '@iconify/icons-ic/twotone-assignment';
import icAdd from '@iconify/icons-ic/twotone-add';
import { scrumboardLabels, scrumboardUsers } from '../../../../../../static-data/scrumboard';
import icDescription from '@iconify/icons-ic/twotone-description';
import icClose from '@iconify/icons-ic/twotone-close';
import { ScrumboardList } from '../../interfaces/scrumboard-list.interface';
import { Scrumboard } from '../../interfaces/scrumboard.interface';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icImage from '@iconify/icons-ic/twotone-image';
import { ScrumboardAttachment } from '../../interfaces/scrumboard-attachment.interface';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import icInsertComment from '@iconify/icons-ic/twotone-insert-comment';
import { DateTime } from 'luxon';
import { ScrumboardComment } from '../../interfaces/scrumboard-comment.interface';
import icStar from '@iconify/icons-ic/twotone-star';
import {CardService} from "../../../../../services/card.service";
import {AuthService} from "../../../../../services/auth.service";

@Component({
  selector: 'vex-scrumboard-dialog',
  templateUrl: './scrumboard-dialog.component.html',
  styleUrls: ['./scrumboard-dialog.component.scss']
})
export class ScrumboardDialogComponent implements OnInit {

  form = this.fb.group({
    id: null,
    title: null,
    description: null,
    userUuids: [],
    weight: null,
    sprintId: null,
    deadline: null
  });

  priorities = [
    {id: 1, val: 'Low'},
    {id: 2, val: 'Medium'},
    {id: 3, val: 'High'},
    {id: 4, val: 'Urgent'}
  ];

  weights = [
    {id: 25, val: 'Easy'},
    {id: 50, val: 'Medium'},
    {id: 75, val: 'Hard'}
  ];

  commentCtrl = new FormControl();

  icAssignment = icAssignment;
  icDescription = icDescription;
  icClose = icClose;
  icAdd = icAdd;
  icMoreVert = icMoreVert;
  icDelete = icDelete;
  icImage = icImage;
  icAttachFile = icAttachFile;
  icInsertComment = icInsertComment;
  icStar = icStar;

  users: any;

  list: ScrumboardList;
  board: Scrumboard;
  role;
  constructor(private dialogRef: MatDialogRef<ScrumboardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {
                card: ScrumboardCard;
                list: ScrumboardList;
                board: Scrumboard;
              },
              private fb: FormBuilder,
              private cardService: CardService,
              private authService: AuthService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.roles[0];
    this.cardService.getAllUsers().subscribe(res => {
      this.users = res;
    })
    if (this.data.list) {
      this.list = this.data.list;
    }
    this.board = this.data.board;
    if (this.data.card) {
      const card = this.data.card;
      this.form.patchValue({
        id: card.id,
        title: card.title || '',
        description: card.description || '',
        userUuids: card.userUuids || [],
        weight: card.weight,
        sprintId: 1,
        deadline: card.deadline
      });
    }
    const card = this.data.card;

    this.form.valueChanges.subscribe();
  }

  save() {
    this.cardService.saveCard(this.form.value).subscribe(res => {
      this.form.value.id = res.id;
      console.log('res', res.id);
      this.close();
    });
  }

  close () {
    console.log('this.form.value', this.form.value);
    this.dialogRef.close(this.form.value);
  }
  compareFunction(o1: any, o2: any) {
    return (o1.id === o2.id);
  }
}
