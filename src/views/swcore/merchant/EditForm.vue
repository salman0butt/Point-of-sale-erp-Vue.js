<template>
  <b-card title="Merchant details" >
    <b-row>
        <b-col md="3">
          <b-form-group label="MID" label-for="mc-first-name" >
            <b-form-input id="mc-first-name" plaintext  value="MID"/>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Status" label-for="mc-first-name" >
            <b-form-input id="mc-first-name" plaintext  value="Status"/>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Expiry date" label-for="mc-first-name" >
            <b-form-input id="mc-first-name" plaintext  value="Expiry date"/>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Subscription Type" label-for="mc-first-name" >
            <b-form-input id="mc-first-name" plaintext  value="Subscription Type"/>
          </b-form-group>
        </b-col>
    </b-row>
    <b-form @submit.prevent>
      <b-row>
        <b-col md="6">
          <b-form-group
            label="Business Name"
            label-for="mc-first-name"
          >
            <b-form-input
              id="mc-first-name"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Subdomain"
            label-for="mc-last-name"
          >
            <b-form-input
              id="mc-last-name"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Owner Name"
            label-for="mc-city"
          >
            <b-form-input
              id="mc-city"
              />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Owner Mobile"
            label-for="mc-country"
          >
            <b-form-input
              id="mc-country"
              />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Owner Email"
            label-for="mc-company"
          >
            <div class="form-label-group">
              <b-form-input
                id="mc-company"
                type="email"
               />
            </div>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label-for="mc-email"
            label="Email"
          >
            <div class="form-label-group">
              <b-form-input
                id="mc-email"
                placeholder="Email"
              />
            </div>
          </b-form-group>
        </b-col>

          <b-col md="6">
          <b-form-group
            label-for="mc-email"
            label="Business stamp"
          >
            <div class="form-label-group">
             <b-form-file
        v-model="file"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      />

      <b-card-text class="my-1">
        Selected file: <strong>{{ file ? file.name : '' }}</strong>
      </b-card-text>
            </div>
          </b-form-group>
        </b-col>

          <b-col md="6">
         
      <div>
<label for="wildcard">Business Logo</label>
      <!-- Styled -->
      <b-form-file
        v-model="file1"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      />

      <b-card-text class="my-1">
        Selected file: <strong>{{ file1 ? file1.name : '' }}</strong>
      </b-card-text>

     <!-- Plain mode -->
     
     
    </div>

 

        </b-col>

        <!-- submit and reset -->
        <b-col>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
          >
            Save
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>

   
  </b-card>
</template>

<script>

import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BFormFile, BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { codeMultipleColumn } from './code'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BFormFile,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      codeMultipleColumn,
      file: null,
      file1: null,
    }
  },
}
</script>
