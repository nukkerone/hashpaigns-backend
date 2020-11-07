import { config } from './config';
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sendgrid.api_key);

export const newGroupEmail = (to: string, data: any): Promise<any> => {
  const msg = {
    to: to, // Change to your recipient
    from: 'nukker_1@hotmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    template_id: 'd-ca23c5004781424a92c35fcf2ae31a9e',
    dynamic_template_data: data,
    asm: { // Unsubscribe group
      group_id: 18884,
      groups_to_display: [18884]
    }
  }
  return sgMail.send(msg);
}