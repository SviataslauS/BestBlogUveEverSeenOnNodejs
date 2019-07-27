
function ping (req, res) {
  return res.status(200).json({ ping: 'pong' });
}  
module.exports = { ping };