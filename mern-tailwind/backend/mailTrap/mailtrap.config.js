import { MailtrapClient } from "mailtrap";

export const mailtrapClient = new MailtrapClient({
  token: "4e672002a944d72fabbe67ceca410759",
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};
