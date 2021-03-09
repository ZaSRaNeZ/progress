window.onload = ( async ()=>{

var settings = {},
	data = {},
	nodes = {
		methods:{
				closeClick: function(){
					document.querySelector('#checkListPage').classList.remove("open");
				},
				checklistClick: function(){
					document.querySelector('#checkListPage').classList.add("open");
				}
		}
	};

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




const nodeIn = (parentNodeSelector,node) =>{
	// Под выбор идет только 1 селектор
	for(let key in node.nodeInner){
		document.querySelector(parentNodeSelector).innerHTML += node.nodeInner[key];
	}
}

const nesting = (parent) =>{
	let out = '';
	first = true;
	for(let i=0; data.checkList.length > i; i++ ){
		if(parseInt(data.checkList[i][1]) == parseInt(parent)){
			out += `${first ? '<ul>' : ''}<li ${doneCheck(data.checkList[i][0])}>${data.checkList[i][2]}</li>`;
			out += nesting(data.checkList[i][0]);
			first = false;
		}
	}
	if(first) return out
		else{
			out+='</ul>'
			return out;
		}
}

const doneCheck = (id) =>{

	let done = data.sites[0][3].split(',');
		for(let j = 0; done.length > j; j++){
		if (parseInt(done[j]) == parseInt(id)){
	console.log(done , id);
			return `class='done'`;
		}
	}
	return '';
}


const chekListRender = () => {
	let out ='<ul>';
	for(let i=0; data.checkList.length > i; i++ ){
		if(parseInt(data.checkList[i][1]) == 0){
		 out +=`<li ${doneCheck(data.checkList[i][0])}>`;
			out += data.checkList[i][2];
			out += nesting(data.checkList[i][0]);
			out += '</li>'
		}
	}
	out +='</ul>'
	console.log(out);
		return out;
};

const update = () =>{
	nodes.progressBar = {
			nodeInner:{
				html :`	
					<div class='project' id='projectStatus'>
					   <div class='project_progress j_project-progress'></div>
					   <div class='project_text'>
					   	<span>Настройка проекта закончена на  
					    	<span class='project_text-count'>${data.sites[0][3].split(',').length}/${data.checkList.length} примерно ${Math.round(data.sites[0][3].split(',').length / data.checkList.length * 100)}%<span>
					    </span>
					    <button id="progressbarBTN" class='project_button'>Чеклист</button>
					   </div>
					</div>`,
				styles :`
					<style>
					#projectStatus{
    					width: calc(100% + 32px);
    					height: 30px;
    					background: #b1cbff;
    					margin-left: -16px;
    					position: relative;
    				}
    				#projectStatus .project_progress {
					    height: 100%;
					    background: #3c7af3;
					    width: ${data.sites[0][3].split(',').length / data.checkList.length * 100}%;
					}
					#projectStatus .project_text {
					    width: 100%;
					    height: 100%;
					    text-align: center;
					    color: #fff;
					    z-index: 9999;
					    position: absolute;
					    line-height: 30px;
					    top: 0;
					}
					#projectStatus .project_button {
					    background: #2f68bad6;
					    color: #fff;
					    outline: none;
					    border: none;
					    padding: 2px 4px 4px 4px;
					    cursor: pointer;
					    border-radius: 4px;
					}
    				</style>
				`				
			}
		};
	nodes.checkListPage = {
			nodeInner:{
				html :`	
					<div class='check-list-page' id='checkListPage'>
					   <div class="check-list-page_container">
					 		<div class="check-list-page_close" id="checklistPageClose"></div>
					      <div class="check-list-page_title h1">Этапы создания интернет-магазина</div>
					      <div class="check-list-page_sale-comment">
					         <div class="check-list-page_sale-title h2">Уточнения по роекту озвученные вашему менеджеру</div>
					         <div class="check-list-page_sale-text">
					         ${data.sites[0][2]}
					         </div>
					      </div>
					      <div class="check-list-page_checklist">
					      <div class="check-list-page_checklist-title h2">Чеклист</div>
					         <div class="check-list-page_checklist-content">
					            ${chekListRender()}
					         </div>
					      </div>
					   </div>
					</div>
					`,
				styles :`
					<style>
					#checkListPage {
					    width: 100%;
					    height: calc(100% - 70px);
					    position: absolute;
					    z-index: 99999;
					    background: #fff;
					    bottom: 0;
					    transition: 0.4s all;
					    overflow: scroll;
					    
					}
					#checkListPage.check-list-page{
						left:-100vw;
					}
					#checkListPage.check-list-page.open{
						left:0;
					}
					#checkListPage .check-list-page_container {
					    padding: 30px;
					}
					#checkListPage .h1{
				    	font-size: 22px;
					    font-weight: bold;
					}
					#checkListPage .check-list-page_title {
					    padding: 0 20px 20px 0;
					}
					#checkListPage .h2{
						font-size: 18px;
					    font-weight: 700;
					}
					#checkListPage .check-list-page_sale-title {
					    padding: 20px 0;
					}
					#checkListPage .check-list-page_sale-text {
					    padding: 20px 20px;
					    border: 1px solid #3c7af3;
					    border-radius: 4px;
					}
					#checkListPage .check-list-page_checklist {
					    padding: 20px;
					}
					#checkListPage .check-list-page_checklist-title {
					    padding: 20px 0;
					}
					#checkListPage ul ul {
					    padding: 10px 16px;
					}
					#checkListPage ul {
					    list-style: none;
					}
					#checkListPage li {
					    position: relative;
					    font-size: 14px;
					    list-style: none;
					}
					#checkListPage li.done::before {
					    content: '';
					    width: 5px;
					    height: 8px;
					    display: block;
					    position: absolute;
					    border-bottom: 1px solid #12d051;
					    border-right: 1px solid #12d051;
					    transform: rotate(45deg);
					    left: -16px;
					}
					#checkListPage .check-list-page_close {
					  position: absolute;
					  right: 32px;
					  top: 32px;
					  width: 32px;
					  height: 32px;
					  opacity: 0.3;
					  cursor: pointer;
					}
					#checkListPage .check-list-page_close:hover {
					  opacity: 1;
					}
					#checkListPage .check-list-page_close:before, #checkListPage .check-list-page_close:after {
					  position: absolute;
					  left: 15px;
					  content: ' ';
					  height: 33px;
					  width: 2px;
					  background-color: #3c7af3;
					}
					#checkListPage .check-list-page_close:before {
					  transform: rotate(45deg);
					}
					#checkListPage .check-list-page_close:after {
					  transform: rotate(-45deg);
					}

    				</style>
				`}
	};

	nodeIn('.top.padder',nodes.progressBar);
	nodeIn('body',nodes.checkListPage);

	document.querySelector('#checklistPageClose').onclick = nodes.methods.closeClick;
	document.querySelector('#progressbarBTN').onclick = nodes.methods.checklistClick;

}

await getData();



});

