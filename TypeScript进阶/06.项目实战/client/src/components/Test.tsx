import React from "react";
// 处理属性默认值
interface MyProps {
  a:string
  b:string
}
 class Test extends React.Component<MyProps> {
  // 所有属性均有默认值
  // static defaultProps:MyProps = {
  //   a:'123',
  //   b:'456'
  // }

  /**
   * 只需要给 a 属性赋默认值 
   * 计算过程：使用 接口 MyProps 的类型 减去 约束的类型 a 得到必须要赋值的类型 b
   */
  // static defaultProps:{a:string} = {
  //   a:'123'
  // }

  /**
   * 使用类型演算
   */
  static defaultProps:Pick<MyProps,'a'> = {
    a:'123'
  }
}

class User extends React.Component {
  render(): React.ReactNode {
    return (
      <Test  b='456' />
    )
  }
}

export default {}