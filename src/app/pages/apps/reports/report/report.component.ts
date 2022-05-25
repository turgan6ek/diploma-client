import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {CardService} from "../../../../services/card.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'vex-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'status'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  page = 0;
  size = 5;
  length: number;
  id: string;
  constructor(private cardService: CardService,
              private authService: AuthService) {
    this.id = this.authService.currentUserValue.id;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }
  public loadData(event?: PageEvent): void {
    let params = 'pageNumber=' + this.page + '&pageSize=' + this.size;
    if (event) {
      params = 'pageNumber=' + event.pageIndex + '&pageSize=' + event.pageSize;
    }
    this.cardService.getAllReportsById(this.id, params).subscribe(value => {
      this.dataSource = value.content;
      this.page = value.number;
      this.size = value.size;
      this.length = value.totalElements;
    });
  }
  public showPDF(): void {
    this.cardService.getPDF(this.id)
        .subscribe(x => {
          // It is necessary to create a new blob object with mime-type explicitly set
          // otherwise only Chrome works like it should
          var newBlob = new Blob([x], { type: "application/pdf" });

          // IE doesn't allow using a blob object directly as link href
          // instead it is necessary to use msSaveOrOpenBlob
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, this.id);
            return;
          }

          // For other browsers:
          // Create a link pointing to the ObjectURL containing the blob.
          const data = window.URL.createObjectURL(newBlob);

          var link = document.createElement('a');
          link.href = data;
          link.download = this.id;
          // this is necessary as link.click() does not work on the latest firefox
          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

          setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
          }, 100);
        });
  }
}

