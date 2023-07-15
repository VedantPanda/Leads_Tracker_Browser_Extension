let myLeads=[]
const inputEl=document.getElementById("input-el")
const btnEl=document.getElementById("btn-el")
const ulEl=document.getElementById("ul-el")
const delbtn=document.getElementById("del-btn")
const tabbtn=document.getElementById("tab-btn")
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

btnEl.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value=""
})

tabbtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

delbtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

function render(leads){
    let listItems=""
    for(let i=0;i<leads.length;i++){
        listItems+= `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `        
    }
    ulEl.innerHTML=listItems
}