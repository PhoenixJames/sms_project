<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-btn @click="qrDialog = true">
        Scan QR
      </v-btn>
    </v-row>
    <v-row width="500" height="500">
      To: {{ toPhone }}
    </v-row>
    <v-row width="500" style="height: 300px">
      Message: {{ message }}
    </v-row>
    <v-row justify="center">
      <v-btn full-width @click="openSmsApp">
        Copy and Send From SMS App
      </v-btn>
    </v-row>
    <v-dialog width="400" v-model="qrDialog">
      <v-card width="400">
        <v-card-subtitle>
          Scanning the qrcode....
        </v-card-subtitle>
        <v-card-text>
          <v-row justify="center">
            <qrcode-stream @decode="onDecode" @init="onInit" />
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: 'SendSms',
  data() {
    return {
      toPhone: '',
      message: '',
      qrDialog: false,
    };
  },
  components: {
    QrcodeStream,
  },
  methods: {
    onDecode(result) {
      const qrData = result.split(':');
      // eslint-disable-next-line prefer-destructuring
      this.toPhone = qrData[1];
      // eslint-disable-next-line prefer-destructuring
      this.message = qrData[2];

      if (result != null) {
        this.qrDialog = false;
      }
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission';
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device';
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)';
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?';
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable';
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser';
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
    openSmsApp() {
      if (navigator.userAgent.match(/Android/i)) {
        window.open(`sms://${this.toPhone}/?body=${this.message}`, '_blank');
      }
      if (navigator.userAgent.match(/iPhone/i)) {
        window.open(`sms://${this.toPhone}/&body=${this.message}`, '_blank');
      }
    },
  },
};
</script>
