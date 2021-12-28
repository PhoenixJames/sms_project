<template>
  <v-container>
    <v-row style="margin-top: 50px;">
      <v-text-field
        label="To"
        placeholder="Enter phone number that you want to send."
        outlined
        v-model="toPhone"
      />
    </v-row>
    <v-row>
      <v-textarea
        class="mr-5"
        outlined
        name="input-7-4"
        label="Message"
        height="500"
        v-model="message"
      />
    </v-row>
    <v-row>
      <v-spacer />
      <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        @click="sendQrCode"
      >
        <v-icon
          right
          dark
        >
          mdi-send
        </v-icon>
        Send
      </v-btn>
    </v-row>
    <v-dialog width="400" v-model="qrDialog">
      <v-card width="400">
        <v-card-subtitle>
          Please scan this qrcode in mobile web.
        </v-card-subtitle>
        <v-card-text>
          <v-row justify="center">
            <qrcode-vue :value="qrValue" size="300" level="L" />
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'SendSms',
  data() {
    return {
      toPhone: '',
      message: '',
      qrValue: '',
      qrDialog: false,
    };
  },
  components: {
    // SideBar,
    QrcodeVue,
  },
  methods: {
    sendQrCode() {
      this.qrValue = `SMSTO:${this.toPhone}:${this.message}`;
      this.qrDialog = true;
    },
  },
};
</script>
