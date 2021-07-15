import { Component } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nodejs-websocket-angular-demo';
  private socket$: WebSocketSubject<any>;
  clientMsg = '';
  serverNum?:number;
  serverMsg = '';
  constructor() {

    this.socket$ = new WebSocketSubject('ws://localhost:8099');

    this.socket$
      .subscribe(
        (message) => {
          console.log(message);
          if(typeof message === 'number'){
            this.serverNum = message;
          }else{
            this.serverMsg = message;
          }
        },
        (err) => console.error(err),
        () => console.warn('Completed!')
      );

    // setInterval(() => {
    //   this.socket$.next(new Date().toString());
    // }, 5000);

  }
  send() {
    this.socket$.next(this.clientMsg);
  }
}
