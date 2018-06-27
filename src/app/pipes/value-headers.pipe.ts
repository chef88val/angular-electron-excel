import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from "../dataservice.service";
import * as _ from "lodash";
@Pipe({
  name: 'valueHeaders'
})
export class ValueHeadersPipe implements PipeTransform {
  headers: any = []
  constructor( private _DataService:DataService) {

  }
  transform(value: any, args?: any): any {
    this.headers = this._DataService.getHeaders()

    return _.find(this.headers,{'id':value})['value'];
  }

}
