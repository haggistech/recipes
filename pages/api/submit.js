export default async function(req, res) {
  
    const { recipename, shortdescription } = req.body
  
    const content = {
      RecipeName: recipename,
      ShortDescription: shortdescription
    }
  
    try {
      console.log('WORKING', content, req.body)
      res.status(200).send('Message sent successfully.')
    } catch (error) {
      console.log('ERROR', error)
      res.status(400).send('Message not sent.')
    }
  }