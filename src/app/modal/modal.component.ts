import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FirebaseService } from '../service/firebase.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  submitStatus: boolean = false;
  public form: FormGroup;
  public error = false;
  private user;


  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private auth: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.buidForm();
  }

  openSnackBar() {
    this._snackBar.open('Cadastro realizado com sucesso!', '< Dota2 />', {
      duration: 4000,
    });
  }


  buidForm() {
    this.form = this.formBuilder.group({
      name: [, { validators: [Validators.required]}],
      email: [ , {validators: [Validators.required, Validators.email]}],
      phone: [, {  validators: [Validators.required]}],
      password: [, { validators: [Validators.required, Validators.minLength(8)]}],
    });
  }

  submitForm() {
    const data = this.form.value;
    console.log('form login', data);
    this.auth.login(data)
    .then((res) => {
      this.getAndSaveCurrentUser(res.user.email);
    }).catch((err) => {
      this.error = true;
    });
  }

  resetInfo() {
     this.error = false;
  }

  getAndSaveCurrentUser(email) {
    this.firebase.getCurrentUser(email)
    .subscribe((res) => {
      this.user = res;
      this.user = this.user.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
      this.user = this.user.shift();
      localStorage.setItem('user', JSON.stringify(this.user));
      this.dialogRef.close();
      this.router.navigateByUrl('/painel');
    });
  }

  register() {
    const data = this.form.value;
    console.log('form login', data);
    this.auth.register(data)
    .then((res) => {
      this.firebase.createUser({name: this.form.value.name, email: this.form.value.email, phone: this.form.value.phone});
      this.dialogRef.close();
      this.openSnackBar();
    }).catch((err) => {
      this.error = true;
    });
  }
}
