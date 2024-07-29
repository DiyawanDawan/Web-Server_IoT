const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'afce6020-3542b2ee'});
  
  mg.messages.create('sandbox-123.mailgun.org', {
  	from: "Excited User <mailgun@sandbox556b82a36f4849ac893e268f6fef91cf.mailgun.org>",
  	to: ["diyawan0@gmail.com"],
  	subject: "Hello",
  	text: "Testing some Mailgun awesomeness!",
  	html: "<h1>Testing some Mailgun awesomeness!</h1>"
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.log(err)); // logs any error