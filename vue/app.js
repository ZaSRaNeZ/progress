var app = new Vue({
    el: '#app',
    data: {
        open: false,
        info:{
            open:false,
            text:'об`яснение по пункту',
            comment: false,
            commentText:'Сейчас этой задачей занимается ваш менеджер. Он свяжется с вами по окончанию)',
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
                [1],
                []
            ]
        ],
        domain: "satan666",
    },
    computed : { 
        progress: function(){
            //let done = this.sites[0][3].split(','),
            let done = this.sites[0][3];
            out = done.length / this.checkList.length * 100;
            return Math.round(out);
        }
    },
    beforeCreate(){
        getData();
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
            let inProgress = this.sites[0][4];
            try{
            for(item of inProgress){
                if (parseInt(item) == parseInt(itemId)){
                    return true;
                }
            }
            }catch(e){}
        },
        openClose: function(){
            if (this.open) this.open = false;
            else if (!this.open) this.open = true;
        },
        blockCheck: function(itemId){
            for(i of this.checkList){
                if (parseInt(i[0]) == parseInt(itemId)){
                    if(parseInt(i[3]) == 0){
                        return true
                    }
                }
            }
            return false;
        },
        openCloseInfo: function(itemId = -1, text){
            if(this.info.text != text){
                if(text == '' || text == undefined){
                    this.info.text = 'Свяжитесь с вашим менеджером для уточнений и мы все расскажем по этому пункту =)';
                }
                else{
                    this.info.text = text;
                }
            }
            if(itemId >= 0){
//!----- Проверка статуса "В работе"
            if (this.inProgressCheck(itemId)){
                this.info.comment = true;
            }
            else{this.info.comment = false;}
//!----- ПРоверка на блок отметки
            
            if(this.blockCheck(itemId)){
                this.info.block = true;
            }
            else{
                this.info.block = false;
            }
        }
//------ открыват / закрывает 
            if (this.info.open) this.info.open = false;
            else if (!this.info.open) this.info.open = true;
        },
        doneClick: function(itemId){
            console.log(itemId)
            let index = this.sites[0][3].indexOf(itemId);
            console.log(index)
            if( index < 0 && parseInt(this.checkList[itemId-1][3]) != 0) {
                this.sites[0][3].push(parseInt(itemId))
                console.log('donePush');
            }
            else{
                if(parseInt(this.checkList[itemId-1][3]) != 0) {
                    this.sites[0][3].splice(index,1);
                }
            } 
            this.$forceUpdate();
            
        }
    }
})

function update(data) {
    app.checkList = data.checkList;
    app.sites[0][1] = data.sites[0][1];
    app.sites[0][2] = data.sites[0][2];
    try{
    var sites3 = data.sites[0][3].split(',');
    app.sites[0][3] = [];
    for(item of sites3){
        app.sites[0][3].push(parseInt(item));
    }
    }catch (e){};
    try{
        var sites4 = data.sites[0][4].split(',');
        app.sites[0][4] = [];
        for(item of sites4){
            app.sites[0][4].push(parseInt(item));
        }
    }catch(e){};

    //app.sites[0][4] = data.sites[0][4].split(',');
}

async function getData() {
    // `https://script.google.com/macros/s/AKfycbwI6gydsZDQXi1bMd28kZ0psylx-d93xvOlFispUT_eRvqX7QZLdJCn/exec${'?domain='+window.location.hostname}`
    var app = `https://script.google.com/macros/s/AKfycbwI6gydsZDQXi1bMd28kZ0psylx-d93xvOlFispUT_eRvqX7QZLdJCn/exec?domain=satan666`,
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
        output;
        update(output);
    }
    xhr.send()
};

