<template>
  <div class="row">
    <div class="task-create-wrapper">
      <h1>Создание опроса</h1>

      <div class="infoall" v-for="(item) in alldata" :key="item.id">
        <span>{{item.itemopros.title}}</span>
      </div>

      <form>

        <div class="formcreate">


          <div class="input-field">
            <input id="title" v-model="titleGlav" type="text" class="validate" required>
            <label for="title">Тема опроса</label>
            <span class="helper-text" data-error="Title is required"></span>
          </div>

          <div class="input-field">
            <input id="title" v-model="title" type="text" class="validate" required>
            <label for="title">Вопрос</label>
            <span class="helper-text" data-error="Title is required"></span>
          </div>

          <!--  -->
          <div class="input-list">
            <label for="title">Варианты ответа</label>
        
            <div v-for="(item, key) in variant" :key="item.id" class="varaint_otv">
              <span>{{item.variantinfo}}</span>
                <div class="btn-group pull-right" role="group">
                  <button type="button" class="btn btn-danger btn-sm" v-bind:data-id="key" v-on:click.prevent.stop="remove">Удалить</button>
                </div>
            </div>

            <input type="text" v-model="variantinfo" class="form-control validate" id="variantinfo" placeholder="Введите вариант"/>
            <button class="btn btn-success" v-on:click.prevent.stop="add()">Добавить вариант</button>
          </div>
          <!--  -->


        </div>
          <button @click.prevent="addAll" class="btn add_new_block">Добавить блок</button>

          

        <input type="text" ref="datepicker">
        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Описание</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
        </div>
        <button class="btn" v-on:click.prevent.stop="submitHandler()">Создать опрос</button>
      </form>
      
      
    </div>
  </div>
</template>

<script>
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
export default {
  name: 'create',
  data: () => ({ //заготовка данных, с которыми будем работать
    titleGlav: '',
    description: '',
    title: '',
    chips: null,
    date: null,
    variant: [],
    variantinfo:"",
    alldata: []
  }),
  mounted() {
    //выбор даты используя библиотеку materialize
    this.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    })
  },
  methods: {
    addAll() { //добавление нового блока с вопросом и вариантами
      const itemoros = {
        title: this.title,
        variants: this.variant
      }

      this.alldata.push({itemopros: itemoros});

      this.title = "",
      this.variant = [];

      console.log(itemoros);
    },
    add() { // добавление варианта
      if( this.variantinfo ){
        this.variant.push({
          variantinfo: this.variantinfo,
          title: this.title
        });
        this.variantinfo = "";
      }
    },
    remove: function(ev){ //удаление варианта
      let id = parseFloat(ev.target.getAttribute('data-id'));
      this.variant.splice(id, 1);
    },
    submitHandler() { // создание опроса и запись в базу данных, оюработка данных происходит в сторе в файле index.js название createTask
      const task = this.alldata;
      const otherinfo = {
        title: this.titleGlav,
        id: Date.now(),
        date: this.date.date,
        description: this.description
      }

      this.$store.dispatch('createTask', {
        task,
        otherinfo
      });

      this.$router.push('/list'); // после возвращаемся неа страницу с опросами

    }
  },
  destroyed() { //удаляем дату из памяти, чтобы не нагружать приложение
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }

  }
}
</script>



<style lang="css">
  .add_new_block {
      margin-top: 35px;
      margin-bottom: 35px;
  }

  .varaint_otv {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  .formcreate {
    border: 1px solid rgb(202 202 202);
    padding: 40px;
  }
</style>