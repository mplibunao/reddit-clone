import nodemailer from 'nodemailer'

export interface sendEmail {
  to: string
  html: string
  subject: string
}

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async ({ to, html, subject }: sendEmail) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'csnnlgp2owgd43zg@ethereal.email',
      pass: 'DrzvNquvghcV54THcU',
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject,
    html,
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
