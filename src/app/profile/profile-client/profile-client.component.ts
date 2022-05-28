import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.scss']
})
export class ProfileClientComponent implements OnInit {

  constructor(private http: HttpClient) { }

  token : string | null ="" ;
  client={
    firstName:"",
    familyName:"",
    age:"",
    adress:"",
    email:"",
    image:""
  }
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.token =localStorage.getItem("token");
    this.http.get('http://localhost:3000/auth-client/clientInfo/'+this.token)
    .subscribe((result :any)  => {
      console.log(result);
      this.client.firstName=result.firstName ;
      this.client.familyName=result.familyName;
      this.client.age=result.age;
      this.client.adress=result.adress;
      this.client.email=result.email;
      if(result.image === undefined){
        this.client.image="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" ;
      }else{
        this.client.image=result.image;
      } 
    });
  }

  setImage(event: any){
    const fd=new FormData();
    const file =<File>event.target.files[0];
    fd.append("file",file,file.name);
    
    this.http.post("http://localhost:3000/auth-client/picture/"+this.token,fd)
        .subscribe((result:any) => {
           this.client.image=result.image;
        }) ;
  }





}