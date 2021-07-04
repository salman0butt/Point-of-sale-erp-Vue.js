<template>
  <div id="linedetail1">
    <h1>Carding Machine-Line Detail</h1>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="3">
                <CInput
                label="Line No."
                type="text"
                placeholder=""  
                value="6"            
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Description"
                type="text"
                placeholder=""
                :value="description"             
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Target Total"
                type="text"
                placeholder=""
                :value="TotalTarget"
                />
              </CCol>
              <CCol sm="3">
                <CInput
                label="Actual Total"
                type="text"
                placeholder=""
                :value="actualTotal"                        
                />
              </CCol>
            </CRow>       
            <CRow>
              <CCol sm="6">
                <CInput
                label="Effective Capacity"
                type="text"
                placeholder=""
                :value="90"  
                />
              </CCol>
              <CCol sm="3">
                <label>Machine Status</label>
                <select class="form-control">
                  <option>Choose...</option>
                  <option value="Open">Open</option>
                  <option style="background-color:#fca903;color:white" value="Pending">Pending</option>
                  <option style="background-color:#3474eb;color:white" value="Progress">In Progress</option>
                  <option style="background-color:green;color:white" value="Completed">Completed</option>
                  <option style="background-color:red;color:white" value="Cancelled">Cancelled</option>
                </select>
              </CCol>
              <CCol sm="3">
                <CInput
                  label="Date"
                  type="text"
                  :value = currentTime              
                />
              </CCol>
            </CRow>
            <div style="display:block">
              AVG EFF % :<input :value=effective style="height:20px;border:none" />
            </div>
            <CRow>
              <CCol sm="12">
                <CProgress
                  :color="progress_color"             
                  class="mb-2"
                  v-model="effective"
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
              <CCol lg="12">
                <CTableWrapper
                  :items="getShuffledUsersData()"               
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<style scoped>
#linedetail1{
  font-size: 16px;
}
</style>
<script>
import CTableWrapper from '../table/Linedetail1.vue'
import line from '../../data/line1'
import { stringTypeAnnotation } from '@babel/types'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
"use strict";

Vue.use(VueAxios, axios)
export default {
  name: 'Tables',
  components: { CTableWrapper },
  data:function() {
    return {
      effective:0,
      description:"",
      currentTime:"",
      TotalTarget:"",
      actualTotal:"",
      progress:0,
      progress_color:'',
      selected: [], // Must be an array reference!      
      SelectStatus: [
        'Open', 'Pending', 'In Process', 'Completed', 'Cancelled'
      ],
       DataList6:[],
    }
  },
  async created(){
    var time = new Date().toDateString();
    this.currentTime = time
    var response = await Vue.axios.get('http://nyiot.nanyangtextile.com/nyiot/carding_feed/get_card_nyt_sai5.php');
    var DataList = response.data;
    var getTarget = 0
    var getActual = 0
    var getdescription = ""
    var geteffective = 0
    for (var i=0;i<DataList.length;i++) {
          DataList[i]['_classes']="";
          DataList[i]['EFF']="";
          DataList[i]['Actual']="";
          DataList[i]['hour']="";
          DataList[i]['min']="";
          DataList[i]['second']="";
          DataList[i]['totalSec']="";
          DataList[i]['realtime_target']="";
          DataList[i]['NP']="Y"
      if(DataList[i].PD_Line == "6"){   
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
          getActual = getActual + Number((DataList[i].weight_gram/1000).toFixed(2))
          getTarget =getTarget + Number(((DataList[i].target_weight*DataList[i].gram_cm*90*DataList[i].totalSec)/(60*1000)).toFixed(0)); 
          getdescription = DataList[i].yarn_type
          geteffective = geteffective + Number(DataList[i].EFF)       
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
    }
    this.TotalTarget = getTarget.toFixed(2)
    this.actualTotal = getActual.toFixed(2)
    this.description = getdescription
    this.effective = Number((geteffective/this.DataList6.length).toFixed(2))
    if(this.effective > 90){
      this.progress_color = "success"
    }else if(this.effective > 70 && this.effective <= 90){
      this.progress_color = "warning"
    }else if(this.effective <= 70){
      this.progress_color = "danger"
    }
  },
  methods: {
    shuffleArray (array) {
      return array
    },
    getShuffledUsersData () {
      return this.shuffleArray(this.DataList6.slice(0))
    }
  }
}
</script>
