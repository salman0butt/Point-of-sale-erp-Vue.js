<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>
            Merchant View
          </CCardHeader>
          <CCardBody>
            <CTabs id="Mer" name="Mer" ref="Mer" variant="pills" vertical>
              <CTab active>
                <template slot="title" >
                  {{tabs[0]}}
                </template>
                 <CRow>
                    <CCol  xs="12" lg="7">                     
                        <CCardHeader>
                            <strong>Merchant</strong> Information
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CInput
                                    label="Bussiness Name : "
                                    horizontal
                                    autocomplete="name"
                                />
                                <CInput
                                    label="Bussiness Activity : "
                                    horizontal
                                    autocomplete="name"
                                />
                            </CForm>
                        </CCardBody>    
                        <CCardHeader>
                            <strong>Owner</strong> Information
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CInput
                                    label="Name : "
                                    horizontal
                                    autocomplete="name"
                                />
                                <CInput
                                    label="Email : "
                                    horizontal
                                    autocomplete="name"
                                />
                                <CInput
                                    label="Mobile : "
                                    horizontal
                                    autocomplete="name"
                                />
                                <CInput
                                    label="Country : "
                                    horizontal
                                    autocomplete="name"
                                />
                            </CForm>
                        </CCardBody>                                   
                    </CCol>
                    <CCol  xs="12" lg="5">
                       <CCardBody> 
                        <div class="mb-2" style="padding:5px;background:#f7e9e9">
                            <CImg
                                src="https://picsum.photos/1024/480/?image=54"
                                block
                                class="mb-2"
                                width="100%"
                            />
                        </div>
                         <CInputFile
                                label="Change Logo"
                                horizontal
                                custom
                                class="logoupload"
                            />
                        </CCardBody>
                    </CCol>
                 </Crow>                
              </CTab>
              <CTab>
                <template slot="title">
                   {{tabs[1]}}
                </template>
                <CRow>
                    <CCol  xs="12" lg="7">                     
                        <CCardHeader>
                            <strong>SubScription</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CInput
                                    label="Expire Date : "
                                    horizontal
                                    autocomplete="name"
                                />
                                <CInput
                                    label="Remaing : "
                                    horizontal
                                    autocomplete="name"
                                />
                            </CForm>
                        </CCardBody>    
                        <CCardHeader>
                            <strong>Packages</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CInput
                                    label="Package Name : "
                                    horizontal
                                    autocomplete="name"
                                />
                            </CForm>
                        </CCardBody>    
                        <CCardHeader>
                            <strong>Plugins</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CInput
                                    label="Plugin Name : "
                                    horizontal
                                    autocomplete="name"
                                />
                            </CForm>
                        </CCardBody>      
                        <CCardBody>
                            <CForm>
                                <CInput
                                    label="Total : "
                                    horizontal
                                    autocomplete="name"
                                />
                            </CForm>
                        </CCardBody>                           
                    </CCol>
                    <CCol  xs="12" lg="5">
                        <CCardHeader>
                            <strong>Invoices</strong>
                        </CCardHeader>
                       <CCardBody>                         
                                <CCard 
                                v-for="item in InvoiceLst"
                                :key="item.InvoiceNum"
                                color="gradient-secondary" 
                                class="text-center" 
                                body-wrapper
                                >
                                    <blockquote class="card-blockquote" style="margin-bottom:-11px;float:left">
                                        <p><strong>Invoice Number :</strong> {{item.InvoiceNum}}</p>
                                        <p><strong>Invoice Date   :</strong>  {{item.InvoiceDate}} </p>
                                    </blockquote>
                                    <CButton block color="success" style="float:right;width: 70px;margin-top: 15px;">{{item.action}}</CButton>
                                </CCard>                  
                        </CCardBody>
                    </CCol>
                 </Crow>  
              </CTab>
              <CTab>
                <template slot="title">
                {{tabs[2]}}
                </template>
                <CCardHeader>
                            <strong>Plugin</strong>
                </CCardHeader>
                <CCardBody>
                    <CRow>                   
                        <CCol sm="6" md="4" class="pt-2"> <strong>Featured Popular Active</strong>
                        </CCol>
                        <CCol sm="6" md="4">
                        </CCol>
                        <CCol sm="6" md="4"> <CInput placeholder="plugin" v-on:keyup="PluginSeach" v-model="pluginname">
                            <template #prepend>
                                <CButton style="background:#10163a;color:white">
                                <CIcon name="cil-magnifying-glass"/> Search
                                </CButton>
                            </template>
                        </CInput>
                        </CCol>
                    </CRow>                  
                </CCardBody>                
                <CRow>                  
                    <CCol v-for="item in pluginlist" :key="item.name" sm="6" md="4">
                        <CCard accent-color="primary">
                        <CCardHeader>{{item.name}}</CCardHeader>
                        <CCardBody>
                                <CRow>
                                <CCol  sm="12" md="4">
                                        <CCardBody class="p-0">
                                            <CImg
                                                :src="item.imgUrl"
                                                block
                                                class="mb-2"
                                                width="100%"
                                            />
                                        </CCardBody>
                                </CCol>
                                <CCol  sm="12" md="8">
                                        <CCardBody>{{item.content}}</CCardBody>
                                        <CButton block color="success" style="float:right;width: 80px;margin-top: 15px;">{{item.active}}</CButton>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CButton block color="success" style="float:right;width: 100px;margin-top: 15px;">Load more</CButton>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Tabs',
  data () {
    return {
        pluginlist:[],
      pluginname:'',
      tabs: [
        'General',
        'Billing',
        'Plugins'
      ],
      InvoiceLst:[
          {InvoiceNum:'#123122',InvoiceDate:'07/04/2021',action:'Paid'},
          {InvoiceNum:'#234244',InvoiceDate:'07/07/2021',action:'Unpaid'}
      ],
      PluginLst:[
          {name:'plugin1',imgUrl:'https://picsum.photos/1024/480/?image=54' , content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit,',active:'Active'},
          {name:'plugin2',imgUrl:'https://picsum.photos/1024/480/?image=54' , content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit,',active:'Deactive'},
          {name:'plugin3',imgUrl:'https://picsum.photos/1024/480/?image=54' , content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit,',active:'Deactive'},
          {name:'plugin4',imgUrl:'https://picsum.photos/1024/480/?image=54' , content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit,',active:'Active'},
          {name:'plugin5',imgUrl:'https://picsum.photos/1024/480/?image=54' , content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit,',active:'Deactive'},
          {name:'plugin6',imgUrl:'https://picsum.photos/1024/480/?image=54' , content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit,',active:'Active'},
          ],
      activeTab: 1
    }
  },
  mounted : function() {
      $(".col-sm-4").removeClass('col-sm-4').addClass('col-sm-2')
       $(".col-sm-8").removeClass('col-sm-8').addClass('col-sm-10')
  },
  created(){
  this.pluginlist = this.PluginLst
  },
  methods:{
      PluginSeach(){
          var data = [];
          var initial = this.PluginLst
          if(initial.length > 0 && this.pluginname != ''){
              for(var i=0;i<initial.length;i++){
                  if(initial[i]['name'].toUpperCase().includes(this.pluginname.toUpperCase())){
                      data.push(initial[i])
                  }
              }
          this.pluginlist = data          
          }else if(this.pluginname == ''){
              this.pluginlist = initial
          }
      }
  }
}
</script>
<style>
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: #fff;
    background-color: #10163a !important;
}
</style>