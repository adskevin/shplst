<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-card class="mt-5">
            <div slot="header">
              <b-row>
                <b-col cols="12">
                  <h4>Editar Perfil</h4>
                </b-col>
              </b-row>
            </div>
            <b-form-row>
              <b-col cols="12">
                <b-alert variant="danger" :show="alertError" class="p-3 mb-3 text-secondary">
                  <div v-if="errors.length">
                    <p class="pb-2 text-danger text-center">
                      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                    </p>
                    <ul class="list-group">
                      <li
                        class="list-group-item list-group-item-danger"
                        v-for="error in errors"
                        :key="error"
                      >{{ error }}</li>
                    </ul>
                  </div>
                </b-alert>
              </b-col>
              <b-col md="12">
                <b-form-group>
                  <label for="titulo">Nome:</label>
                  <b-form-input type="text" v-model="people.name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="titulo">E-mail:</label>
                  <b-form-input type="email" disabled v-model="this.people.email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="titulo">Senha Atual:</label>
                  <b-form-input type="password" v-model="people.password"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="titulo">Nova Senha:</label>
                  <b-form-input type="password" v-model="people.new_password"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="titulo">Confirme Nova Senha:</label>
                  <b-form-input type="password" v-model="confirmarSenha"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="12" style="text-align: right;">
                <b-button class="mr-3" variant="primary" @click="savePeople()">Salvar</b-button>
                <b-button variant="secondary" @click="voltarLista()">Cancelar</b-button>
              </b-col>
            </b-form-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { peopleService } from "../service/people.service.js";
export default {
  name: "peopleEdit",
  data() {
    return {
      people: [],
      infoMsg: "",
      errorMsg: "",
      toastCount: 0,
      confirmarSenha: "",
      errors: [],
      alertError: false
    };
  },
  methods: {
    findPeople(idPeople) {
      peopleService
        .getById(idPeople)
        .then(response => {
          this.people = response.data;
          this.people.password = "";
          // console.log(this.people);
        })
        .catch(error => {
          this.errorMsg = error;
          this.showAlertDanger();
        });
    },
    voltarLista() {
      this.$router.push("/home");
    },
    savePeople() {
      this.errors = [];
      this.alertError = false;

      if (!this.people.name) {
        this.errors.push("O campo 'Nome' é obrigatório.");
        this.alertError = true;
        return;
      }
      if (!this.people.email) {
        this.errors.push("O campo 'E-mail' é obrigatório.");
        this.alertError = true;
        return;
      }
      if (!this.people.password) {
        this.errors.push("O campo 'Senha Atual' é obrigatório.");
        this.alertError = true;
        return;
      }
      // if (!this.people.new_password) {
      //   this.errors.push("O campo 'Nova Senha' é obrigatório.");
      //   this.alertError = true;

      //   return;
      // }
      if (this.people.new_password || this.confirmarSenha) {
        if (!this.confirmarSenha) {
          this.errors.push("O campo 'Confirmar Senha' é obrigatório.");
          this.alertError = true;
          // return;
        }
        if (!this.people.new_password) {
          this.errors.push("O campo 'Nova senha' é obrigatório.");
          this.alertError = true;
          // return;
        }
        if (this.people.new_password != this.confirmarSenha) {
          this.errors.push("As senhas inseridas não são iguais.");
          this.alertError = true;
          /// return;
        }
        if(this.alertError){
          return;
        }
      }

      if (this.alertError == true) {
        return;
      }

      peopleService
        .edit(this.people, this.people.id)
        .then(() => {
          this.infoMsg = "Cadastro atualizado com sucesso!";
          this.showAlertSuccess();
          this.voltarLista();
        })
        .catch(error => {
          console.log(error);
          this.errorMsg = "Erro ao atualizar o usuário.";
          this.showAlertDanger();
        });
    },
    showAlertSuccess(append = false) {
      this.toastCount++;
      this.$bvToast.toast(this.infoMsg, {
        title: "Sucesso",
        autoHideDelay: 5000,
        appendToast: append,
        variant: "success",
        solid: true
      });
    },
    showAlertDanger(append = false) {
      this.toastCount++;
      this.$bvToast.toast(this.errorMsg, {
        title: "Error",
        autoHideDelay: 5000,
        appendToast: append,
        variant: "danger",
        solid: true
      });
    }
  },
  mounted() {
    const idPeople = localStorage.getItem("id");
    this.findPeople(idPeople);
  }
};
</script>

<style>
</style>