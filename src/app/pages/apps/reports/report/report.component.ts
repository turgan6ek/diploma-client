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
}

