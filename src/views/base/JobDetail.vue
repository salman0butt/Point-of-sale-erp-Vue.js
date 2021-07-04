<template>
  <div>
    <h1>Carding Machine - Job Problem Detail</h1>
    <CRow>
      <CCol lg="12">
        <CCard>
          <i class="cid-chevron-square-down"></i>
          <p @click="collapse = !collapse"  style="margin:2%">More Info</p>
          <CCardBody>
            <CRow>
              <CCol sm="3">
                <CInput
                label="Job No."
                type="text"
                placeholder=""
                v-model = job.No      
                />                
              </CCol>    
              
                <CCol sm="3">
                  <CCollapse :show="collapse">
                    <CInput
                    label="Job Date"
                    type="datetime"
                    placeholder=""
                    v-model = job.Date            
                    />
                  </CCollapse>
                </CCol>
                <CCol sm="6">
                  <CCollapse :show="collapse">
                    <CInput
                    label="Machine"
                    type="text"
                    placeholder=""
                    v-model = job.Machine      
                    />
                  </CCollapse>
                </CCol>                 
            </CRow>
            <CRow>              
                <CCol sm="3">  
                  <CCollapse :show="collapse">
                    <CInput
                    label="Starting Date"
                    type="datetime"
                    placeholder=""
                    v-model = job.StartDate         
                    />
                  </CCollapse>
                </CCol>
                <CCol sm="3">
                  <CCollapse :show="collapse">
                    <CInput
                    label="Starting Time"
                    type="text"
                    placeholder=""
                    v-model = job.StartTime        
                    />
                  </CCollapse>
                </CCol>
                <CCol sm="3">
                  <CCollapse :show="collapse">
                    <CInput
                    label="Ending Date"
                    type="datetime"
                    placeholder=""
                    v-model = job.EndDate    
                    />
                  </CCollapse>
                </CCol>
                <CCol sm="3">
                  <CCollapse :show="collapse">
                    <CInput
                    label="Ending Time"
                    type="datetime"
                    placeholder=""
                    v-model = job.EndTime     
                    />
                  </CCollapse>
                </CCol>              
            </CRow>      
            <CRow>
              <CCol sm="3">
                Problem
                <vue-dropdown                  
                  :config="problem"
                  @setSelectedOption="setNewSelectedOptionproblem($event);"
                  style="margin-top:2%"
                ></vue-dropdown>
              </CCol>
              <CCol sm="3">
               Reason
               {{isPDSel}}
                <vue-dropdown    
                id="reasonpd"              
                  :config="reasonpd"
                  @setSelectedOption="setNewSelectedOptionreason($event);"
                  style="margin-top:2%"
                  v-if="isPDSel"
                ></vue-dropdown>
                
                <vue-dropdown
                  id="reasonq"                  
                  :config="reasonq"
                  @setSelectedOption="setNewSelectedOptionreason($event);"
                  style="margin-top:2%"
                  v-if="isQSel"
                ></vue-dropdown>
                {{isQSel}}
                <vue-dropdown   
                id="reasonpm"               
                  :config="reasonpm"
                  @setSelectedOption="setNewSelectedOptionreason($event);"
                  style="margin-top:2%"
                  v-if="isPMSel"
                ></vue-dropdown>
                <vue-dropdown     
                id="reasonme"             
                  :config="reasonme"
                  @setSelectedOption="setNewSelectedOptionreason($event);"
                  style="margin-top:2%"
                  v-if="isMESel"
                ></vue-dropdown>
                <vue-dropdown      
                id="reasonee"            
                  :config="reasonee"
                  @setSelectedOption="setNewSelectedOptionreason($event);"
                  style="margin-top:2%"
                  v-if="isEESel"
                ></vue-dropdown>
                <vue-dropdown 
                id="reasonut"                 
                  :config="reasonut"
                  @setSelectedOption="setNewSelectedOptionreason($event);"
                  style="margin-top:2%"
                  v-if="isUTSel"
                ></vue-dropdown>
                <vue-dropdown 
                id="reasoncc"                 
                  :config="reasoncc"
                  @setSelectedOption="setNewSelectedOptionreason($event);"
                  style="margin-top:2%"
                  v-if="isCCSel"
                ></vue-dropdown><br>
                <input type="text"  v-if="custom_sel" id="customs_select" style="width:100%"/>
                <br>
              </CCol>
              <CCol sm="6">
                Response by
                <vue-dropdown                  
                  :config="response"
                  @setSelectedOption="setNewSelectedOptionresponse($event);"
                  style="margin-top:1%"
                ></vue-dropdown>
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
              <CCol sm="3">
                <label>Machine Status</label>
                <select v-model="job.Status" class="form-control" :class="sel">
                  <option>Choose...</option>
                  <option v-if="issuper" value="Open" >Open</option>
                  <option v-if="issuper" style="background-color:#fca903;color:white" value="Pending">Pending</option>
                  <option v-if="issuper" style="background-color:#3474eb;color:white" value="In Progress">In Progress</option>
                  <option style="background-color:green;color:white" value="Completed">Completed</option>
                  <option style="background-color:red;color:white" value="Cancelled">Cancelled</option>
                </select>
              </CCol>
              <CCol sm="9">
                <CInput
                label="Remarks"
                type="text"
                placeholder="please input remarks"
                value=""         
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3">
                <CButton block color="info">Save</CButton><br>
              </CCol>
              <CCol sm="3">
                <div class="button-wrapper">
                  <span class="label">
                    Attach
                  </span>                
                    <input type="file" name="upload" id="upload" class="upload-box" placeholder="Upload File">                
                </div>
              </CCol>
              <CCol sm="6">
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<style scoped>
.pending{
  background-color: #fca903;
  color:white
}
.progress{
  background-color: #3474eb;
  color:white
}
.complete{
  background-color: green;
  color:white
}
.cancel{
  background-color: red;
  color:white
}
.button-wrapper {
  position: relative;
  width: 100%;
  text-align: center;
}
.button-wrapper span.label {
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 100%;
  background: #0e9424;
  cursor: pointer;
  color: #fff;
  padding: 10px 0;
  border-radius: 10px;
  font-size:12px;
}

#upload {
    display: inline-block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
}
#customs_select{
  border-radius: 30px;
  height: 30%;
  background-color: #cde4f5;
  border:1px solid white;
  margin-bottom:5%
}
#customs_select:focus{
  outline: none;
}

</style>
<script>

import jobdata from '../data/JobData'
import moment from 'moment'
import vueDropdown from "../vue-dropdown/vue-dropdown";
export default {  
   components: {
    vueDropdown
  },
  data:function() {
    return {
      custom_sel:false,
      collapse: false,
      innerCollapse: false,
      isPDSel:false,
      isQSel:false,
      isPMSel:false,
      isEESel:false,
      isMESel:false,
      isUTSel:false,
      isCCSel:false,
      problem: {
        options: [
          {
            value: "PD"
          },
          {
            value: "Q"
          },
          {
            value: "PM"
          },
          {
            value: "ME"
          },
          {
            value: "EE"
          },
          {
            value: "UT"
          },
          {
            value: "CC"
          }
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonpd: {
        options: [
          {value:"Reason PD1"},
          {value:"Reason PD2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonq: {
        options: [
          {value:"Reason Q1"},
          {value:"Reason Q2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonpm: {
        options: [
          {value:"Reason PM1"},
          {value:"Reason PM2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonme: {
        options: [
          {value:"Reason ME1"},
          {value:"Reason ME2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonee: {
        options: [
          {value:"Reason EE1"},
          {value:"Reason EE2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasonut: {
        options: [
          {value:"Reason UT1"},
          {value:"Reason UT2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      reasoncc: {
        options: [
          {value:"Reason CC1"},
          {value:"Reason CC2"},
          {value:"Customs"},
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      response: {
        options: [
          {
            value: "Technician 1"
          },
          {
            value: "Technician 2"
          },
          {
            value: "Customs"
          }
        ],
        placeholder: "Choose..",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
      },
      
      issuper:false,
      tech:localStorage.getItem('tech'),
      sel:'',
      job:{
          No:"",
          Date:"",
          StartTime:"",
          StartDate:"",
          EndTime:"",
          EndDate:"",
          Machine:"",
          Status:""
      },
      PdRemove:document.getElementById("reasonpd"),
      QRemove:document.getElementById("reasonq"),
      PMRemove:document.getElementById("reasonpm"),
      MERemove:document.getElementById("reasonme"),
      EERemove:document.getElementById("reasonee"),
      UTRemove:document.getElementById("reasonut"),
      CCRemove:document.getElementById("reasoncc"),
       select:true,
      selected: [] // Must be an array reference!      
    }
  }, 
  created() {
    this.geturl()
    // this.issuper = localStorage.getItem('superrole')
  },
  mounted(){
    if (localStorage.getItem('superrole')) {
      if(localStorage.getItem('superrole') == "Supervisor"){
        this.issuper = true
      }else{
        this.issuper = false
      }
      // console.log(this.issuper)
      // localStorage.removeItem('superrole');
    }
    
  },
  methods: {
    setNewSelectedOptionproblem(selectedOption) {
      // console.log(this.problem)
    
      this.problem.placeholder = selectedOption.value;
      // console.log(selectedOption.value);

      if (selectedOption.value == "PD"){
        
        if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QRemove.remove();     
        }
        if(this.isPMSel == true){
          this.PMRemove = document.getElementById("reasonpm");
          this.PMRemove.remove();          
        }
        if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }
        if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
        
        this.isPDSel = true
        
        //  this.isQSel = false
        //  this.isPMSel = false    
        //  this.isEESel = false
        //  this.isUTSel = false  
        //  this.isCCel = false
        //  this.isMESel = false     
        
        // console.log("ispdsel===", this.isPDSel)
        //  console.log(this.isPDSel)
        //  console.log(this.isQSel) 
       
      }else if(selectedOption.value == "Q"){  
        // if(this.isPDSel == true){
        //   var myobj1 = document.getElementById("reasonpd");
        //   myobj1.remove();
          
        // }            
        
        //  this.isPMSel = false    
        //  this.isEESel = false
        //  this.isUTSel = false  
        //  this.isCCel = false
        //  this.isMESel = false       
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove(); 
          // this.isPDSel = false     
        }
        if(this.isPMSel == true){
          this.PMRemove = document.getElementById("reasonpm");
          this.PMRemove.remove();          
        }
        if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }
        if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
        this.isQSel = true
        //  this.isPDSel = "true" 
         
        //  console.log(this.isPDSel)
        //  console.log(this.isQSel)  
         
      }else if(selectedOption.value == "PM"){     
        if(this.isQSel == true){
          this.PdRemove = document.getElementById("reasonq");
          this.PdRemove.remove();          
        }
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }
        if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }
        if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
         this.isPMSel = true 
        //  this.isQSel = false   
        //  this.isEESel = false
        //  this.isUTSel = false  
        //  this.isCCel = false
        //  this.isMESel = false         
        //  this.isPDSel = false 
      }else if(selectedOption.value == "ME"){ 
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }
        if(this.isPMSel == true){
          this.PRemove = document.getElementById("reasonpm");
          this.PdRemove.remove();          
        }
        if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QdRemove.remove();          
        }
        if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
        this.isMESel = true 
        // this.isQSel = false
        //  this.isPMSel = false    
        //  this.isEESel = false
        //  this.isUTSel = false  
        //  this.isCCel = false
                 
        //  this.isPDSel = false 
      }else if(selectedOption.value == "EE"){
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }
        if(this.isPMSel == true){
          this.PRemove = document.getElementById("reasonpm");
          this.PdRemove.remove();          
        }
        if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QdRemove.remove();          
        }
        if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }
        if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        }
        if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
        // this.isQSel = false
        //  this.isPMSel = false    
         this.isEESel = true
        //  this.isUTSel = false  
        //  this.isCCel = false
        //  this.isMESel = false      
        //  this.isPDSel = false 
      }else if(selectedOption.value == "UT"){
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }else if(this.isPMSel == true){
          this.PRemove = document.getElementById("reasonpm");
          this.PdRemove.remove();          
        }else if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QdRemove.remove();          
        }else if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }else if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }else if(this.isCCSel == true){
          this.CCRemove = document.getElementById("reasoncc");
          this.CCRemove.remove();          
        }
        // this.isQSel = false
        //  this.isPMSel = false    
        //  this.isEESel = false
         this.isUTSel = true  
        //  this.isCCel = false
        //  this.isMESel = false      
        //  this.isPDSel = false 
      }else if(selectedOption.value == "CC"){ 
        if(this.isPDSel == true){
          this.PdRemove = document.getElementById("reasonpd");
          this.PdRemove.remove();          
        }else if(this.isPMSel == true){
          this.PRemove = document.getElementById("reasonpm");
          this.PdRemove.remove();          
        }else if(this.isQSel == true){
          this.QRemove = document.getElementById("reasonq");
          this.QdRemove.remove();          
        }else if(this.isMESel == true){
          this.MERemove = document.getElementById("reasonme");
          this.MERemove.remove();          
        }else if(this.isEESel == true){
          this.EERemove = document.getElementById("reasonee");
          this.EERemove.remove();          
        }else if(this.isUTSel == true){
          this.UTRemove = document.getElementById("reasonut");
          this.UTRemove.remove();          
        } 
        //  this.isQSel = false
        //  this.isPMSel = false    
        //  this.isEESel = false
        //  this.isUTSel = false           
        //  this.isMESel = false      
        //  this.isPDSel = false 
         this.isCCSel = true
      }
      // console.log(this.isQSel, this.isPMSel, this.isEESel, this.isUTSel, this.isMESel, this.isPDSel, this.isCCSel)
    },
    setNewSelectedOptionreason(selectedOption) {
      if (selectedOption.value == "Customs"){
        this.reasonpd.placeholder = selectedOption.value;
        this.reasonq.placeholder = selectedOption.value;
        this.reasonpm.placeholder = selectedOption.value;
        this.reasonme.placeholder = selectedOption.value;
        this.reasonee.placeholder = selectedOption.value;
        this.reasoncc.placeholder = selectedOption.value;
        this.reasonut.placeholder = selectedOption.value;
        this.custom_sel = true
      }else if(selectedOption.value == "Reason PD1"){
        this.reasonpd.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason PD2"){
        this.reasonpd.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason PM1"){
        this.reasonpm.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason PM2"){
        this.reasonpm.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason Q1"){
        this.reasonq.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason Q2"){
        this.reasonq.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason ME1"){
        this.reasonme.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason ME2"){
        this.reasonme.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason CC1"){
        this.reasoncc.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason CC2"){
        this.reasoncc.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason EE1"){
        this.reasonee.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason EE2"){
        this.reasonee.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason UT1"){
        this.reasonut.placeholder = selectedOption.value;
        this.custom_sel = false
      }else if(selectedOption.value == "Reason UT2"){
        this.reasonut.placeholder = selectedOption.value;
        this.custom_sel = false
      }
    },
    setNewSelectedOptionresponse(selectedOption) {
      this.response.placeholder = selectedOption.value;
      // alert(this.config.placeholder)
    },
    geturl(){
       var jobId = this.$route.params.id
       for(var i = 0; i < jobdata.length ;i++){
         if(jobId == jobdata[i].Job_No){
            this.job.No = jobdata[i].Job_No,
            this.job.Machine = jobdata[i].Machine,
            this.job.Date = jobdata[i].Job_Date,
            this.job.StartDate = jobdata[i].Starting_Date,
            this.job.StartTime = jobdata[i].Starting_Time,            
            this.job.EndTime = jobdata[i].Ending_Time,
            this.job.EndDate = jobdata[i].Ending_Date
            this.job.Status = jobdata[i].Status
            if(this.job.Status == "Completed"){
              this.sel = 'complete'
            }else if(this.job.Status == "Pending"){
              this.sel = "pending"
            }else if(this.job.Status == "Cancelled"){
              this.sel = "cancel"
            }else if(this.job.Status == "In Progress"){
              this.sel = "prgress"
            }
            break;
         }
       }       
    }
  }
}
</script>
