import { Component, OnInit } from '@angular/core';
import { Route, Router } from "@angular/router";
import { DataService } from "../../dataservice.service";
import { utils, write, WorkBook } from 'xlsx';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import * as _ from "lodash";
type AOA = any[][];
@Component({
  selector: 'app-sheetjs',
  templateUrl: './sheetjs.component.html',
  styleUrls: ['./sheetjs.component.scss']
})
export class SheetjsComponent implements OnInit {
  data: AOA = null;
  data_temp: any = []
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  tab: String = 'filter'
  filterHover: Boolean = false
  filter: any = {};
  selectFilters: any = {};
  itemSelected: any = { "status": "Confirmed by email 9.11.2017. Start up in Saudi Arabia ", "last_name": "Almalik ", "name": "Abdulrahman Salim M", "email": "abdulrahman.almalik@alumni.esade.edu", "citizenship": "Saudi Arabia", "ft_status": "Not seeking - Entrepreneur " }
  headers = []
  constructor(private _route: Router, private _DataService: DataService) { }

  ngOnInit() {
    this.headers = this._DataService.getHeaders()
    if (_.isNull(this._DataService.getData())) this._route.navigate([''])
    else {
      this.data = this._DataService.getData();
      this.data = this.loadData(this.data)
      this.data_temp = this.data
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "ft_status" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "citizenship" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "last_position_pre_MBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "last_sector_pre_MBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "company_area_pre_MBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "experience_pre_MBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "trackMBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "search_area" })].id)
      console.log(this.data)
    }
  }
  filterData() {
    _.forEach(this.filter, (filter, key) => {
      if (key === 'name' || key === 'lastname' || key === 'email') {
        this.data_temp = _.filter(this.data_temp, function (user) { console.log(user); return _.includes(user[key], filter) });
      } else
        this.data_temp = _.filter(this.data_temp, { [key]: filter })
      console.log(filter, key)
    })
    console.log(this.filter)
    this.loadTab('users');

  }
  loadDataFilters(tag) {
    this.selectFilters[tag] = this.selectDataFilters(tag, this.data)
  }
  selectDataFilters(tag, data) {
    let aux = ['']
    _.forEach(data, (value, key) => {
      if (_.indexOf(aux, value[tag]) < 0) {
        aux.push(value[tag])
      }
    })
    return aux
  }
  mouseEnter(div: string) {
    if (this.tab === 'filter' && !this.filterHover)
      this.filterHover = true;
  }

  mouseLeave(div: string) {
    if (this.tab === 'filter' && this.filterHover)
      this.filterHover = false
  }
  resetFilter() {
    this.filter = {};
    this.data_temp = this.data
  }
  selectItem(i) {
    this.itemSelected = i
    console.log(i)
  }
  loadFile() {
    this.data = null;
    this._route.navigate([''])
  }
  logOut() {
    this._DataService.setLogged(false);
    this.loadFile();
  }
  loadTab(tag) {
    this.tab = tag
    /* if (tag === 'filter') {
      document.getElementById('tabUser').removeAttribute('class');
      document.getElementById('tabFilter').className = 'active';
    } else if (tag === 'users') {
      document.getElementById('tabUser').className = 'active';
      document.getElementById('tabFilter').removeAttribute('class');
    } */
  }
  loadData(data) {
    let aux: any = [];

    data.forEach((element, index) => {
      console.log(index)
      if (index < 1) {

      } else if (index > 0) {
        let user = {};
        element.forEach((el, ind) => {

          let tagID = this.headers[ind].id
          if (_.isNil(tagID)) {
            user[tagID] = ""
          } else {
            if (ind == 0) user[tagID] = ""
            else
              user[tagID] = el
          }
        });
        aux.push(user)
      }
    });
    return aux;
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    console.log(evt)
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.data = this.loadData(this.data)
      this.data_temp = this.data
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "ft_status" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "citizenship" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "last_position_pre_MBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "last_sector_pre_MBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "company_area_pre_MBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "experience_pre_MBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "trackMBA" })].id)
      this.loadDataFilters(this.headers[_.findIndex(this.headers, { "id": "search_area" })].id)
      console.log(this.data)
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  exportFile() {
    const ws_name = 'SomeSheet';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(this.data);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      };
      return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'exported.xlsx');
  }
}
