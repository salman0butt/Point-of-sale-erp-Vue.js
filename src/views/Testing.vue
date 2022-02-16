<template>
  <div>
    <CRow>
      <CCol xs="12" md="12" class="pt-2">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Account</th>
              <th scope="col">Debits</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, k) in form.items" :key="k">
              <td>
                <multiselect
                  v-model="item.account"
                  :options="options.account"
                  :close-on-select="true"
                  :clear-on-select="false"
                  placeholder="Select Account"
                  label="label"
                >
                </multiselect>
              </td>

              <td>
                <CInput
                  type="number"
                  placeholder="0.000"
                  style="max-width: 100px"
                  v-model="item.debit"
                  step="any"
                />
              </td>

              <td>
                <CButton @click="removeItem(k)">
                  <CIcon :content="$options.cilTrash" style="color: red" />
                </CButton>
              </td>
            </tr>
          </tbody>
        </table>
        <CRow>
          <CCol xs="12" md="6" class="pt-2">
            <CButton progress timeout="2000" color="default" @click="addItem()"
              >Add another line
              <CIcon :content="$options.cisCaretBottom" style="width: 10px"
            /></CButton>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import AccountServices from "@/services/accounting/accounts/AccountServices";
import { cilTrash, cisCaretBottom } from "@coreui/icons-pro";

export default {
  name: "test",
  components: {
    Multiselect,
  },
  cilTrash,

  data() {
    return {
      form: {
        items: [
          {
            account: "",
            debit: "0.000",
          },
        ],
      },
      options: {
        account: [],
      },
    };
  },
  created() {
    this.createMethod();
  },
  methods: {
    createMethod() {
      AccountServices.getTreeStructure()
        .then(({ data }) => {
          let account = this.options.account;
          data.map(function (val) {
            if (val) {
              // Account type
              account.push({
                value: val.uuid,
                label: val.name,
                $isDisabled: true,
              });
            }
            if (val.children && val.children.length > 0) {
              // Account Subtype

              val.children.map(function (val2) {
                if (val2.accounts && val2.accounts.length > 0) {
                  account.push({
                    value: val2.uuid,
                    label: "-" + val2.name,
                    $isDisabled: true,
                  });
                  val2.accounts.map(function (val3) {
                    account.push({
                      value: val3.uuid,
                      label: "-- " + val3.name,
                    });
                  });
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


