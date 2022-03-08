<template>
  <div>
    <CCard>
      <CCardHeader> Return by Invoice reciept</CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form>
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <CInput
                    v-model="search"
                    @input="searchInvoice()"
                    placeholder="Search by reciept"
                  /><br />

                  <table
                    class="table"
                    v-if="options.Invoices && options.Invoices.length > 0"
                  >
                    <thead>
                      <tr>
                        <th scope="col">Invoice #</th>
                        <th scope="col">Tax</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Deilvery</th>
                        <th scope="col">Total</th>
                        <th scope="col">Dated</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in options.Invoices" :key="index">
                        <td>{{ "#" + item.invoice_ref_no }}</td>
                        <td>{{ item.total_tax }}</td>
                        <td>{{ item.total_discount }}</td>
                        <td>{{ item.delivery_method_price }}</td>
                        <td>{{ item.total_price_with_delivery }}</td>
                        <td>{{ item.dated }}</td>
                        <td>
                          <CButton block color="success" @click="addReturn(index)"
                            >Add Return</CButton
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
              </CRow>
            </form>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import Loader from "@/components/layouts/Loader";
import InvoiceService from "@/services/sale/InvoiceService";

export default {
  name: "ReturnByInvoices",
  components: { Loader },
  data: () => ({
    search: "",
    options: {
      Invoices: [],
    },
  }),
  methods: {
    searchInvoice() {
      if (this.search !== "") {
        this.options.Invoices = [];
        InvoiceService.search(this.search)
          .then(({ data }) => {
            if (data) {
              this.options.Invoices = [];
              data.map((Invoice) => {
                this.options.Invoices.push({ ...Invoice });
              });
              this.$forceUpdate();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.resetSearch();
      }
    },
    addReturn(k) {
      // alert("Return added");
      // this.openInvoice = this.options.Invoices[k];
      // this.$store.commit("set_return_by_Invoice_model", true);
      this.$router.push({
        path: "/returns/add/" + this.options.Invoices[k].uuid,
      });
    },
    resetSearch() {
      this.search = "";
      this.options.Invoices = [];
    },
  },
};
</script>
