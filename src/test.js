"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);
var items=require("./items");
var promotions_type=require("./promotions");
let selectedItems = ["ITEM0013 x 4"];
  console.log("==============订餐明细=============");
  let items1=items();
  let promotion=promotions_type();
  let numbers=0;
  let selected_id='';
  let sum=0;
  let total_money=0;
  for(var i=0;i<selectedItems.length;i++)
  {
    selected_id=selectedItems[i].substring(0,8);
    numbers=selectedItems[i].substring(10,selectedItems[i].length).replace(/[^0-9]/ig,"");
    let num=0;
    for(var j=0;j<items1.length;j++)
    {
      if(selected_id==items1[j].id) {
        num = j;
        break;
      }
    }
    let money=parseFloat(items1[num].price)*numbers;
    sum+=money;
    console.log(items1[num].name+" x "+numbers+" = "+money+"元");

  }
  //计算打折
  console.log("-----------------------------------");
    if(sum>=30)
      total_money=sum-6;
  let after_sum=0;
  for(var i=0;i<selectedItems.length;i++)
  {
    selected_id=selectedItems[i].substring(0,8);
    numbers=selectedItems[i].substring(10,selectedItems[i].length).replace(/[^0-9]/ig,"");
    let num=0;
    let after_promotion=[];
    for(var j=0;j<items1.length;j++)
    {
      if(selected_id==items1[j].id)
      {
        num=j;
        break;
      }
    }
    after_promotion=parseFloat(items1[num].price);
    for(var m=0;m<promotion[1].items.length;m++){
      if(selected_id==promotion[1].items[m]){
        after_promotion=parseFloat(items1[num].price)/2;
        break;
      }
    }
    let money=after_promotion*numbers;
    after_sum+=money;
  }
  let save=sum-after_sum;
  total_money=after_sum;
  if(save>6){
    console.log("使用优惠");
    console.log("指定菜品半价(黄焖鸡，凉皮), 省"+save+"元");
    console.log("-----------------------------------");
  }
  else if (sum>=30)
  {
    console.log("使用优惠");
    console.log("满30减6元，省6元");
    console.log("-----------------------------------");
  }
  console.log("总计："+total_money+"元");
console.log("===================================");




  //判断是否可以参加促销活动




