const { Laporan, Customer, Transaksi } = require('../models'); 

class Controller {
    static async getLaporan(req, res, next) {
    try {
        const allLaporan = await Laporan.findAll({
            include: [Customer, Transaksi],
          });
        return res.status(201).json(allLaporan);
        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    static async getLaporanId(req, res, next) {
    try {
        const laporanId = req.params.id;
        const laporan = await Laporan.findByPk(laporanId, {
        include: [Customer, Transaksi],
        });
      
        if (!laporan) {
        return res.status(404).json({ error: 'Laporan tidak tersedia!!' });
        }
      
        return res.json(laporan);
        } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
          }
    }
}

module.exports = Controller;