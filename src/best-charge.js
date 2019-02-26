var items=require("./items");
var promotions_type=require("./promotions");
module.exports=function bestCharge(selectedItems) {
  let result="============= 订餐明细 ============="+'\n';
  let items1=items();    //获取菜单
  let promotion=promotions_type();   //促销信息
  let numbers=0;   //每种菜品的数量
  let selected_id=''; //选择的菜品IDn
  let sum=0;    //计算促销前的总价
  let after_sum=0;   //参与促销后的总价
  let total_money=0; //最终输出的价格
  let after_promotion=0; //促销后的单品价格
  for(var i=0;i<selectedItems.length;i++)
  {
    //获取输入的id号和数量
    selected_id=selectedItems[i].substring(0,8);
    numbers=selectedItems[i].substring(10,selectedItems[i].length).replace(/[^0-9]/ig,"");
    //获取items中的的菜名和价格
    let num=0;
    for(var j=0;j<items1.length;j++)
    {
      if(selected_id==items1[j].id) {
        num = j;
        break;
      }
    }
    //计算每种菜的花费并输出
    let money=parseFloat(items1[num].price)*numbers;
    result +=items1[num].name+" x "+numbers+" = "+money+"元"+'\n';
    //计算促销前的总价
    sum+=money;
   //查询当前菜品是否参与促销，参与促销的菜品半价，不参与促销的菜品原价销售
    after_promotion=parseFloat(items1[num].price);
    for(var m=0;m<promotion[1].items.length;m++){
      if(selected_id==promotion[1].items[m]){
        after_promotion=parseFloat(items1[num].price)/2;
        break;
      }
    }
    //计算促销后的菜品每种要花多少钱
    let money2=after_promotion*numbers;
    //计算参与促销后的总价
    after_sum+=money2;

  }
  result += "-----------------------------------"+'\n';
  total_money=sum;
  //计算节省的钱
  let save=sum-after_sum;
  if(save>6){
    total_money=after_sum;
    result += "使用优惠:"+'\n';
    result += "指定菜品半价(黄焖鸡，凉皮)，省"+save+"元"+'\n';
    result += "-----------------------------------"+'\n';

  }
  else if (sum>=30)
  {
    total_money=sum-6;
    result += "使用优惠:"+'\n';
    result += "满30减6元，省6元"+'\n';
    result += "-----------------------------------"+'\n';
  }

  result += "总计："+total_money+"元"+'\n';
  result += "==================================="+'\n';
  return result;
}
