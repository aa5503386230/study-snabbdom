import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'
const vnode = h('h1',{},[
  h('ul',{key: 1},[
    h('li',{key: 'C'},'C'),
    h('li',{key: 'D'},'D')
  ]),
  h('div',{key: 2},'2'),
  h('div',{key: 3},'3')
])
const oldVnode = document.querySelector('#app')
patch(oldVnode,vnode)
const vnode1 = h('h1',{},[
  h('div',{key: 3},'3'),
  h('div',{key: 'B'},'B'),
  h('div',{key: 'A'},'A'),
  h('div',{key: 4},'4')
])
setTimeout(()=>{
  patch(vnode,vnode1)
},2000)
console.log(vnode1)
// const vnode2 = h('h1',{},[
//   h('div',{key: 3},'3'),
//   h('div',{key: 'B'},'B'),
//   h('div',{key: 'C'},'C'),
//   h('div',{key: 'A'},'A'),
//   h('div',{key: 4},'4')
// ])
// setTimeout(()=>{
//   patch(vnode1,vnode2)
// },3000)