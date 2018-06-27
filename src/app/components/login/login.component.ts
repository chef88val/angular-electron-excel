import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Route, Router } from "@angular/router";
import * as XLSX from 'xlsx';
import { DataService } from "../../dataservice.service";
type AOA = any[][];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogged: Boolean = false;

data: AOA = null;

  constructor( private _route: Router, private _DataService: DataService) { }

  ngOnInit() {
this.isLogged=this._DataService.getLogged()
  }

onSubmit(f: NgForm) {
  console.log(f.value.username, f.value.password);  // { first: '', last: '' }
  console.log(f.valid);  // false
  console.log(f.value.username==='kR' && f.value.password==='rksa1234')
  if(f.value.username==='kR' && f.value.password==='rksa1234'){
    this._DataService.setLogged(true)
    this.isLogged= true
    
  }
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
this._DataService.setData(this.data)
    this._route.navigate(['sheet']);
  };
  reader.readAsBinaryString(target.files[0]);
}
}
