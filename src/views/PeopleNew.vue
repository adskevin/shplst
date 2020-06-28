<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-card class="mt-5">
            <div slot="header">
              <b-row>
                <b-col cols="12">
                  <h4>Cadastro de Novo Perfil</h4>
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
                  <label for="titulo">Nome do Usuário:</label>
                  <b-form-input type="text" v-model="peopleNew.name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group>
                  <label for="titulo">E-mail:</label>
                  <b-form-input type="email" v-model="peopleNew.email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group>
                  <label for="titulo">Senha:</label>
                  <b-form-input type="password" v-model="peopleNew.password"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="12" style="text-align: right;">
                <b-button class="mr-3" variant="primary" @click="savePeople()">Salvar</b-button>
                <b-button variant="secondary" @click="voltarLogin()">Cancelar</b-button>
              </b-col>
            </b-form-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { peopleService } from "@/service";
export default {
  name: "peopleNew",
  data() {
    return {
      peopleNew: {},
      verificaEmail: {},
      infoMsg: "",
      errorMsg: "",
      toastCount: 0,
      errors: [],
      alertError: false
    };
  },
  methods: {
    voltarLogin() {
      this.$router.push("/");
    },
    savePeople() {
      this.errors = [];

      if (!this.peopleNew.name) {
        this.errors.push("O campo 'Nome do Usuário' é obrigatório.");
        this.alertError = true;
        // return;
      }
      if (!this.peopleNew.email) {
        this.errors.push("O campo 'E-mail' é obrigatório.");
        this.alertError = true;
        // return;
      }
      if (!this.peopleNew.password) {
        this.errors.push("O campo 'Senha' é obrigatório.");
        this.alertError = true;
        // return;
      }
      if(this.alertError == true){
        return;
      }
      this.verificaEmail.email = this.peopleNew.email;
      peopleService
        .save(this.peopleNew)
        .then(() => {
          this.infoMsg = "Usuário adicionado com sucesso!";
          this.showAlertSuccess();
          this.voltarLogin();
          peopleService.enviaHash(this.verificaEmail).then(() => {
            console.log(this.verificaEmail);
          })
        })
        .catch(error => {
          this.errorMsg = 'Erro ao adicionar um usuário.';
          console.log(error);
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
  }
};
</script>

<style>
</style>