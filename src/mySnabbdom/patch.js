import createElement from "./createElement";
import vnode from "./vnode";
import updateChildren from "./updateChildren";
export default function(oldVnode, newVnode) {
  //判断传入的第一个参数，是DOM节点还是虚拟节点
  if(oldVnode.sel == '' || oldVnode.sel == undefined) {
    //传入的第一个参数是DOM节点，此时要包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [],undefined,oldVnode)
  }
  //判断oldVnode和newVnode是不是同一个节点
  if(oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    //判断是不是同一个对象
    if(oldVnode == newVnode) return
    //判断新vnode有没有text属性
    if(newVnode.text !== undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
      //新vnode只有text属性
      if(newVnode.text != oldVnode.text) {
        //新虚拟节点和老虚拟节点的text不同直接替换掉
        oldVnode.elm.innerText = newVnode.text
      }
    }else {
      //新vnode没有text属性，表示有children属性，挂有子节点
      if(oldVnode.children !== undefined && oldVnode.children.length > 0) {
        //老的有children,复杂情况
        updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
      }else {
        //老的没有children，新的有children
        //清空老的节点内容
        oldVnode.elm.innerHTML = ''
        //遍历新的vbode的子节点，创建dom上树
        for(let i = 0; i < newVnode.children.length; i++) {
          let dom = createElement(newVnode.children[i])
          oldVnode.elm.appendChild(dom)
        }
      }
    }
  }else {
    let newVnodeElm = createElement(newVnode)
    //插入到老节点之前
    if(oldVnode.elm.parentNode !== undefined && newVnodeElm){
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}