import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
  providers : [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  showInputBox: boolean;
  key:key;
  
  
  

  constructor(private toDoService: TodoService) {

    this.showInputBox=false;
    
   }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })

      //sort array isChecked false  -> true
        this.toDoListArray.sort((a,b) => {
          var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase()
          if (titleA<titleB)
            return -1
            if (titleA>titleB)
            return 1
            return 0 
          
        })
        
    });
  }

  onAdd(itemTitle) {

    let key = this.toDoListArray.filter((a)=> {
      
      return (a.title== itemTitle.value && a.isChecked==false);

    })

    

    
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
    this.showInputBox=false;
    

    
  }

    
  

  alterCheck($key: string,isChecked) {
    this.toDoService.checkOrUnCheckTitle($key,!isChecked);
  }

  onDelete($key : string){
    this.toDoService.removeTitle($key);

  }
  OnClickPlus() {
    this.showInputBox=true;
  }

  


  

  
}
interface key {

  id:string;
  title: string;
  isChecked:boolean;

}
