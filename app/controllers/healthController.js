
const paths = {
  ping: '/health/ping',
};

class HealthController {
  static get paths() {
    return paths;
  }
  static ping (req, res) {
    return res.status(200).json({ ping: 'pong' });
  }  
}

module.exports = { HealthController };