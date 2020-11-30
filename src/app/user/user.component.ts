import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '../service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public account;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buidForm();
    this.getUser();
  }

  getUser() {
    const userStorage = localStorage.getItem('user');
    const userJson = JSON.parse(userStorage);
    const email = userJson.email;
    this.getAndSaveCurrentUser(email);
  }

  getAndSaveCurrentUser(email) {
    this.firebase.getCurrentUser(email)
    .subscribe((res) => {
      this.account = res;
      this.account = this.account.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
      this.account = this.account.shift();
    });
  }

  buidForm() {
    this.form = this.formBuilder.group({
      name: [''],
      address: [''],
      phone: ['']
    });
  }

  saveAccount() {
    const data = this.form.value;
    this.firebase.saveAccount(data, this.account.key)
    .then((res) => {
      console.log('account', data);
      this.router.navigateByUrl('/painel');
    });
  }
}