<template>
  <div id="table">
    <h1>Carding Machine</h1>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardBody>           
            <CRow>
              <CCol sm="6">
                <label>Branch Office</label>
                <select id="getApi" name="getApi" class="form-control" @change="getApi()">
                  <option value="" disabled selected>Choose...</option>
                  <option  value="all">สาย 5</option>
                  <option  value="subsection">เพชรบุรี</option>
                </select>
              </CCol>
              <CCol sm="3">
                <label>Machine Status</label>
                <select class="form-control" id ="selected" name="selected" @change="selected()">
                  <option>Choose...</option>
                  <option  value="All">All</option>
                  <option  value="Focused">Focused</option>
                </select>
              </CCol>
              <CCol sm="3">
                <CInput
                  label="Date"
                  type="text"
                  :value =currentTime
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol lg="3">
                <CTableWrapper1
                  v-show="isData1"
                  :items="getline1Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper2
                  v-show="isData2"
                  :items="getline2Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper3
                  v-show="isData3"
                  :items="getline3Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper4
                  v-show="isData4"
                  :items="getline4Data()"
                  striped
                />
              </CCol>
            </CRow>
            <CRow>            
              <CCol lg="3">
                <CTableWrapper5
                  v-show="isData5"
                  :items="getline5Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper6
                  v-show="isData6"
                  :items="getline6Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper7
                  v-show="isData7"
                  :items="getline7Data()"
                  striped
                />
              </CCol>
              <CCol lg="3">
                <CTableWrapper8
                  v-show="isData8"
                  :items="getline8Data()"
                  striped
                />
              </CCol>
              <CCol lg="4">
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<style scoped>
#table{
  font-size: 14px!important;
}

</style>
<script>
import CTableWrapper1 from './table/Line1.vue'
import CTableWrapper2 from './table/Line2.vue'
import CTableWrapper3 from './table/Line3.vue'
import CTableWrapper4 from './table/Line4.vue'
import CTableWrapper5 from './table/Line5.vue'
import CTableWrapper6 from './table/Line6.vue'
import CTableWrapper7 from './table/Line7.vue'
import CTableWrapper8 from './table/Line8.vue'

import line1 from '../data/line1'
import line2 from '../data/line2'
import line3 from '../data/line3'
import line4 from '../data/line4'
import line5 from '../data/line5'
import line6 from '../data/line6'
import line7 from '../data/line7'
import line8 from '../data/line8'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { template } from '@babel/core'
import { localeData } from 'moment'
"use strict";

Vue.use(VueAxios, axios)

export default {
  name: 'Tables',
  components: { CTableWrapper1, CTableWrapper2, CTableWrapper3, CTableWrapper4, CTableWrapper5, CTableWrapper6, CTableWrapper7, CTableWrapper8 },
  data:function () {
    return {
      Effarr:localStorage.getItem('avg_1')==null?[]:JSON.parse(localStorage.getItem('avg_1')),
      brachStatus:"",
      isSel:"",
      isData1:false,
      isData2:false,
      isData3:false,
      isData4:false,
      isData5:false,
      isData6:false,
      isData7:false,
      isData8:false,
      storedAvg1:[],
      currentTime:"",
      DataList1:[],
      DataList2:[],
      DataList3:[],
      DataList4:[],
      DataList5:[],
      DataList6:[],
      DataList7:[],
      DataList8:[]
    }
  },
  created(){
    var time = new Date().toDateString();
    this.currentTime = time       
    this.appData()
    this.settime()
    // this.realtime()
  },
  methods: {
    settime(){
      setInterval(() => {
        this.appData()
      }, 5000)
    },
    async appData(){
      var response = await Vue.axios.get('http://nyiot.nanyangtextile.com/nyiot/carding_feed/get_card_nyt_sai5.php');
      var DataList = response.data;
      this.DataList1 = [];
      this.DataList2 = [];
      this.DataList3 = [];
      this.DataList4 = [];
      this.DataList5 = [];
      this.DataList6 = [];
      this.DataList7 = [];
      this.DataList8 = [];
      var tempList = [];
      // sort the data using foreach
      for (var i=0;i<DataList.length;i++) {          
        DataList[i]['_classes']="";
        DataList[i]['EFF']="";
        DataList[i]['Actual']="";
        DataList[i]['hour']="";
        DataList[i]['min']="";
        DataList[i]['second']="";
        DataList[i]['totalSec']="";
        DataList[i]['realtime_target']="";
        DataList[i]['NP']="Y";

        if (DataList[i].PD_Line == "1") {
          if (this.DataList1.length < 6) {
            if (DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8) {
              DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
            } else {
              DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
            }      
            DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
            DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
            DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
            DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
            DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
            DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0);
            tempList.push(DataList[i].EFF);       
            if (localStorage.getItem('hour_avg_1')==null) {
              if (DataList[i].EFF >= 90) {
                DataList[i].NP = "Y"
                DataList[i]._classes = "bg-success"           
              } else if (DataList[i].EFF >= 70 && DataList[i].EFF < 90) {
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-warning"
              } else if (DataList[i].EFF < 70) {
                  DataList[i].NP = "N"
                  DataList[i]._classes = "bg-danger"
              }
              if(localStorage.getItem('avg_1')!=null){
                var localData=JSON.parse(localStorage.getItem('avg_1'));
                var localDataLength=localData.length;
                // console.log('this is the length:' + localDataLength.toString());
                // console.log(localData)
                if(localDataLength>=12){
                  var a1 = 0 
                  var a2 = 0 
                  var a3 = 0 
                  var a4 = 0 
                  var a5 = 0 
                  var a6 = 0             
                  for (var j = 0;j<12;j++){
                    a1 = a1 + Number(localData[j][0])
                    a2 = a2 + Number(localData[j][1])
                    a3 = a3 + Number(localData[j][2])
                    a4 = a4 + Number(localData[j][3])
                    a5 = a5 + Number(localData[j][4])
                    a6 = a6 + Number(localData[j][5])
                  } 
                    // this.storedAvg1 = []         
                  var avgArr = [a1,a2,a3,a4,a5,a6]
                  localStorage.setItem('hour_avg_1', avgArr)
                  console.log("=========avg==============");
                  console.log(avgArr)
                  for(var k=0;k<avgArr.length;k++){
                    if(avgArr[k]/12 >= 90){
                      DataList[i].NP = "Y"
                      DataList[i]._classes = "bg-success" 
                    }else if(avgArr[k]/12 >= 70 && avgArr[i]/12 < 90){
                      DataList[i].NP = "N"
                      DataList[i]._classes = "bg-warning"
                    }else if(avgArr[k]/12 < 70){
                      DataList[i].NP = "N"
                      DataList[i]._classes = "bg-danger"
                    }
                  }       
                }
              }
            }
            else{
              console.log("==============test=====================");
              console.log(localStorage.getItem('hour_avg_1'));
              var hour_avg=localStorage.getItem('hour_avg_1');
              var splite_number=hour_avg.split(",");
              console.log(i);
              var k;
              if(i==9){
                k=0
              }else if(i==10){
                k=1
              }else if(i==11){
                k=2
              }else if(i==12){
                k=3
              }else if(i==13){
                k=4
              }else if(i==14){
                k=5
              }
              console.log("=======resule");
              console.log(k);
              console.log(splite_number[k])
              if(parseInt(splite_number[k])/12 >= 90){
                DataList[i].NP = "Y"
                DataList[i]._classes = "bg-success" 
              }else if(parseInt(splite_number[k])/12 >= 70 && parseInt(splite_number[k])/12 < 90){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-warning"
              }else if(parseInt(splite_number[k])/12 < 70){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-danger"
              }
              if(localStorage.getItem('avg_1')!=null){
                var localData=JSON.parse(localStorage.getItem('avg_1'));
                var localDataLength=localData.length;
                console.log('this is the length:' + localDataLength.toString());
                console.log(localData)
                if(localDataLength>12){
                  var a1 = 0 
                  var a2 = 0 
                  var a3 = 0 
                  var a4 = 0 
                  var a5 = 0 
                  var a6 = 0             
                  for (var j = 0;j<12;j++){
                    a1 = a1 + Number(localData[j][0])
                    a2 = a2 + Number(localData[j][1])
                    a3 = a3 + Number(localData[j][2])
                    a4 = a4 + Number(localData[j][3])
                    a5 = a5 + Number(localData[j][4])
                    a6 = a6 + Number(localData[j][5])
                  } 
                  // this.storedAvg1 = []         
                  var avgArr = [a1,a2,a3,a4,a5,a6]
                  localStorage.setItem('hour_avg_1', avgArr)
                  console.log("=========avg==============");
                  console.log(avgArr)
                  for(var k=0;k<avgArr.length;k++){
                    if(avgArr[k]/12 >= 90){
                      DataList[i].NP = "Y"
                      DataList[i]._classes = "bg-success" 
                    }else if(avgArr[k]/12 >= 70 && avgArr[i]/12 < 90){
                      DataList[i].NP = "N"
                      DataList[i]._classes = "bg-warning"
                    }else if(avgArr[k]/12 < 70){
                      DataList[i].NP = "N"
                      DataList[i]._classes = "bg-danger"
                    }
                  }
                }
              }
            }
            this.DataList1.push(DataList[i])
            this.DataList1.sort(function(a,b){
              return a.EFF - b.EFF;
            });
          }
          // console.log(this.DataList1)    
        } 
        else if(DataList[i].PD_Line == "2"){        
          if(this.DataList2.length < 6){
            if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
              DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
            }else{
              DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
            }        
            DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
            DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
            DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
            DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));            
            DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
            DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)       
            if(DataList[i].EFF >= 90){
              DataList[i].NP = "Y"
              DataList[i]._classes = "bg-success"           
            }else if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
              DataList[i].NP = "N"
              DataList[i]._classes = "bg-warning"
            }else if(DataList[i].EFF < 70){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-danger"
            }
            this.DataList2.push(DataList[i])
            this.DataList2.sort(function(a,b){
                return a.EFF - b.EFF;
              });    
          }               
        } 
        else if(DataList[i].PD_Line == "3"){
          if(this.DataList3.length < 6){
            if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
              DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
            }else{
              DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
            }
            DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
            DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
            DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
            DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
            DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
            DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)        
            if(DataList[i].EFF >= 90){
              DataList[i].NP = "Y"
              DataList[i]._classes = "bg-success"           
            }else if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
              DataList[i].NP = "N"
              DataList[i]._classes = "bg-warning"
            }else if(DataList[i].EFF < 70){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-danger"
            }
            this.DataList3.push(DataList[i])
            this.DataList3.sort(function(a,b){
                return a.EFF - b.EFF;
              });                     
          }  
        } 
        else if(DataList[i].PD_Line == "4"){
          if(this.DataList4.length < 6){          
            if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
              DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
            }else{
              DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
            }
            DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
            DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
            DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
            DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
          DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
            DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)
            if(DataList[i].EFF >= 90){
              DataList[i].NP = "Y"
              DataList[i]._classes = "bg-success"           
            }else if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
              DataList[i].NP = "N"
              DataList[i]._classes = "bg-warning"
            }else if(DataList[i].EFF < 70){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-danger"
            } 
            this.DataList4.push(DataList[i])
            this.DataList4.sort(function(a,b){
                return a.EFF - b.EFF;
              });      
          }   
        }
        else if(DataList[i].PD_Line == "5"){
          if(this.DataList5.length < 6){          
            if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
              DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
            }else{
              DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
            }
            DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
            DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
            DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
            DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
            DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
            DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)   
            if(DataList[i].EFF >= 90){
              DataList[i].NP = "Y"
              DataList[i]._classes = "bg-success"           
            }else if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
              DataList[i].NP = "N"
              DataList[i]._classes = "bg-warning"
            }else if(DataList[i].EFF < 70){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-danger"
            }
            this.DataList5.push(DataList[i]) 
            this.DataList5.sort(function(a,b){
                return a.EFF - b.EFF;
              });      
          }   
        }
        else if(DataList[i].PD_Line == "6"){
          if(this.DataList6.length < 6){          
            if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
              DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
            }else{
              DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
            }
            DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
            DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
            DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
            DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
            DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
            DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)         
            if(DataList[i].EFF >= 90){
              DataList[i].NP = "Y"
              DataList[i]._classes = "bg-success"           
            }else if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
              DataList[i].NP = "N"
              DataList[i]._classes = "bg-warning"
            }else if(DataList[i].EFF < 70){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-danger"
            } 
            this.DataList6.push(DataList[i])
            this.DataList6.sort(function(a,b){
                return a.EFF - b.EFF;
              });     
          }   
        }
        else if(DataList[i].PD_Line == "7"){
          if(this.DataList7.length < 6){          
            if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
              DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
            }else{
              DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
            }
            DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
            DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
            DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;          
            DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
            DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
            DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)       
            if(DataList[i].EFF >= 90){
              DataList[i].NP = "Y"
              DataList[i]._classes = "bg-success"           
            }else if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
              DataList[i].NP = "N"
              DataList[i]._classes = "bg-warning"
            }else if(DataList[i].EFF < 70){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-danger"
            } 
            this.DataList7.push(DataList[i])
            this.DataList7.sort(function(a,b){
                return a.EFF - b.EFF;
              });     
          }   
        }
        else if(DataList[i].PD_Line == "8"){
          if(this.DataList8.length < 6){          
            if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
              DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
            }else{
              DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
            }
            DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
            DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
            DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
            DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
            DataList[i].Actual =((DataList[i].weight_gram/1000).toFixed(2)).toString();
            DataList[i].EFF = ((DataList[i].weight_gram/10)/((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000))).toFixed(0)  
            if(DataList[i].EFF >= 90){
              DataList[i].NP = "Y"
              DataList[i]._classes = "bg-success"           
            }else if(DataList[i].EFF >= 70 && DataList[i].EFF < 90){
              DataList[i].NP = "N"
              DataList[i]._classes = "bg-warning"
            }else if(DataList[i].EFF < 70){
                DataList[i].NP = "N"
                DataList[i]._classes = "bg-danger"
            }
            this.DataList8.push(DataList[i])
            this.DataList8.sort(function(a,b){
                return a.EFF - b.EFF;
              });      
          }   
        }   
      }
      this.Effarr.push(tempList);
      if(this.Effarr.length >12){
        this.Effarr = []; 
      }
      localStorage.setItem("avg_1", JSON.stringify(this.Effarr)); //store colors
    },
    selected(){
      var sel = document.getElementById('selected');
      var opt;
        for ( var i = 0, len = sel.options.length; i < len; i++ ) {
            opt = sel.options[i];
            if ( opt.selected === true ) {
                break;
            }
        }
        if(opt.value == "All"){
            this.isSel = opt.value          
        }else if(opt.value == "Choose..."){
            this.isSel = "All"
        }else if(opt.value == "Focused"){
            this.isSel = opt.value
            this.$router.push("/focused")
        }
    },
    getApi(){
      var e = document.getElementById("getApi");
      this.brachStatus = e.options[e.selectedIndex].value;
      if(this.brachStatus == "subsection"){
        this.$router.push("/submachine")
      }else if(this.brachStatus == "all"){
        this.$router.push("/machine")
      }
    },
    shuffleArray (array) {
      return array
    },  
    getline1Data () {
      if(this.DataList1.length){
        this.isData1 = true
      }
      return this.shuffleArray(this.DataList1.slice(0))

    },
    getline2Data () {
      if(this.DataList2.length){
        this.isData2 = true
      }
      return this.shuffleArray(this.DataList2.slice(0))
    },
    getline3Data () {
      if(this.DataList3.length){
        this.isData3 = true
      }
      return this.shuffleArray(this.DataList3.slice(0))
    },
    getline4Data () {
      if(this.DataList4.length){
        this.isData4 = true
      }
      return this.shuffleArray(this.DataList4.slice(0))
    },
    getline5Data () {
      if(this.DataList5.length){
        this.isData5 = true
      }
      return this.shuffleArray(this.DataList5.slice(0))
    },
    getline6Data () {
      if(this.DataList6.length){
        this.isData6 = true
      }
      return this.shuffleArray(this.DataList6.slice(0))
    },
    getline7Data () {
      if(this.DataList7.length){
        this.isData7 = true
      }
      return this.shuffleArray(this.DataList7.slice(0))
    },
    getline8Data () {
      if(this.DataList8.length){
        this.isData8 = true
      }
      return this.shuffleArray(this.DataList8.slice(0))
    }
  }
}
</script>
