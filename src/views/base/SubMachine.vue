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
"use strict";

Vue.use(VueAxios, axios)

export default {
  name: 'Tables',
  components: { CTableWrapper1, CTableWrapper2, CTableWrapper3, CTableWrapper4, CTableWrapper5, CTableWrapper6, CTableWrapper7, CTableWrapper8 },
  data:function () {
    return {
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
  async created(){
    var time = new Date().toDateString();
    this.currentTime = time
      var response = await Vue.axios.get('http://nyiot.nanyangtextile.com/nyiot/carding_feed/get_card_nyt_petch.php');
    var DataList = response.data;
    var TotalNum = 0
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
      if(DataList[i].PD_Line == "1"){   
        if(this.DataList1.length < 6){
          if(DataList[i].log_time.substring(11, 13) >= 0 && DataList[i].log_time.substring(11, 13) < 8){
            DataList[i].hour = (Number(DataList[i].log_time.substring(11, 13))+Number(16))*3600;
          }else{
            DataList[i].hour = (DataList[i].log_time.substring(11, 13)-8)*3600;
          }        
          DataList[i].min = DataList[i].log_time.substring(14, 16)*60;
          DataList[i].second = DataList[i].log_time.substring(17, 19)*1;
          DataList[i].totalSec = DataList[i].hour+DataList[i].min+DataList[i].second;
          DataList[i].realtime_target = new Intl.NumberFormat().format(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0));          
          DataList[i].Actual =(new Intl.NumberFormat().format((DataList[i].weight_gram/1000).toFixed(2))).toString();
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
          this.DataList1.push(DataList[i])
          this.DataList1.sort(function(a,b){
              return a.EFF - b.EFF;
            });
        }       
      }else if(DataList[i].PD_Line == "2"){        
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
      }else if(DataList[i].PD_Line == "3"){
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
      }else if(DataList[i].PD_Line == "4"){
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
      }else if(DataList[i].PD_Line == "5"){
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
      }else if(DataList[i].PD_Line == "6"){
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
      }else if(DataList[i].PD_Line == "7"){
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
      }else if(DataList[i].PD_Line == "8"){
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
  },
  mounted(){
     this.callFunction()
  },
  methods: {
    callFunction: function () {
        var v = this;
        setTimeout(function () {
            location.reload();
        }, 300000);
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
