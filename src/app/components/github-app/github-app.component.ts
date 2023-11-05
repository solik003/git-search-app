import { Component, OnInit } from "@angular/core";
import { GithubService } from "src/app/services/github.service";

@Component({
    selector: 'app-github-app',
    templateUrl: './github-app.component.html',
    styleUrls: ['./github-app.component.css'],
  })
  export class GithubAppComponent implements OnInit {
    // public githubUserQuery: string;
    public githubUserQuery: string = '';
    public githubProfile: any;
    public githubRepos: any[] = [];
    public errorMessage: string = '';
  
     constructor(private githubService: GithubService) {}
  


public searchUser() {
    this.githubService.getProfile(this.githubUserQuery).subscribe({
      next: (data) => {
        this.githubProfile = data;
        this.errorMessage = ''; 
      },
      error: (error) => {
        this.errorMessage = 'An error occurred. Please check the username or try again later.';
        console.error(error); 
      },
      complete: () => {
        console.log('Request completed.');
      },
    });

    this.githubService.getRepos(this.githubUserQuery).subscribe({
      next: (data) => {
        this.githubRepos = data; 
      },
      error: (error) => {
        this.errorMessage = 'An error occurred. Please check the username or try again later.';
        console.error(error); 
      },
    });
  }

  ngOnInit(): void {
    
  }
}
