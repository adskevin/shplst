<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="/home">Lista de Compras</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item-dropdown right> -->
        <!-- Using 'button-content' slot -->
        <b-dropdown class="m-md-2" variant="outline-light" dropleft v-if="nomePeople != undefined">
          <template v-slot:button-content>
            <strong>{{nomePeople}}</strong>
          </template>
          <b-dropdown-item @click="editPeople">Editar Perfil</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-dropdown>
        <!-- </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
// import { peopleService } from "../service/people.service.js";
import { signOut } from "@/auth";

export default {
  name: "navbar",
  data() {
    return {
      nomePeople: null
    };
  },
  methods: {
    editPeople() {
      this.$router.replace("peopleEdit");
    },
    logout(){
       signOut();
       this.$router.push("/");
    },
  },
   mounted() {
      this.nomePeople = localStorage.getItem('name');
    }
};
</script>

<style>
</style>