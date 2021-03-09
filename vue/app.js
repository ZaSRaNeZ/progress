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
                "Внести правки",
                0
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
                [1,2,4,6,7,8,9,21,15,34],
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
            if( index < 0 && this.checkList[itemId-1][3] != 0) this.sites[0][3].push(itemId)
            else{
                if(this.checkList[itemId-1][3] != 0)this.sites[0][3].splice(index,1);
            } 
            
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

