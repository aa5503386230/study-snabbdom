export default function createElement(vnode) {
  let domNode = document.createElement(vnode.sel)//创建一个空节点
  if(vnode.text !== '' && (vnode.children == undefined || vnode.children.length ==0)){
    //是文字
    domNode.innerText = vnode.text
  }else if(Array.isArray(vnode.children) && vnode.children.length > 0) {
    //内部子节点，递归调用，遇到文本不递归
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i]
      let chDom = createElement(ch)
      domNode.appendChild(chDom)
    }
  }
  //补充elm属性
  vnode.elm = domNode
  //返回elm， elm是一个纯DOM对象
  return vnode.elm
}