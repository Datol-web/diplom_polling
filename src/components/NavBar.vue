<template>
  <nav class="navbar teal lighten-1">
    <div class="nav-wrapper nav-desk">
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger white-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            USER
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/create" exact active-class="active">
          <a href="#">Создать опрос</a>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <a href="#">Список опросов</a>
        </router-link>
      </ul>
    </div>

    <div class="nav-wrapper nav-mobile">
      <img
        @click='toggle = !toggle'
        class="h_icon_menu"
        src="~@/assets/h_icon.png"
        alt=""
      />

      <div class="navmobile_slider" v-show='toggle'>
        <ul class="right hide-on-med-and-down">
          <p @click='toggle = !toggle'>
            <router-link
              tag="li" to="/create" exact active-class="active">
              <a href="#">Создать опрос</a>
            </router-link>
          </p>
          <p @click='toggle = !toggle'>
            <router-link tag="li" to="/list" active-class="active">
              <a href="#">Список опросов</a>
            </router-link>
          </p>

          <li>
            <a href="#" class="" @click.prevent="logout"> Выйти </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
    toggle: false
  }),
  watch: {
    
  },
  methods: {
    async logout() {
      //выход из авторизации
      await this.$store.dispatch("logout");
      this.$router.push("/?message=logout");
    },
  },
  mounted() {
    //инициализация выпадающего списка через библиотеку materialize
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    });
  },
  beforeDestroy() {},
};
</script>
