<template>
  <div>
    <CCard>
      <CCardHeader> Return by products </CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form>
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <CInput
                    v-model="search"
                    @input="searchProduct()"
                    placeholder="Search By Product Name, Serial, Barcode"
                  /><br />

                  <table
                    class="table"
                    v-if="options.products && options.products.length > 0"
                  >
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Barcode</th>
                        <th scope="col">Serial Number</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in options.products" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.barcode }}</td>
                        <td>{{ item.serial_number }}</td>
                        <td>{{ item.price ? item.price.cost_price : "N/A" }}</td>
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
    <ReturnByProductModel :product="openProduct" />
  </div>
</template>
<script>
import Loader from "@/components/layouts/Loader";
import ReceivingService from "@/services/receivings/ReceivingService";
import ReturnByProductModel from "@/components/returns/ReturnByProductModel";
export default {
  name: "ReturnByProducts",
  components: { Loader, ReturnByProductModel },
  data: () => ({
    search: "",
    openProduct: {},
    // products_list: [],
    options: {
      products: [],
    },
  }),
  methods: {
    searchProduct() {
      if (this.search !== "") {
        this.products_list = [];
        this.options.products = [];
        this.unit_form = [];
        ReceivingService.searchProduct(this.search)
          .then(({ data }) => {
            if (data !== undefined && data !== "") {
              this.options.products = [];
              data.map((product) => {
                this.options.products.push({ ...product });
              });
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
      this.openProduct = this.options.products[k];
      this.$store.commit("set_return_by_product_model", true);
      // alert("added");
    },
    resetSearch() {
      // this.form.product_id = "";
      this.search = "";
      this.options.products = [];
    },
  },
};
</script>
