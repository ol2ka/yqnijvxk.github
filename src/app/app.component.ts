import { Component,OnInit } from '@angular/core';
import {TreeTableModule} from 'primeng/treetable';
import {TreeNode,SortEvent} from 'primeng/api';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


  files: TreeNode[];
  files2: TreeNode[];
  selectedNodes3: TreeNode[];

  cols: any[]; 
  counter = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.getFileSystem().then(files => this.files = files);
  	this.getFileSystem().then(files => {
  		this.files2 = files;
  		this.files2[0].expanded = true;
  	});
    this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

	onClick() {
	  this.counter++;
	  console.log(this.files);
	}


    getFileSystem() {
	    return this.http.get<any>('assets/filesystem.json')
	      .toPromise()
	      .then(res => <TreeNode[]>res.data);
    }

  customSort(event: SortEvent) {
  	console.log('event', event)
        //event.data = Data to sort
        //event.mode = 'single' or 'multiple' sort mode
        //event.field = Sort field in single sort
        //event.order = Sort order in single sort
        //event.multiSortMeta = SortMeta array in multiple sort

        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
        
	}

	nodeSelect(event) {
        console.log(event);
    }

    nodeUnselect(event) {
        console.log(event);
    }
}