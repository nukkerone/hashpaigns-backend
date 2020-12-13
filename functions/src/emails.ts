import { config } from './config';
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sendgrid.api_key);

export const newGroupEmail = (to: string, data: any): Promise<any> => {
  const msg = {
    to: to, // Change to your recipient
    from: config.sendgrid.email_from, // Change to your verified sender
    subject: 'New group created',
    template_id: config.sendgrid.group_created_template_id,
    dynamic_template_data: data,
    asm: { // Unsubscribe group
      group_id: parseInt(config.sendgrid.group_id),
      groups_to_display: [parseInt(config.sendgrid.group_id)]
    }
  }
  return sgMail.send(msg);
}