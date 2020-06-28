<template>
  <b-container class="externa">
    <b-card
      class="interna"
      v-bind:style="alertError == true ?  'height: 580px !important'  :  'height: 400px' "
    >
      <b-form>
        <b-row>
          <b-col cols="12">
            <h1 class="h3 text-center my-4">
              <b>Recupere sua senha!</b>
            </h1>
          </b-col>
        </b-row>
        <b-form-row>
          <b-col cols="12" class="text-center">
            <p>Digite o seu e-mail que lhe enviaremos um e-mail com a sua senha.</p>
            <!-- <img src="../assets/checkedEmail.jpg" alt="Checado de E-mail" /> -->
          </b-col>
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
              <b-form-input id="email" v-model="esqueciSenha.email" type="text"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-button block @click="recuperarSenha" class="mt-2" variant="primary">Recuperar senha</b-button>
          </b-col>
        </b-form-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { emailService } from "@/service";

export default {
  name: "esqueciSenha",
  data() {
    return {
      esqueciSenha: {},
      errors: [],
      alertError: false
    };
  },

  methods: {
    recuperarSenha() {
      this.errors = [];
      if (!this.esqueciSenha.email) {
        this.errors.push("O campo 'E-mail' é obrigatório.");
        this.alertError = true;
        return;
      }

      if (this.alertError == true) {
        return;
      }

      emailService
        .recuperaSenha(this.esqueciSenha)
        .then(() => {
          this.infoMsg = "E-mail enviado com sucesso!";
          this.showAlertSuccess();
          this.$router.push("/");
        })
        .catch(error => {
          // this.errorMsg = error;
          this.errorMsg = "Erro ao enviar o e-mail";
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
  margin-top: -50px; /* Metade da valor da Altura */
  position: absolute;
  width: 500px; /* Valor da Largura */
  height: 550px; /* Valor da Altura */
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
    margin-top: -75px; /* Metade da valor da Altura */
    position: relative;
    width: 350px; /* Valor da Largura */
    height: 615px; /* Valor da Altura */
  }
}
</style>