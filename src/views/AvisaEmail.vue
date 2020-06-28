<template>
  <b-container class="externa">
    <b-card class="interna">
      <b-form @submit.prevent="onSubmit()">
        <b-row>
          <b-col cols="12">
            <h1 class="h3 text-center my-4">
              <b>Verificação de usuário pendente!</b>
            </h1>
          </b-col>
        </b-row>
        <b-form-row>
          <b-col cols="12" class="text-center">
            <p>Por favor, verifique sua caixa de e-mail, pois encaminhamos um e-mail para você poder fazer a verificação da sua conta de usuário.</p>
            <img src="../assets/verificacaoEmail.jpg" alt="Validação de E-mail" />
          </b-col>
          <!-- <b-col cols="12">
            <b-button type="submit" block class="mt-4" variant="primary" href="/home">Logar</b-button>
          </b-col> -->
          <!-- <b-col cols="12">
            <small class="form-text text-muted mt-3 text-center">
              <a href="/">Clique Aqui</a>
              para reencaminhar o e-mail para fazer a verificação
            </small>
          </b-col> -->
        </b-form-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "avisaEmail",
  data() {
    return {};
  },

  methods: {

  },
  mounted() {
    
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