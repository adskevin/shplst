<template>
  <b-container class="mt-5">
    <b-row>
      <b-col cols="12">
        <b-card>
          <div slot="header">
            <b-row>
              <b-col cols="9">
                <h4 class="mt-1">Listas de Compras</h4>
              </b-col>
              <b-col cols="3" style="text-align: right;">
                <b-button
                  v-show="tabCompartilhamento"
                  small
                  variant="secondary"
                  @click="addItemLista"
                >
                  <span>Inserir</span>
                </b-button>
              </b-col>
            </b-row>
          </div>
          <div class="tamanhoFixo">
            <b-tabs pills align="center" content-class="mt-3">
              <b-tab title="Minhas Listas" active @click="botaoInserirAparece()">
                <b-table
                  responsive
                  :fields="fieldsMinhasLista"
                  :items="minhasLista"
                  :show-empty="true"
                  empty-text="Não há listas."
                >
                  <template v-slot:cell(actions)="row" style="width: 555px">
                    <b-button
                      small
                      class="mr-1"
                      variant="info"
                      @click="editLista(row.item.id)"
                    >Editar</b-button>
                    <b-button small variant="danger" @click="deleteLista(row.item.id)">Deletar</b-button>
                  </template>
                  <template v-slot:cell(adicionarItens)="row">
                    <b-button
                      small
                      class="mr-1"
                      variant="info"
                      @click="adicionarItensLista(row.item)"
                    >Adicionar</b-button>
                    <b-button
                      small
                      variant="secondary"
                      @click="compartilharLista(row.item.id)"
                    >Compartilhar</b-button>
                  </template>
                  <template v-slot:cell(datetime)="row">{{formatarData(row.item.datetime)}}</template>
                </b-table>
              </b-tab>
              <b-tab title="Minhas Listas Compartilhadas" @click="botaoInserirEsconde()">
                <b-table
                  responsive
                  :fields="fieldsListasCompartilhadas"
                  :items="listasCompartilhadas"
                  :show-empty="true"
                  empty-text="Não há listas compartilhadas."
                  class="tableResponsive"
                >
                  <template v-slot:cell(actions)="row" style="width: 555px">
                    <b-button
                      small
                      class="mr-1"
                      variant="info"
                      @click="editLista(row.item.id)"
                    >Editar</b-button>
                    <b-button small variant="danger" @click="deleteLista(row.item.id)">Deletar</b-button>
                  </template>
                  <template v-slot:cell(adicionarItens)="row">
                    <b-button
                      small
                      class="mr-1"
                      variant="info"
                      @click="adicionarItensLista(row.item)"
                    >Adicionar</b-button>
                    <b-button
                      small
                      variant="secondary"
                      @click="compartilharLista(row.item.id)"
                    >Compartilhar</b-button>
                  </template>
                  <template v-slot:cell(datetime)="row">{{formatarData(row.item.datetime)}}</template>
                </b-table>
              </b-tab>
              <b-tab title="Listas Compartilhadas Comigo" @click="botaoInserirEsconde()">
                <b-table
                  responsive
                  :fields="fieldsListasCompartilhadasComigo"
                  :items="listasCompartilhadasComigo"
                  :show-empty="true"
                  empty-text="Não há listas compartilhadas comigo."
                  class="tableResponsive"
                >
                  <template v-slot:cell(actions)="row">
                    <b-button small variant="info" @click="editLista(row.item.id)">Editar</b-button>
                  </template>
                  <template v-slot:cell(adicionarItens)="row">
                    <b-button
                      small
                      class="mr-1"
                      variant="info"
                      @click="adicionarItensLista(row.item)"
                    >Adicionar</b-button>
                  </template>
                  <template v-slot:cell(datetime)="row">{{formatarData(row.item.datetime)}}</template>
                </b-table>
              </b-tab>
            </b-tabs>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-modal hide-footer id="modalAddUserList">
      <template
        v-slot:modal-title
      >{{listUserSelecionada.id == undefined ? 'Adicionar uma Lista de Compras' : 'Editar Lista'}}</template>
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
        <b-col sm="12">
          <b-form-group>
            <label for="titulo">Título da Lista</label>
            <b-form-input v-model="listUserSelecionada.name"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col class="12" style="text-align: right;">
          <b-button class="mx-3" variant="primary" @click="saveListUser()">Salvar</b-button>
          <b-button variant="secondary" @click="hideModalAddLista()">Cancelar</b-button>
        </b-col>
      </b-form-row>
    </b-modal>

    <b-modal hide-footer id="modalCompartilharLista">
      <template v-slot:modal-title>Compartilhar uma Lista</template>
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
        <b-col sm="12">
          <b-form-group>
            <label for="titulo">E-mail:</label>
            <b-form-input v-model="listCompartilha.email"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col class="12" style="text-align: right;">
          <b-button class="mx-3" variant="primary" @click="saveCompartilharLista()">Compartilhar</b-button>
          <b-button variant="secondary" @click="hideModalCompartilhaLista()">Cancelar</b-button>
        </b-col>
      </b-form-row>
    </b-modal>
  </b-container>
</template>

<script>
import { listService, listPersonService } from "@/service";
import moment from "moment";

export default {
  name: "listUser",
  data() {
    return {
      minhasLista: [],
      listUserSelecionada: {},
      fieldsMinhasLista: [
        {
          key: "actions",
          label: "Ações",
          thStyle: { width: "20% !important" }
        },
        { key: "name", label: "Nome da Lista" },
        {
          key: "datetime",
          label: "Data/Hora",
          thStyle: { width: "20% !important" }
        },
        {
          key: "adicionarItens",
          label: "Adicionar/Compartilhar",
          thStyle: { width: "25% !important" }
        }
      ],
      errorMsg: null,
      infoMsg: null,
      toastCount: 0,
      people: [],
      idPeople: null,
      errors: [],
      alertError: false,

      // Tab de Compartilhamento
      listasCompartilhadas: [],
      listCompartilha: {},
      fieldsListasCompartilhadas: [
        {
          key: "actions",
          label: "Ações",
          thStyle: { width: "20% !important" }
        },
        { key: "name", label: "Nome da Lista" },
        {
          key: "datetime",
          label: "Data/Hora",
          thStyle: { width: "20% !important" }
        },
        {
          key: "adicionarItens",
          label: "Adicionar/Compartilhar",
          thStyle: { width: "25% !important" }
        }
      ],

      //Tab de Listas Compartilhadas Comigo
      listasCompartilhadasComigo: [],
      listCompartilhaComigo: {},
      fieldsListasCompartilhadasComigo: [
        {
          key: "actions",
          label: "Ações",
          thStyle: { width: "13% !important" }
        },
        { key: "name", label: "Nome da Lista" },
        {
          key: "datetime",
          label: "Data/Hora",
          thStyle: { width: "20% !important" }
        },
        {
          key: "adicionarItens",
          label: "Adicionar",
          thStyle: { width: "15% !important" }
        }
      ],
      tabCompartilhamento: true,
      idLista: null
    };
  },
  methods: {
    addItemLista() {
      this.errors = [];
      this.alertError = false;
      this.listUserSelecionada = {};
      this.$bvModal.show("modalAddUserList");
    },
    hideModalAddLista() {
      this.$bvModal.hide("modalAddUserList");
    },
    findListUser() {
      listService.getByListPeople(this.idPeople).then(response => {
        this.minhasLista = response.data;
      });
    },
    saveListUser() {
      this.errors = [];
      this.alertError = false;

      if (!this.listUserSelecionada.name) {
        this.errors.push("O campo 'Título da Lista' é obrigatório.");
        this.alertError = true;
      }

      if (this.alertError == true) {
        return;
      }

      if (this.listUserSelecionada.id == null) {
        this.listUserSelecionada.person_id = this.idPeople;
        listService
          .save(this.listUserSelecionada)
          .then(() => {
            this.$bvModal.hide("modalAddUserList");
            this.findListUser();
            this.infoMsg = "Lista adicionada com sucesso!";
            this.showAlertSuccess();
          })
          .catch(error => {
            // this.errorMsg = error;
            this.errorMsg = "Erro ao criar a lista.";
            console.log(error);
            this.showAlertDanger();
          });
      } else {
        listService
          .edit(this.listUserSelecionada)
          .then(() => {
            this.findListUser();
            this.findMinhasListaCompartilhadas();
            this.$bvModal.hide("modalAddUserList");
            this.infoMsg = "Lista atualizada com sucesso!";
            this.showAlertSuccess();
          })
          .catch(error => {
            // this.errorMsg = error;
            this.errorMsg = "Erro ao atualizar a lista.";
            console.log(error);
            this.showAlertDanger();
          });
      }
    },
    editLista(idLista) {
      this.errors = [];
      this.alertError = false;
      const row = this.minhasLista.filter(data => data.id == idLista);
      if (row != null) {
        this.listUserSelecionada = row[0];
        this.$bvModal.show("modalAddUserList");
      }
    },
    deleteLista(idLista) {
      this.$bvModal
        .msgBoxConfirm("Deseja excluir essa lista de compras ?")
        .then(confirmed => {
          if (confirmed) {
            listService.delete(idLista).then(() => {
              this.findListUser();
              this.infoMsg = "Deletado com sucesso!";
              this.showAlertSuccess();
            });
          }
        })
        .catch(error => {
          this.errorMsg = error;
          this.showAlertDanger();
        });
    },
    adicionarItensLista(lista) {
      this.$router.push({
        name: "itens",
        params: { lista: lista }
      });
    },
    formatarData(data) {
      moment.locale("pt-br");
      return moment(data).format("DD[/]MM[/]YYYY HH:mm");
    },

    // Tab Minhas Listas Compartilhadas
    findMinhasListaCompartilhadas() {
      listService.GetListByMe().then(response => {
        this.listasCompartilhadas = response.data;
      });
    },

    // Tab Listas Compartilhadas Comigo
    findListasCompartilhadasComigo() {
      listService.GetListByShared(this.idPeople).then(response => {
        this.listasCompartilhadasComigo = response.data;
      });
    },
    compartilharLista(idLista) {
      this.errors = [];
      this.alertError = false;
      this.idLista = idLista;
      this.listCompartilha = {};
      this.$bvModal.show("modalCompartilharLista");
    },
    hideModalCompartilhaLista() {
      this.$bvModal.hide("modalCompartilharLista");
    },
    saveCompartilharLista() {
      this.errors = [];
      this.alertError = false;

      if (!this.listCompartilha.email) {
        this.errors.push("O campo 'E-mail' é obrigatório.");
        this.alertError = true;
      }

      this.listCompartilha.list_id = this.idLista;
      listPersonService
        .save(this.listCompartilha)
        .then(() => {
          this.$bvModal.hide("modalCompartilharLista");
          this.findMinhasListaCompartilhadas();
          this.infoMsg = "Lista compartilhada com sucesso!";
          this.showAlertSuccess();
        })
        .catch(error => {
          // this.errorMsg = error;
          this.errorMsg = "Erro ao compartilhar a lista.";
          console.log(error);
          this.showAlertDanger();
        });
    },
    botaoInserirAparece() {
      this.tabCompartilhamento = true;
    },
    botaoInserirEsconde() {
      this.tabCompartilhamento = false;
    },

    // Geral da tela
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
    this.idPeople = localStorage.getItem("id");
    this.findListUser(this.idPeople);
    this.findMinhasListaCompartilhadas();
    this.findListasCompartilhadasComigo();
  }
};
</script>

<style>
@media screen and (max-width: 1000px) {
  .tamanhoFixo {
    width: 100% !important;
    /* position: relative; */
    white-space: nowrap;
    overflow-x: hidden;
  }
}

.corHeaderCard {
  background-color: #007bff;
}
</style>