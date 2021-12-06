import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'
const vnode = h('h1',{},[
  h('div',{key: 1},'1'),
  h('div',{key: 2},'2'),
  h('div',{key: 3},'3')
])
const oldVnode = document.querySelector('#app')
patch(oldVnode,vnode)

const vnode2 = h('h1',{},[
  h('div',{key: 3},'3'),
  h('div',{key: 'B'},'B'),
  h('div',{key: 'A'},'A'),
  h('div',{key: 4},'4')
])

setTimeout(()=>{
  patch(vnode,vnode2)
},2000)