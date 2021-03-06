var app = new Vue({
    el: '#app',
    data: {
        open: false,
        api:{
            saveDataHref:'https://script.google.com/macros/s/AKfycbzHchBnLYqROyjervt9_kXMp5rzVgIMJhA9Mf9TWYpLqB-3snIAXUcJV-O6KesN0pTM0g/exec',
            getDataHref: 'https://script.google.com/macros/s/AKfycbyI8LJsInMo9RjnFRodPzfT_0gUT-dxSne8fwwm5PWQQQE2Fqp87ifo4ZEei0lTxWTr6g/exec',
            doneId :'doneId',
            checklistBTN : 'checklistBTN',
            infoBTN : 'infoBTN',
            statisticsHref: 'https://script.google.com/macros/s/AKfycbzB0BLvFjdNbD2H5VNFIZN3lDkix1xhqJHoyqHni_0UYCb30sZK9DKaRbaFD-VzW1zv/exec'
        },
        info: {
            open: false,
            text: 'об`яснение по пункту',
            comment: false,
            commentText: 'Сейчас этой задачей занимается ваш менеджер. Он свяжется с вами по окончанию)',
            block: false,
            blockText: 'Этот пункт для вас может выполнить только ваш менеджер. Пожалуйста свяжитесь с ним'
        },
        checkList: [
        ],
        sites: [
            [
                1,
                "",
                "",
                [],
                []
            ]
        ],
        progress: 0,
        domain: "satan666",
    },
    computed: {
    },
    beforeCreate() {
        getData();
    },
    methods: {
        checkListTitle: () => {
            let out = [];
            for (item in this.checkList) {
                if (this.checkList[item][1] == 0) out.push(this.checkList[item][2]);
            }
            return out;
        },
        statusCheck: function (itemId) {
            //let done = this.sites[0][3].split(',');
            let done = this.sites[0][3];
            for (item of done) {
                if (parseInt(item) == parseInt(itemId)) {
                    return 'done';
                } else {
                    if (this.inProgressCheck(itemId)) return 'inProgress';
                }
            }
            if (this.inProgressCheck(itemId)) return 'inProgress';
        },
        doneCounter: function (itemId, check = false) {
            //let done = this.sites[0][3].split(','),
            let done = this.sites[0][3],
                all = 0,
                doneCount = 0;
            for (listItem of this.checkList) {
                if (listItem[1] == parseInt(itemId)) {
                    all++;
                    for (item of done) {
                        if (listItem[0] == parseInt(item)) {
                            doneCount++;
                        }
                    }
                }
            };
            if (check) {
                return doneCount == all;
            }
            return `${doneCount}/${all}`;
        },
        inProgressCheck: function (itemId) {
            let inProgress = this.sites[0][4];
                for (item of inProgress) {
                    if (parseInt(item) == parseInt(itemId)) {
                        return true;
                    }
                }
        },
        openClose: function () {
            if (this.open){
                this.open = false
            }
            else if (!this.open){ this.open = true;
                this.sendInfo(this.api.checklistBTN,'true');}
        },
        blockCheck: function (itemId) {
            for (i of this.checkList) {
                if (parseInt(i[0]) == parseInt(itemId)) {
                    if (parseInt(i[3]) == 0) {
                        return true
                    }
                }
            }
            return false;
        },
        openCloseInfo: function (itemId = -1, text) {
            if (this.info.text != text) {
                if (text == '' || text == undefined) {
                    this.info.text = 'Свяжитесь с вашим менеджером для уточнений и мы все расскажем по этому пункту =)';
                }
                else {
                    this.info.text = text;
                }
            }
            if (itemId >= 0) {
                //!----- Проверка статуса "В работе"
                if (this.inProgressCheck(itemId)) {
                    this.info.comment = true;
                }
                else { this.info.comment = false; }
                //!----- ПРоверка на блок отметки
                if (this.blockCheck(itemId)) {
                    this.info.block = true;
                }
                else {
                    this.info.block = false;
                }
            }
            //------ открыват / закрывает 
            if (this.info.open){ 
                this.info.open = false;
            }
            else if (!this.info.open){ 
                this.sendInfo(this.api.infoBTN,'true');
                this.info.open = true;
            }
            
        },
        doneClick: function (itemId,itemName) {
            let index = this.sites[0][3].indexOf(itemId);
            for(item of this.checkList){
                if(itemId == item[0]){
                    if(index < 0 && parseInt(item[3]) != 0){
                        this.sites[0][3].push(parseInt(itemId))
                        console.log('donePush');
                        this.sendStatistics('done',itemName);
                    }else if(parseInt(item[3]) != 0) {
                        this.sites[0][3].splice(index, 1);
                        this.sendStatistics('UnclickDone',itemName);
                    }else if(parseInt(item[3]) == 0) {
                        this.sendStatistics('TryToClickBlockedItem',itemName);
                    }
                }
            }
            this.progressBarUpdate();
            this.$forceUpdate();
            this.sendInfo(this.api.doneId,this.sites[0][3]);
            
            

        },
        sendInfo: function (param, value) {
            // `${this.api.saveDataHref}?domain=${window.location.hostname}&${param}=${value}`
//?            console.log(`${this.api.saveDataHref}?domain=${window.location.hostname}&${param}=${value}`);
            var app = `${this.api.saveDataHref}?domain=${window.location.hostname}&${param}=${value}`,
                xhr = new XMLHttpRequest();
            xhr.open('GET', app);
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status == 200) {
                    try {
                        var output = JSON.parse(xhr.response);
                    } catch (e) { }
                }
                console.log('data was send');
            }
            xhr.send()
        },
        sendStatistics: function(action='other',title='без названия'){
                console.log(`${this.api.statisticsHref}?domain=${window.location.hostname}&action=${action}&title=${title}`);
                var app = `${this.api.statisticsHref}?domain=${window.location.hostname}&action=${action}&title=${title}`,
                    xhr = new XMLHttpRequest();
                xhr.open('GET', app);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState !== 4) return;
                    if (xhr.status == 200) {
                        try {
                            var output = JSON.parse(xhr.response);
                        } catch (e) { }
                    }
                    console.log('stat was send');
                }
                xhr.send()
        },
        progressBarUpdate: function(){
            let done = this.sites[0][3],
                notParent = 0;
            for(let item of this.checkList){
                if(item[1] != 0){
                    notParent++;
                }
            };
            out = done.length / notParent * 100;
            this.progress = Math.round(out);
        }

    }
});

function update(data) {
    app.checkList = data.checkList;
    app.sites[0][1] = data.sites[0][1];
    app.sites[0][2] = data.sites[0][2];
    try {
        var sites3 = data.sites[0][3].split(',');
        app.sites[0][3] = [];
        for (item of sites3) {
            app.sites[0][3].push(parseInt(item));
        }
    } catch (e) { };
    try {
        var sites4 = data.sites[0][4].split(',');
        app.sites[0][4] = [];
        for (item of sites4) {
            app.sites[0][4].push(parseInt(item));
        }
    } catch (e) { };
    app.progressBarUpdate();
    //app.sites[0][4] = data.sites[0][4].split(',');
}

async function getData() {
    // `https://script.google.com/macros/s/AKfycbyI8LJsInMo9RjnFRodPzfT_0gUT-dxSne8fwwm5PWQQQE2Fqp87ifo4ZEei0lTxWTr6g/exec${'?domain='+window.location.hostname}`
    var app = `https://script.google.com/macros/s/AKfycbyI8LJsInMo9RjnFRodPzfT_0gUT-dxSne8fwwm5PWQQQE2Fqp87ifo4ZEei0lTxWTr6g/exec${'?domain='+window.location.hostname}`,
        output = {},
        xhr = new XMLHttpRequest();
    xhr.open('GET', app);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            try {
                var output = JSON.parse(xhr.response);
            } catch (e) { }
        }
        console.log('data was get');
        output;
        update(output);
    }
    xhr.send()
};

