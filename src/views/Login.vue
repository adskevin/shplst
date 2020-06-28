<template>
  <b-container class="externa">
    <b-card class="interna" v-bind:style="alertError == true ?  'height: 580px !important'  :  'height: 400px' ">
      <b-form @submit.prevent="onSubmit()">
        <b-row>
          <b-col cols="12">
            <h1 class="h3 text-center my-4">Lista de Compras</h1>
          </b-col>
        </b-row>
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
          <b-col cols="12">
            <b-form-group id="email" label="Email:" label-for="email">
              <b-form-input id="email" v-model="email" type="text"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group id="senha" label="Senha:" label-for="senha">
              <b-form-input id="senha" v-model="password" type="password"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-button type="submit" block class="mt-2" variant="primary">Logar</b-button>
          </b-col>
        </b-form-row>
      </b-form>
      <b-col cols="12">
        <small class="form-text text-muted mt-3">
          Cadastre-se,
          <a href="/peopleNew">Clique Aqui</a>
        </small>
        <small class="form-text text-muted">
          Esqueceu a senha?
          <a href="/esqueciSenha">Clique Aqui</a>
        </small>
      </b-col>
    </b-card>
  </b-container>
</template>

<script>
import { signIn } from "@/auth";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      errors: [],
      alertError: false
    };
  },

  methods: {
    async onSubmit() {
      this.errors = [];
      this.alertError = false;

      if (!this.email) {
        this.errors.push("O campo 'E-mail' é obrigatório.");
        this.alertError = true;
        return;
      }
      if (!this.password) {
        this.errors.push("O campo 'Senha' é obrigatório.");
        this.alertError = true;
        return;
      }

      if (this.alertError == true) {
        return;
      }

      await signIn(this.email, this.password).catch(error => {
        console.log(error);
        this.errorMsg = "Usuário ou senha inválidos.";
        // this.errorMsg = error
        this.showAlertDanger();
      });
      this.$router.push("/home");
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
.centroTela {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, 50%);
}
.externa {
  position: relative;
  width: 100%;
  height: 200px;
}
.interna {
  left: 50%;
  top: 50%;
  margin-left: -230px; /* Metade do valor da Largura */
  margin-top: 0px; /* Metade da valor da Altura */
  position: absolute;
  width: 500px; /* Valor da Largura */
  height: 400px; /* Valor da Altura */
}

@media screen and (max-width: 600px) {
  .externa {
    position: relative;
    width: 100%;
    height: 200px;
  }
  .interna {
    left: 50%;
    top: 50%;
    margin-left: -175px; /* Metade do valor da Largura */
    margin-top: 0px; /* Metade da valor da Altura */
    position: relative;
    width: 350px; /* Valor da Largura */
    height: 580px; /* Valor da Altura */
  }
}

</style>