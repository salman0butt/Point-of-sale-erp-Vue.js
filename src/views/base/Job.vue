<template>
  <div id="job">
    <h1>Carding Machine - Jobs Problem</h1>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardBody>           
            <CRow>
              <CCol sm="6">
                <CSelect
                  label="Branch Office"
                  placeholder="Choose.."
                  :options="SelBranch"
                />
              </CCol>
              <CCol sm="3">
                <label>Machine Status</label>
                <select class="form-control" id="SelJob" name="SelJob" @change="select()">
                  <option value="Choose">Choose...</option>
                  <option value="All" selected>All</option>
                  <option value="Open">Open</option>
                  <option style="background-color:#fca903;color:white" value="Pending">Pending</option>
                  <option style="background-color:#3474eb;color:white" value="In Progress">In Progress</option>
                  <option style="background-color:green;color:white" value="Completed">Completed</option>
                  <option style="background-color:red;color:white" value="Cancelled">Cancelled</option>
                </select>
              </CCol>
              <CCol sm="3">
                <CInput
                  label="Date"
                  type="text"
                  :value=currentTime                 
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
                  :items="getShuffledJobData()"
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
#job{
  font-size: 16px;
}
</style>
<script>
import CTableWrapper from './table/job.vue'
import jobData from '../data/JobData'
import TheSidebarVue from '../../containers/TheSidebar.vue'
export default {
  name: 'Tables',
  components: { CTableWrapper },
  data () {
    return {
      OpenJob:[],
      PendingJob:[],
      CompletedJob:[],
      CancelledJob:[],
      ProgressJob:[],      
      currentTime:"",
      selStatus:"",
      selected: [], // Must be an array reference!
      SelBranch:['เพชรบุรี', 'สาย 5'],
      SelectStatus: [
        'Open', 'Pending', 'In Process', 'Completed', 'Cancelled'
      ]
    }
  },
  created(){
    var time = new Date().toDateString();
    this.currentTime = time
  },
  methods: {
    async select(){ 
      var e =await document.getElementById("SelJob");
      this.selStatus = e.options[e.selectedIndex].value;
    },
    shuffleArray (array) {
      return array
    },
    getShuffledJobData () {
      var allData = []  
    if(this.selStatus == "" || this.selStatus == "All" || this.selStatus == "Choose"){
      allData = jobData
      allData.sort(function (a, b) {
      return ('' + a.Status).localeCompare(b.Status);
      })
      return this.shuffleArray(allData.slice(0))      
    }else{
    var Job = []
    for(var i=0;i<jobData.length;i++){
      if(jobData[i].Status == this.selStatus){
        Job.push(jobData[i])           
      }
    }
    return this.shuffleArray(Job.slice(0))
    }
    }
  }
}
</script>
