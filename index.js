let availableSLA=[]

// payload is title &  breachTime
const creatSLA= (payload) =>{
    const timeStamp= Date.now()
    availableSLA.push({...payload, timeStamp})
}

console.log('availableSLA: ', availableSLA)


const payloadArray= [
{
    title: 'FH Approval',
    breachTime: new Date('2026-02-20T12:20:30')
},
{
    title: 'CWC Approval',
    breachTime: new Date('2026-02-18T12:20:30')
},{
    title: 'FH 1 Approval',
    breachTime: new Date('2026-01-20T12:20:30')
},{
    title: 'FH 2 Approval',
    breachTime: new Date('2026-01-20T12:20:30')
},
]

for(i of payloadArray){
    console.log(i, 'iiii')
    creatSLA(i)
}

setInterval(()=>{
    for (task of availableSLA){
        const timeStampTask= i.breachTime.getTime()
        if(timeStampTask<= Date.now()) console.log(task.title, ' Breached')
    }
console.log('execution started')
}, 2000)


console.log(availableSLA, '---->>availableSLA')