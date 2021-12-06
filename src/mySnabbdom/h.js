import vnode from './vnode'

export default function(sel, data, c) {
  if(arguments.length !== 3) {
    throw new Error('参数必须为3')
  }
  //检查参数c的类型
  if(typeof c == 'string' || typeof c == 'number') {
    return vnode(sel,data,undefined,c,undefined)
  }else if(Array.isArray(c)) {
    //嵌套h函数
    let children = []
    for(let i = 0 ; i< c.length; i++) {
      if(!typeof c[i] == "object" && c[i].hasOwnProperty('sel')) {
        throw new Error('传入的数组参数中有项不是h函数')
      }
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined,undefined)
  }else if(typeof c == "object" && c.hasOwnProperty('sel')) {
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  }else {
    throw new Error('传入的第三个参数类型不对')
  }
}