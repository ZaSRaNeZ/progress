var vueHTML =` 
<style>@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
* {
  font-family: 'Montserrat', sans-serif;
}

.lds-dual-ring {
  display: inline-block;
  width: 30px;
  height: 30px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 14px;
  height: 14px;
  margin: 3px;
  border-radius: 50%;
  border: 5px solid #ff9800;
  border-color: #ff9800 transparent #ff9800 transparent;
  -webkit-animation: lds-dual-ring 1.2s linear infinite;
          animation: lds-dual-ring 1.2s linear infinite;
}

@-webkit-keyframes lds-dual-ring {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes lds-dual-ring {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

.slide-leave-active,
.slide-enter-active {
  -webkit-transition: .5s;
  transition: .5s;
}

.slide-enter {
  -webkit-transform: translate(0, 100%);
          transform: translate(0, 100%);
}

.slide-leave-to {
  -webkit-transform: translate(0, 200%);
          transform: translate(0, 200%);
}

.h1 {
  font-size: 28px;
  font-weight: 800;
}

.h2 {
  font-size: 24px;
  font-weight: 700;
  padding: 20px 0;
}

#header .controls {
    margin-top: 30px;
}

#app {
  width: 100%;
  -webkit-transition: 0.4s width;
  transition: 0.4s width;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  position: absolute;
  z-index: 999;
  background: #fff;
  color: #000;
}

.check-list-page__container {
  padding: 0 40px;
  min-width: 1200px;
  padding-bottom: 50px;
}

.check-list-page__wrapper {
  max-width: 80%;
  min-width: 800px;
  padding: 0 20px;
  margin: auto;
}

.check-list-page__close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  cursor: pointer;
}

.check-list-page__close:hover {
  opacity: 1;
}

.check-list-page__close:before, .check-list-page__close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #3c7af3;
}

.check-list-page__close:before {
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}

.check-list-page__close:after {
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}

.check-list-page__title {
  padding: 20px 0;
}

.check-list-page__sale-comment {
  margin-top: 50px;
  padding: 20px 50px;
  margin: auto;
  background: #1a8ad8;
  border-radius: 15px;
}

.check-list-page__sale-title {
  color: #fff;
}

.check-list-page__sale-text {
  color: #fff;
  font-size: 18px;
}

.checklist__title {
  font-size: 18px;
}

.checklist__list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: stretch;
      -ms-flex-align: stretch;
          align-items: stretch;
}

.checklist__block {
  width: calc(33% - 10px);
  margin: 5px;
  padding: 30px;
  background: #E6F4F1;
  border-radius: 15px;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  position: relative;
  transition: 0.2s box-shadow;
}

.checklist__block:hover {
    box-shadow: 0 0 15px #c1c0c0;
}

.checklist__checkbox {
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  border: 2px solid #3a3a3a;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
}

.checklist__lvl2 {
  position: relative;
  padding: 10px 0 0 35px;
}

.checklist__item {
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 5px 0;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

.checklist__item.done {
  color: green;
}

.checklist__item.done .checklist__checkbox {
  border-color: green;
}

.checklist__item.done .checklist__checkbox::after {
  content: '';
  display: block;
  border-bottom: 2px solid green;
  border-right: 2px solid green;
  width: 10px;
  height: 15px;
  -webkit-transform: rotate(40deg);
          transform: rotate(40deg);
  position: absolute;
  top: 3px;
  left: 8px;
}

.checklist__item.inProgress {
  color: #ff9800;
}

.checklist__item.inProgress .checklist__checkbox {
  border-color: #ff9800;
}

.checklist__done-count {
  position: absolute;
  right: 30px;
  top: 20px;
}

.project-status {
  width: 100%;
  height: 30px;
  background: #b1cbff;
  position: relative;
}

.project-status__progress {
  height: 100%;
  background: #3c7af3;
  width: 0;
}

.project-status__text {
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  z-index: 9999;
  position: absolute;
  line-height: 30px;
  top: 0;
}

.project-status__button {
  background: #2f68bad6;
  color: #fff;
  outline: none;
  border: none;
  padding: 2px 4px 4px 4px;
  cursor: pointer;
  border-radius: 4px;
}
/*# sourceMappingURL=style.css.map */
</style>   

<div id="app" v-bind:class="{open : open}">
<div class="project-status">
    <div class="project-status__progress" v-bind:style="{width: progress + '%'}"></div>
    <div class="project-status__text">
        <span class="project-status__count">
            Ваш проект настроен на {{progress}} %  &nbsp; &nbsp;
            <button class="project-status__button" @click="openClose()">Чеклист</button>
        </span>
    </div>
</div>

<transition name="slide">
    <div class="check-list-page" v-if="open" id="checkListPage">
        <div class="check-list-page__container">
            <div class="check-list-page__close" @click="openClose()" id="checklistPageClose"></div>
            <div class="check-list-page__title h1">Этапы создания интернет-магазина</div>
            <div class="check-list-page__wrapper">
                <div class="check-list-page__sale-comment">
                    <div class="check-list-page__sale-title h2">Уточнения по роекту озвученные вашему менеджеру
                    </div>
                    <div class="check-list-page__sale-text">
                        {{sites[0][2]}}
                    </div>
                </div>
            </div>
            <div class="check-list-page__checklist checklist">
                <div class="checklist__title h2">Чеклист</div>
                <div class="checklist__list">
                    <template v-for="item of checkList">
                        <template v-if="item[1] === 0">
                            <div class="checklist__block">
                                <div class="checklist__item" v-bind:class="{done : doneCounter(item[0],true) }">
                                    <div class="checklist__checkbox"></div>
                                    <div class="checklist__title">{{item[2]}}</div>
                                    <div class="checklist__done-count">{{doneCounter(item[0])}}</div>
                                </div>
                                <div class="checklist__lvl2">
                                    <template v-for="innerItem of checkList">
                                        <template v-if="innerItem[1] === item[0]">
                                            <div class="checklist__item"
                                                v-bind:class="statusCheck(innerItem[0])" @click="doneClick(innerItem[0])">
                                                <div class="checklist__checkbox">
                                                    <template v-if="inProgressCheck(innerItem[0])">
                                                        <div class="lds-dual-ring"></div>
                                                    </template>
                                                </div>
                                                <div class="checklist__title">{{innerItem[2]}}</div>
                                            </div>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</transition>
</div>`

function StartVueProggress() {

    $(vueHTML).insertAfter('#header .top.padder')
    vueApp();

}



function vueApp(){
    var app = new Vue({
        el: '#app',
        data: {
            open: false,
            checkList: [
                [
                    1,
                    0,
                    "Контент"
                ],
                [
                    2,
                    0,
                    "Дизайн"
                ],
                [
                    3,
                    0,
                    "Индивидуальная информация"
                ],
                [
                    4,
                    0,
                    "Интеграции"
                ],
                [
                    5,
                    0,
                    "Общие настройки сайта"
                ],
                [
                    6,
                    1,
                    "Настройка шаблонов"
                ],
                [
                    7,
                    1,
                    "Настройка структуры"
                ],
                [
                    8,
                    1,
                    "Добавление товаров"
                ],
                [
                    9,
                    1,
                    "Добавление баннеров"
                ],
                [
                    10,
                    2,
                    "Выбрать дизайн из галереи"
                ],
                [
                    11,
                    2,
                    "Настроить цветовую гамму"
                ],
                [
                    12,
                    2,
                    "Внести правки"
                ],
                [
                    13,
                    2,
                    "Добавить иконки разделов"
                ],
                [
                    14,
                    2,
                    "Изменить иконки примуществ"
                ],
                [
                    15,
                    2,
                    "Настроить стикеры"
                ],
                [
                    16,
                    3,
                    "Номера телефонов"
                ],
                [
                    17,
                    3,
                    "Адреса"
                ],
                [
                    18,
                    3,
                    "Карта проезда"
                ],
                [
                    19,
                    3,
                    "Время работы"
                ],
                [
                    20,
                    3,
                    "О магазине"
                ],
                [
                    21,
                    3,
                    "Слоган"
                ],
                [
                    22,
                    3,
                    "Заполнение инфо страниц"
                ],
                [
                    23,
                    5,
                    "Варианты оплат"
                ],
                [
                    24,
                    5,
                    "Варианты доставки"
                ]
            ],
            sites: [
                [
                    1,
                    "satan666.horoshop.ua",
                    "Комментарии продавца по этому проекту",
                    [1,2,4,6,7,8,9,12,21,15,34],
                    "11,13"
                ]
            ],
            domain: "satan666",
        },
        computed : { 
            progress: function(){
                //let done = this.sites[0][3].split(','),
                let done = this.sites[0][3];
                out = done.length / this.checkList.length * 100;
                console.log(out);
                return Math.round(out);
            }
        },
        methods:{
            checkListTitle: ()=>{
                let out = [];
                for(item in this.checkList){
                    if (this.checkList[item][1] == 0) out.push(this.checkList[item][2]); 
                    console.log(this.checkList[item][1])
                }
                return out;
            },
            statusCheck: function(itemId) {
                //let done = this.sites[0][3].split(',');
                let done = this.sites[0][3];
                for(item of done){
                    if (parseInt(item) == parseInt(itemId)){
                        return 'done';
                    }else{
                        if(this.inProgressCheck(itemId)) return 'inProgress';
                    }
                }
                
            },        
            doneCounter: function(itemId, check =false){
                //let done = this.sites[0][3].split(','),
                let done = this.sites[0][3],
                    all =0,
                    doneCount =0;
                for(listItem of this.checkList){
                    if (listItem[1] == parseInt(itemId)){
                    all++;
                    for(item of done){
                            console.log(itemId, listItem[1] )
                            if(listItem[0] == parseInt(item)){
                                doneCount++;
                            }
                    }
                }
                };
                if(check){
                    return doneCount == all;
                }
                return `${doneCount}/${all}`;
            },
            inProgressCheck: function(itemId){
                let inProgress = this.sites[0][4].split(',');
                for(item of inProgress){
                    if (parseInt(item) == parseInt(itemId)){
                        return true;
                    }
                }
            },
            openClose: function(){
                if (this.open) this.open = false;
                else if (!this.open) this.open = true;
            },
            doneClick: function(itemId){
                console.log(itemId)
                let index = this.sites[0][3].indexOf(itemId);
                if( index < 0) this.sites[0][3].push(itemId)
                else this.sites[0][3].splice(index,1);
                
            }
        }
    })
    
    
    function getData() {
        var app = `https://script.google.com/macros/s/AKfycbwI6gydsZDQXi1bMd28kZ0psylx-d93xvOlFispUT_eRvqX7QZLdJCn/exec${'?domain='+window.location.hostname}`,
            output = {},
            xhr = new XMLHttpRequest();
        xhr.open('GET', app);
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            if (xhr.status == 200) {
                try {
                    var output = JSON.parse(xhr.response);
                } catch (e) {}
            }
            console.log('data was get');
            data = output;
            update();
        }
        xhr.send()
    };
    
    


}


//StartVueProggress();
window.onload = function(){
    console.log('StartVueProggress')
    StartVueProggress();
};
